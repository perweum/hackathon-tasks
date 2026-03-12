import React, { useState, useEffect } from 'react';
import { initialTasks } from '../data/tasks';
import { db } from '../firebase';
import { collection, onSnapshot, doc, updateDoc, setDoc, getDocs, query } from 'firebase/firestore';
import TaskCard from './TaskCard';
import { LogOut, Layout, Play, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import './Board.css';

function Board({ user }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Sync tasks from Firestore in real-time
  useEffect(() => {
    const q = query(collection(db, 'tasks'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const taskList = [];
      snapshot.forEach((doc) => {
        taskList.push({ ...doc.data(), id: doc.id });
      });
      
      if (taskList.length === 0 && loading) {
        // First time setup: Seed Firestore with initialTasks
        seedInitialTasks();
      } else {
        setTasks(taskList);
        setLoading(false);
      }
    }, (error) => {
      console.error("Firebase Snapshot Error:", error);
      // Fallback if Firebase isn't configured yet
      setTasks(initialTasks);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const seedInitialTasks = async () => {
    try {
      for (const task of initialTasks) {
        await setDoc(doc(db, 'tasks', task.id), task);
      }
    } catch (error) {
      console.error("Error seeding tasks:", error);
    }
  };

  const handleTaskAction = async (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    try {
      const taskRef = doc(db, 'tasks', taskId);
      if (task.status === 'backlog') {
        await updateDoc(taskRef, {
          status: 'doing',
          assignee: user
        });
      } else if (task.status === 'doing') {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00A34D', '#FDB913', '#ffffff'] // Adjusted green
        });
        await updateDoc(taskRef, {
          status: 'done'
        });
      }
    } catch (error) {
      console.error("Error updating task in Firestore:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('hackathon_user');
    window.location.reload();
  };

  const renderColumn = (status, title, icon) => {
    const columnTasks = tasks.filter(t => t.status === status);
    
    return (
      <div className={`board-column ${status}`}>
        <div className="column-header">
          {icon}
          <h2>{title}</h2>
          <span className="count">{columnTasks.length}</span>
        </div>
        <div className="column-content">
          {columnTasks.map(task => (
            <TaskCard 
              key={task.id} 
              task={task} 
              currentUser={user}
              onAction={() => handleTaskAction(task.id)} 
            />
          ))}
          {!loading && columnTasks.length === 0 && (
            <div className="empty-state">Ingen oppgaver her</div>
          )}
          {loading && <div className="loading-state">Laster...</div>}
        </div>
      </div>
    );
  };

  return (
    <div className="board-page">
      <header className="board-header">
        <div className="header-left">
          <div className="board-logo">Fridgaton</div>
        </div>
        <div className="header-right">
          <div className="user-profile">
            <img src={user.avatar.url} alt={user.name} className="user-avatar" />
            <span className="user-name">{user.name}</span>
          </div>
          <button onClick={handleLogout} className="logout-btn" title="Logg ut">
            <LogOut size={20} />
          </button>
        </div>
      </header>

      <main className="board-container">
        {renderColumn('backlog', 'Backlog', <Layout size={20} />)}
        {renderColumn('doing', 'Doing', <Play size={20} />)}
        {renderColumn('done', 'Ferdig', <CheckCircle2 size={20} />)}
      </main>
    </div>
  );
}

export default Board;

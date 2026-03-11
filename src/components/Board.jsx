import React, { useState, useEffect } from 'react';
import { initialTasks } from '../data/tasks';
import TaskCard from './TaskCard';
import { LogOut, Layout, Play, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import './Board.css';

function Board({ user }) {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('hackathon_tasks');
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });

  useEffect(() => {
    localStorage.setItem('hackathon_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleTaskAction = (taskId) => {
    setTasks(prevTasks => prevTasks.map(task => {
      if (task.id === taskId) {
        if (task.status === 'backlog') {
          return { ...task, status: 'doing', assignee: user };
        } else if (task.status === 'doing') {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#008238', '#FDB913', '#ffffff']
          });
          return { ...task, status: 'done' };
        }
      }
      return task;
    }));
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
          {columnTasks.length === 0 && (
            <div className="empty-state">Ingen oppgaver her</div>
          )}
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

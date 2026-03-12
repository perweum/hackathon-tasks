import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ArrowLeft, Medal } from 'lucide-react';
import './Highscore.css';

function Highscore({ tasks, onBack }) {
  // Calculate scores: count 'done' tasks for each user name
  const scoresMap = tasks
    .filter(task => task.status === 'done' && task.assignee)
    .reduce((acc, task) => {
      const userName = task.assignee.name;
      if (!acc[userName]) {
        acc[userName] = {
          name: userName,
          avatar: task.assignee.avatar.url,
          count: 0
        };
      }
      acc[userName].count += 1;
      return acc;
    }, {});

  const sortedScores = Object.values(scoresMap).sort((a, b) => b.count - a.count);

  return (
    <motion.div 
      className="highscore-page"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
    >
      <header className="board-header">
        <div className="header-left">
          <button onClick={onBack} className="back-btn">
            <ArrowLeft size={20} />
          </button>
          <div className="board-logo">Highscore</div>
        </div>
      </header>

      <main className="highscore-container">
        <div className="highscore-card">
          <div className="highscore-header">
            <Trophy className="trophy-icon" size={48} />
            <h1>Toppliste</h1>
          </div>

          <div className="scores-list">
            <AnimatePresence mode='popLayout'>
              {sortedScores.length > 0 ? (
                sortedScores.map((score, index) => (
                  <motion.div 
                    key={score.name}
                    className="score-item"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    layout
                  >
                    <div className="rank">
                      {index === 0 ? <Trophy size={24} className="gold" /> : index + 1}
                    </div>
                    <img src={score.avatar} alt={score.name} className="score-avatar" />
                    <div className="score-info">
                      <span className="score-name">{score.name}</span>
                      <span className="score-count">{score.count} {score.count === 1 ? 'task' : 'tasks'} fullført</span>
                    </div>
                    <div className="score-badge">
                      {score.count}
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="empty-scores">
                  <p>Ingen har fullført oppgaver ennå. Kom i gang!</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </motion.div>
  );
}

export default Highscore;

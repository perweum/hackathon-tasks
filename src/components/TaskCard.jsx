import React from 'react';
import { PlayCircle, CheckCircle, ExternalLink } from 'lucide-react';
import './TaskCard.css';

function TaskCard({ task, onAction, currentUser }) {
  const isBacklog = task.status === 'backlog';
  const isDoing = task.status === 'doing';
  const isAssignedToMe = task.assignee?.name === currentUser?.name;

  return (
    <div className={`task-card ${task.status} ${isAssignedToMe ? 'assigned-to-me' : ''} fade-in`}>
      <div className="task-header">
        <div className="task-tags">
          {task.mainCategory && (
            <span className={`tag main-category ${task.mainCategory.toLowerCase()}`}>
              {task.mainCategory}
            </span>
          )}
          {task.subCategory && (
            <span className={`tag sub-category ${task.subCategory.toLowerCase()}`}>
              {task.subCategory}
            </span>
          )}
        </div>
        {task.assignee && (
          <img src={task.assignee.avatar.url} alt={task.assignee.name} className="assignee-mini-img" title={task.assignee.name} />
        )}
      </div>
      
      <div className="task-body">
        {task.title && <h3 className="task-title">{task.title}</h3>}
        {task.description && <p className="task-description">{task.description}</p>}
        {task.link && (
          <a href={task.link.trim()} target="_blank" rel="noopener noreferrer" className="task-link" title={task.link}>
            Dokumentasjon <ExternalLink size={12} />
          </a>
        )}
      </div>

      <div className="task-footer">
        <div className="task-actions">
          {isBacklog && (
            <button className="action-btn pick-btn" onClick={onAction}>
              Velg <PlayCircle size={14} />
            </button>
          )}
          {isDoing && isAssignedToMe && (
            <button className="action-btn done-btn" onClick={onAction}>
              Ferdig <CheckCircle size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskCard;

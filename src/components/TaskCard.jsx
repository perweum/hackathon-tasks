import React from 'react';
import { PlayCircle, CheckCircle, User2, Tag } from 'lucide-react';
import './TaskCard.css';

function TaskCard({ task, onAction, currentUser }) {
  const isBacklog = task.status === 'backlog';
  const isDoing = task.status === 'doing';
  const isDone = task.status === 'done';
  const isAssignedToMe = task.assignee?.name === currentUser?.name;

  return (
    <div className={`task-card ${task.status} ${isAssignedToMe ? 'assigned-to-me' : ''} fade-in`}>
      <div className="task-header">
        <div className="task-tags">
          <span className={`tag main-category ${task.mainCategory.toLowerCase()}`}>
            {task.mainCategory}
          </span>
          <span className={`tag sub-category ${task.subCategory.toLowerCase()}`}>
            {task.subCategory}
          </span>
        </div>
      </div>
      
      <h3 className="task-title">{task.title}</h3>

      <div className="task-footer">
        <div className="task-assignee">
          {task.assignee ? (
            <>
              <img src={task.assignee.avatar.url} alt={task.assignee.name} className="assignee-img" />
              <span>{task.assignee.name}</span>
            </>
          ) : (
            <>
              <User2 size={16} />
              <span>Sperret</span>
            </>
          )}
        </div>

        <div className="task-actions">
          {isBacklog && (
            <button className="action-btn pick-btn" onClick={onAction}>
              Velg <PlayCircle size={16} />
            </button>
          )}
          {isDoing && isAssignedToMe && (
            <button className="action-btn done-btn" onClick={onAction}>
              Ferdig <CheckCircle size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskCard;

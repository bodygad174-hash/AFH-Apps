import React from 'react';
import { Link } from 'react-router-dom';
import './AppCard.css';

function AppCard({ app }) {
  return (
    <Link to={`/app/${app._id}`} className="app-card">
      <div className="app-icon">
        {app.icon ? (
          <img src={app.icon} alt={app.name} />
        ) : (
          <div className="icon-placeholder">📱</div>
        )}
      </div>
      <div className="app-info">
        <h3>{app.name}</h3>
        <p className="category">{app.category}</p>
        <div className="app-stats">
          <span>⭐ {app.rating.toFixed(1)}</span>
          <span>📥 {app.downloadCount}</span>
        </div>
      </div>
    </Link>
  );
}

export default AppCard;
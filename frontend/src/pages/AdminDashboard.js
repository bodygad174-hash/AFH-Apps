import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    fetchApps();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/admin/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data);
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  const fetchApps = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/admin/apps', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApps(response.data);
    } catch (err) {
      console.error('Error fetching apps:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleAppStatus = async (appId, isActive) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`/api/admin/apps/${appId}`, { isActive: !isActive }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchApps();
    } catch (err) {
      console.error('Error updating app:', err);
    }
  };

  if (loading) return <div className="loading-page">جاري التحميل...</div>;

  return (
    <div className="admin-dashboard">
      <div className="container">
        <h1>لوحة التحكم</h1>

        {stats && (
          <div className="stats-grid">
            <div className="stat-card">
              <h3>التطبيقات</h3>
              <p className="stat-number">{stats.totalApps}</p>
            </div>
            <div className="stat-card">
              <h3>التحميلات</h3>
              <p className="stat-number">{stats.totalDownloads}</p>
            </div>
            <div className="stat-card">
              <h3>المستخدمون</h3>
              <p className="stat-number">{stats.totalUsers}</p>
            </div>
            <div className="stat-card">
              <h3>المطورون</h3>
              <p className="stat-number">{stats.totalDevelopers}</p>
            </div>
          </div>
        )}

        <h2>التطبيقات</h2>
        <div className="apps-table">
          <table>
            <thead>
              <tr>
                <th>اسم التطبيق</th>
                <th>المطور</th>
                <th>التحميلات</th>
                <th>الحالة</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {apps.map((app) => (
                <tr key={app._id}>
                  <td>{app.name}</td>
                  <td>{app.developer?.name || 'غير معروف'}</td>
                  <td>{app.downloadCount}</td>
                  <td>
                    <span className={app.isActive ? 'active' : 'inactive'}>
                      {app.isActive ? 'مفعل' : 'معطل'}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => toggleAppStatus(app._id, app.isActive)}
                      className="btn-toggle"
                    >
                      {app.isActive ? 'تعطيل' : 'تفعيل'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
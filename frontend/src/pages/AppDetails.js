import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AppDetails.css';

function AppDetails() {
  const { id } = useParams();
  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchApp();
  }, [id]);

  const fetchApp = async () => {
    try {
      const response = await axios.get(`/api/apps/${id}`);
      setApp(response.data);
    } catch (err) {
      console.error('Error fetching app:', err);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await axios.post(`/api/downloads/${id}`);
      window.location.href = response.data.downloadLink;
    } catch (err) {
      alert('خطأ في التحميل');
    }
  };

  if (loading) return <div className="loading-page">جاري التحميل...</div>;
  if (!app) return <div className="loading-page">التطبيق غير موجود</div>;

  return (
    <div className="app-details-page">
      <div className="container">
        <div className="app-details">
          <div className="app-header">
            <div className="app-icon-large">
              {app.icon ? (
                <img src={app.icon} alt={app.name} />
              ) : (
                <div className="icon-placeholder">📱</div>
              )}
            </div>
            <div className="app-title-section">
              <h1>{app.name}</h1>
              <p className="package-name">{app.packageName}</p>
              <div className="app-rating">
                <span>⭐ {app.rating.toFixed(1)}</span>
                <span>📥 {app.downloadCount} تحميل</span>
              </div>
            </div>
          </div>

          <button onClick={handleDownload} className="download-btn">
            📥 تحميل التطبيق
          </button>

          <div className="app-content">
            <section>
              <h2>الوصف</h2>
              <p>{app.description}</p>
            </section>

            {app.features && app.features.length > 0 && (
              <section>
                <h2>المميزات</h2>
                <ul>
                  {app.features.map((feature, idx) => (
                    <li key={idx}>✓ {feature}</li>
                  ))}
                </ul>
              </section>
            )}

            <section>
              <h2>المعلومات</h2>
              <div className="info-grid">
                <div>
                  <strong>الإصدار:</strong>
                  <p>{app.version || 'N/A'}</p>
                </div>
                <div>
                  <strong>الفئة:</strong>
                  <p>{app.category}</p>
                </div>
                <div>
                  <strong>حجم التطبيق:</strong>
                  <p>{app.fileSize ? (app.fileSize / 1024 / 1024).toFixed(2) + ' MB' : 'N/A'}</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppDetails;
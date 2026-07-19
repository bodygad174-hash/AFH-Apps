import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppCard from '../components/AppCard';
import './Home.css';

function Home() {
  const [apps, setApps] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApps();
  }, [search, category]);

  const fetchApps = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (category) params.category = category;

      const response = await axios.get('/api/apps', { params });
      setApps(response.data.apps);
    } catch (err) {
      console.error('Error fetching apps:', err);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['Gaming', 'Social', 'Productivity', 'Utilities', 'Photography', 'Music', 'Other'];

  return (
    <div className="home">
      <div className="hero">
        <h1>AFH Apps</h1>
        <p>أفضل متجر تطبيقات أندرويد</p>
      </div>

      <div className="container">
        <div className="filters">
          <input
            type="text"
            placeholder="ابحث عن تطبيق..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="category-select"
          >
            <option value="">جميع الفئات</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="loading">جاري التحميل...</div>
        ) : apps.length === 0 ? (
          <div className="no-apps">لا توجد تطبيقات</div>
        ) : (
          <div className="apps-grid">
            {apps.map((app) => (
              <AppCard key={app._id} app={app} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
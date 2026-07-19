import React, { useState } from 'react';
import axios from 'axios';
import './JokeGenerator.css';

function JokeGenerator() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [jokeType, setJokeType] = useState('general');

  const fetchJoke = async () => {
    try {
      setLoading(true);
      let apiUrl = 'https://api.api-ninjas.com/v1/jokes';
      
      if (jokeType !== 'general') {
        apiUrl += `?category=${jokeType}`;
      }

      const response = await axios.get(apiUrl, {
        headers: {
          'X-Api-Key': 'YOUR_API_KEY_HERE' // استبدل بـ API Key من api-ninjas.com
        }
      });

      setJoke(response.data[0].joke);
    } catch (err) {
      console.error('خطأ في جلب النكتة:', err);
      setJoke('😅 حدث خطأ! حاول مرة أخرى');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="joke-generator">
      <div className="joke-container">
        <h1>🎭 مولد النكات</h1>
        <p>اضغط الزر واحصل على نكتة عشوائية!</p>

        <div className="joke-controls">
          <select
            value={jokeType}
            onChange={(e) => setJokeType(e.target.value)}
            className="joke-select"
          >
            <option value="general">نكات عامة</option>
            <option value="knock-knock">نكات Knock Knock</option>
            <option value="programming">نكات برمجية</option>
          </select>

          <button
            onClick={fetchJoke}
            disabled={loading}
            className="joke-btn"
          >
            {loading ? '⏳ جاري التحميل...' : '😂 احصل على نكتة'}
          </button>
        </div>

        {joke && (
          <div className="joke-display">
            <p className="joke-text">{joke}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default JokeGenerator;
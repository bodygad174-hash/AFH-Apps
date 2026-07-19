import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🎮 AFH Apps
        </Link>

        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              الرئيسية
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/jokes" className="nav-link">
              🎭 النكات
            </Link>
          </li>

          {!user ? (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  تسجيل الدخول
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  إنشاء حساب
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <span className="nav-user">👤 {user.name}</span>
              </li>
              {user.role === 'admin' && (
                <li className="nav-item">
                  <Link to="/admin" className="nav-link admin-link">
                    لوحة التحكم
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <button onClick={handleLogout} className="nav-logout">
                  تسجيل الخروج
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
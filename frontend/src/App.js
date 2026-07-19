import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AppDetails from './pages/AppDetails';
import AdminDashboard from './pages/AdminDashboard';
import JokeGenerator from './pages/JokeGenerator';

function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/app/:id" element={<AppDetails />} />
        <Route path="/jokes" element={<JokeGenerator />} />
        {user?.role === 'admin' && (
          <Route path="/admin" element={<AdminDashboard />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
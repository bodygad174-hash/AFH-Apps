const express = require('express');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const App = require('../models/App');
const User = require('../models/User');
const Download = require('../models/Download');

const router = express.Router();

// Dashboard stats
router.get('/stats', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const totalApps = await App.countDocuments();
    const totalDownloads = await Download.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalDevelopers = await User.countDocuments({ role: 'developer' });
    
    res.json({
      totalApps,
      totalDownloads,
      totalUsers,
      totalDevelopers
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all apps (admin)
router.get('/apps', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const apps = await App.find().populate('developer', 'name email');
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update app status
router.patch('/apps/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const app = await App.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(app);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

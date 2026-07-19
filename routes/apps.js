const express = require('express');
const App = require('../models/App');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Get all apps
router.get('/', async (req, res) => {
  try {
    const { category, search, page = 1, limit = 20 } = req.query;
    let filter = { isActive: true };
    
    if (category) filter.category = category;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const apps = await App.find(filter)
      .populate('developer', 'name avatar')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    
    const total = await App.countDocuments(filter);
    
    res.json({ apps, total, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get app by ID
router.get('/:id', async (req, res) => {
  try {
    const app = await App.findById(req.params.id).populate('developer', 'name avatar');
    if (!app) return res.status(404).json({ error: 'App not found' });
    res.json(app);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create app (requires auth)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, packageName, description, category } = req.body;
    
    const app = new App({
      name,
      packageName,
      description,
      category,
      developer: req.user.id
    });
    
    await app.save();
    res.status(201).json(app);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

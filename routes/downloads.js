const express = require('express');
const App = require('../models/App');
const Download = require('../models/Download');

const router = express.Router();

// Log download
router.post('/:appId', async (req, res) => {
  try {
    const app = await App.findById(req.params.appId);
    if (!app) return res.status(404).json({ error: 'App not found' });
    
    // Log the download
    const download = new Download({
      app: req.params.appId,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
      referer: req.headers.referer
    });
    
    await download.save();
    
    // Increment download count
    app.downloadCount += 1;
    await app.save();
    
    res.json({ downloadLink: app.downloadLink, backupLink: app.backupDownloadLink });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

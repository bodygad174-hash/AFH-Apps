const mongoose = require('mongoose');

const downloadSchema = new mongoose.Schema({
  app: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'App',
    required: true
  },
  userId: String,
  ipAddress: String,
  userAgent: String,
  referer: String,
  downloadedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Download', downloadSchema);

const mongoose = require('mongoose');

const appSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  packageName: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  category: {
    type: String,
    enum: ['Gaming', 'Social', 'Productivity', 'Utilities', 'Photography', 'Music', 'Other'],
    default: 'Other'
  },
  developer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  version: String,
  minSdkVersion: Number,
  targetSdkVersion: Number,
  permissions: [String],
  features: [String],
  icon: String,
  banner: String,
  screenshots: [String],
  downloadLink: String,
  backupDownloadLink: String,
  changelog: String,
  fileSize: Number,
  downloadCount: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviews: [{
    userId: mongoose.Schema.Types.ObjectId,
    userName: String,
    rating: Number,
    comment: String,
    createdAt: Date
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('App', appSchema);

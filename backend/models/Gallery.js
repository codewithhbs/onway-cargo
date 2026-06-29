const mongoose = require('mongoose');
const { toJSONOpts } = require('./_transform');

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  category: { type: String, default: 'General', trim: true },
  image: { type: String, required: true },
  sort_order: { type: Number, default: 0 },
}, { timestamps: true, toJSON: toJSONOpts });

module.exports = mongoose.model('Gallery', gallerySchema);

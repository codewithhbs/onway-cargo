const mongoose = require('mongoose');
const { toJSONOpts } = require('./_transform');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, trim: true },
  excerpt: { type: String, default: '' },
  content: { type: String, default: '' },
  image: { type: String, required: true },
  author: { type: String, default: 'Onwayy Cargo' },
  category: { type: String, default: 'Logistics' },
  status: { type: String, enum: ['published', 'draft'], default: 'published' },
}, { timestamps: true, toJSON: toJSONOpts });

module.exports = mongoose.model('Blog', blogSchema);

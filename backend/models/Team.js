const mongoose = require('mongoose');
const { toJSONOpts } = require('./_transform');

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  role: { type: String, required: true, trim: true },
  image: { type: String, required: true },
  facebook: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  twitter: { type: String, default: '' },
  instagram: { type: String, default: '' },
  sort_order: { type: Number, default: 0 },
}, { timestamps: true, toJSON: toJSONOpts });

module.exports = mongoose.model('Team', teamSchema);

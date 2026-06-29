const mongoose = require('mongoose');
const { toJSONOpts } = require('./_transform');

const quoteSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, default: '' },
  freight_type: { type: String, default: '' },
  incoterms: { type: String, default: '' },
  weight: { type: String, default: '' },
  dimension: { type: String, default: '' },
  is_read: { type: Number, default: 0 },
}, { timestamps: true, toJSON: toJSONOpts });

module.exports = mongoose.model('Quote', quoteSchema);

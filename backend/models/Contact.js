const mongoose = require('mongoose');
const { toJSONOpts } = require('./_transform');

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  subject: { type: String, default: '' },
  message: { type: String, default: '' },
  is_read: { type: Number, default: 0 },
}, { timestamps: true, toJSON: toJSONOpts });

module.exports = mongoose.model('Contact', contactSchema);

const mongoose = require('mongoose');
const { toJSONOpts } = require('./_transform');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
}, { timestamps: true, toJSON: toJSONOpts });

module.exports = mongoose.model('User', userSchema);

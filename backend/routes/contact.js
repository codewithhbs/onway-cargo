const express = require('express');
const mongoose = require('mongoose');
const Contact = require('../models/Contact');
const { auth } = require('../middleware/auth');

const router = express.Router();
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

router.post('/', async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body || {};
    if (!name) return res.status(400).json({ success: false, message: 'Name is required' });
    const row = await Contact.create({
      name, email: email || '', phone: phone || '', subject: subject || '', message: message || '', is_read: 0,
    });
    res.status(201).json({ success: true, message: 'Thank you! Your message has been received.', id: row.id });
  } catch (e) { next(e); }
});

router.get('/', auth, async (req, res, next) => {
  try {
    const rows = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, data: rows });
  } catch (e) { next(e); }
});

router.patch('/:id/read', auth, async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) return res.status(404).json({ success: false, message: 'Not found' });
    const read = req.body && req.body.is_read != null ? Number(req.body.is_read) : 1;
    await Contact.findByIdAndUpdate(req.params.id, { is_read: read });
    res.json({ success: true });
  } catch (e) { next(e); }
});

router.delete('/:id', auth, async (req, res, next) => {
  try {
    if (isValidId(req.params.id)) await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (e) { next(e); }
});

module.exports = router;

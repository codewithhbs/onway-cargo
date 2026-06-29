const express = require('express');
const mongoose = require('mongoose');
const Quote = require('../models/Quote');
const { auth } = require('../middleware/auth');

const router = express.Router();
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

router.post('/', async (req, res, next) => {
  try {
    const { name, email, freightType, freight_type, incoterms, weight, dimension } = req.body || {};
    if (!name) return res.status(400).json({ success: false, message: 'Name is required' });
    const row = await Quote.create({
      name, email: email || '', freight_type: freightType || freight_type || '',
      incoterms: incoterms || '', weight: weight || '', dimension: dimension || '', is_read: 0,
    });
    res.status(201).json({ success: true, message: 'Quote request received. Our team will contact you soon.', id: row.id });
  } catch (e) { next(e); }
});

router.get('/', auth, async (req, res, next) => {
  try {
    const rows = await Quote.find().sort({ createdAt: -1 });
    res.json({ success: true, data: rows });
  } catch (e) { next(e); }
});

router.patch('/:id/read', auth, async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) return res.status(404).json({ success: false, message: 'Not found' });
    const read = req.body && req.body.is_read != null ? Number(req.body.is_read) : 1;
    await Quote.findByIdAndUpdate(req.params.id, { is_read: read });
    res.json({ success: true });
  } catch (e) { next(e); }
});

router.delete('/:id', auth, async (req, res, next) => {
  try {
    if (isValidId(req.params.id)) await Quote.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (e) { next(e); }
});

module.exports = router;

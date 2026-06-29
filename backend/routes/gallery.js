const express = require('express');
const mongoose = require('mongoose');
const Gallery = require('../models/Gallery');
const { auth } = require('../middleware/auth');
const { upload, fileUrl } = require('../middleware/upload');

const router = express.Router();
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

router.get('/', async (req, res, next) => {
  try {
    const rows = await Gallery.find().sort({ sort_order: 1, createdAt: -1 });
    res.json({ success: true, data: rows });
  } catch (e) { next(e); }
});

router.get('/:id', async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) return res.status(404).json({ success: false, message: 'Not found' });
    const row = await Gallery.findById(req.params.id);
    if (!row) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: row });
  } catch (e) { next(e); }
});

router.post('/', auth, upload.single('image'), async (req, res, next) => {
  try {
    const { title, category, sort_order } = req.body || {};
    let image = req.body.image || '';
    if (req.file) image = fileUrl(req, req.file.filename);
    if (!title || !image) return res.status(400).json({ success: false, message: 'Title and image required' });
    const row = await Gallery.create({ title, category: category || 'General', image, sort_order: Number(sort_order) || 0 });
    res.status(201).json({ success: true, data: row });
  } catch (e) { next(e); }
});

router.put('/:id', auth, upload.single('image'), async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) return res.status(404).json({ success: false, message: 'Not found' });
    const c = await Gallery.findById(req.params.id);
    if (!c) return res.status(404).json({ success: false, message: 'Not found' });
    const { title, category, sort_order } = req.body || {};
    if (req.file) c.image = fileUrl(req, req.file.filename);
    else if (req.body.image) c.image = req.body.image;
    if (title != null) c.title = title;
    if (category != null) c.category = category;
    if (sort_order != null) c.sort_order = Number(sort_order);
    await c.save();
    res.json({ success: true, data: c });
  } catch (e) { next(e); }
});

router.delete('/:id', auth, async (req, res, next) => {
  try {
    if (isValidId(req.params.id)) await Gallery.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (e) { next(e); }
});

module.exports = router;

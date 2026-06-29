const express = require('express');
const mongoose = require('mongoose');
const Team = require('../models/Team');
const { auth } = require('../middleware/auth');
const { upload, fileUrl } = require('../middleware/upload');

const router = express.Router();
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

router.get('/', async (req, res, next) => {
  try {
    const rows = await Team.find().sort({ sort_order: 1, createdAt: 1 });
    res.json({ success: true, data: rows });
  } catch (e) { next(e); }
});

router.get('/:id', async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) return res.status(404).json({ success: false, message: 'Not found' });
    const row = await Team.findById(req.params.id);
    if (!row) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: row });
  } catch (e) { next(e); }
});

router.post('/', auth, upload.single('image'), async (req, res, next) => {
  try {
    const { name, role, facebook, linkedin, twitter, instagram, sort_order } = req.body || {};
    let image = req.body.image || '';
    if (req.file) image = fileUrl(req, req.file.filename);
    if (!name || !role || !image) return res.status(400).json({ success: false, message: 'Name, role and image required' });
    const row = await Team.create({
      name, role, image, facebook: facebook || '', linkedin: linkedin || '',
      twitter: twitter || '', instagram: instagram || '', sort_order: Number(sort_order) || 0,
    });
    res.status(201).json({ success: true, data: row });
  } catch (e) { next(e); }
});

router.put('/:id', auth, upload.single('image'), async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) return res.status(404).json({ success: false, message: 'Not found' });
    const c = await Team.findById(req.params.id);
    if (!c) return res.status(404).json({ success: false, message: 'Not found' });
    const { name, role, facebook, linkedin, twitter, instagram, sort_order } = req.body || {};
    if (req.file) c.image = fileUrl(req, req.file.filename);
    else if (req.body.image) c.image = req.body.image;
    if (name != null) c.name = name;
    if (role != null) c.role = role;
    if (facebook != null) c.facebook = facebook;
    if (linkedin != null) c.linkedin = linkedin;
    if (twitter != null) c.twitter = twitter;
    if (instagram != null) c.instagram = instagram;
    if (sort_order != null) c.sort_order = Number(sort_order);
    await c.save();
    res.json({ success: true, data: c });
  } catch (e) { next(e); }
});

router.delete('/:id', auth, async (req, res, next) => {
  try {
    if (isValidId(req.params.id)) await Team.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (e) { next(e); }
});

module.exports = router;

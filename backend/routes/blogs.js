const express = require('express');
const mongoose = require('mongoose');
const Blog = require('../models/Blog');
const { auth } = require('../middleware/auth');
const { upload, fileUrl } = require('../middleware/upload');

const router = express.Router();
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

function slugify(str) {
  return String(str).toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

// Build a slug that is unique in the collection (ignoring the doc being edited)
async function uniqueSlug(base, ignoreId = null) {
  const root = base || `post-${Date.now()}`;
  let slug = root;
  let i = 1;
  while (true) {
    const existing = await Blog.findOne({ slug });
    if (!existing || (ignoreId && String(existing._id) === String(ignoreId))) return slug;
    slug = `${root}-${i++}`;
  }
}

router.get('/', async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    const rows = await Blog.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: rows });
  } catch (e) { next(e); }
});

router.get('/slug/:slug', async (req, res, next) => {
  try {
    const row = await Blog.findOne({ slug: req.params.slug });
    if (!row) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: row });
  } catch (e) { next(e); }
});

router.get('/:id', async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) return res.status(404).json({ success: false, message: 'Not found' });
    const row = await Blog.findById(req.params.id);
    if (!row) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: row });
  } catch (e) { next(e); }
});

router.post('/', auth, upload.single('image'), async (req, res, next) => {
  try {
    const { title, excerpt, content, author, category, status } = req.body || {};
    let image = req.body.image || '';
    if (req.file) image = fileUrl(req, req.file.filename);
    if (!title || !image) return res.status(400).json({ success: false, message: 'Title and image required' });
    const slug = await uniqueSlug(slugify(req.body.slug || title));
    const row = await Blog.create({
      title, slug, excerpt: excerpt || '', content: content || '', image,
      author: author || 'Onwayy Cargo', category: category || 'Logistics', status: status || 'published',
    });
    res.status(201).json({ success: true, data: row });
  } catch (e) { next(e); }
});

router.put('/:id', auth, upload.single('image'), async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) return res.status(404).json({ success: false, message: 'Not found' });
    const c = await Blog.findById(req.params.id);
    if (!c) return res.status(404).json({ success: false, message: 'Not found' });
    const { title, excerpt, content, author, category, status } = req.body || {};
    if (req.file) c.image = fileUrl(req, req.file.filename);
    else if (req.body.image) c.image = req.body.image;
    if (req.body.slug) c.slug = await uniqueSlug(slugify(req.body.slug), c._id);
    if (title != null) c.title = title;
    if (excerpt != null) c.excerpt = excerpt;
    if (content != null) c.content = content;
    if (author != null) c.author = author;
    if (category != null) c.category = category;
    if (status != null) c.status = status;
    await c.save();
    res.json({ success: true, data: c });
  } catch (e) { next(e); }
});

router.delete('/:id', auth, async (req, res, next) => {
  try {
    if (isValidId(req.params.id)) await Blog.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (e) { next(e); }
});

module.exports = router;

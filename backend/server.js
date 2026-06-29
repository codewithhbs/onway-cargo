require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');

const { connectDB } = require('./db/connect');
const { auth } = require('./middleware/auth');

const Gallery = require('./models/Gallery');
const Team = require('./models/Team');
const Blog = require('./models/Blog');
const Contact = require('./models/Contact');
const Quote = require('./models/Quote');

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware ---
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || '*' }));
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

// --- Static: uploaded images + admin panel ---
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/admin', express.static(path.join(__dirname, 'public', 'admin')));

// --- API routes ---
app.use('/api/auth', require('./routes/auth'));
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/team', require('./routes/team'));
app.use('/api/blogs', require('./routes/blogs'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/quotes', require('./routes/quotes'));

// --- Dashboard stats (admin) ---
app.get('/api/stats', auth, async (req, res, next) => {
  try {
    const [gallery, team, blogs, contacts, contacts_unread, quotes, quotes_unread] = await Promise.all([
      Gallery.countDocuments(),
      Team.countDocuments(),
      Blog.countDocuments(),
      Contact.countDocuments(),
      Contact.countDocuments({ is_read: 0 }),
      Quote.countDocuments(),
      Quote.countDocuments({ is_read: 0 }),
    ]);
    res.json({ success: true, data: { gallery, team, blogs, contacts, contacts_unread, quotes, quotes_unread } });
  } catch (e) { next(e); }
});

// --- Health check ---
app.get('/api/health', (req, res) => res.json({ success: true, status: 'ok' }));

// --- Admin root redirect ---
app.get('/', (req, res) => res.redirect('/admin'));

// --- 404 ---
app.use((req, res) => res.status(404).json({ success: false, message: 'Route not found' }));

// --- Error handler (multer, mongoose, etc.) ---
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(400).json({ success: false, message: err.message });
});

// Start only when run directly (so it can be imported in tests)
if (require.main === module) {
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`\n🚚 Onwayy Cargo backend running at http://localhost:${PORT}`);
        console.log(`   Admin panel:  http://localhost:${PORT}/admin`);
        console.log(`   API base:     http://localhost:${PORT}/api\n`);
      });
    })
    .catch((err) => {
      console.error('❌ MongoDB connection failed:', err.message);
      process.exit(1);
    });
}

module.exports = app;

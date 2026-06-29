require('dotenv').config();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { connectDB } = require('./connect');

const User = require('../models/User');
const Gallery = require('../models/Gallery');
const Team = require('../models/Team');
const Blog = require('../models/Blog');

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

async function seed() {
  await connectDB();

  // ---- Admin user ----
  if (!(await User.findOne({ username: ADMIN_USERNAME }))) {
    const hash = bcrypt.hashSync(ADMIN_PASSWORD, 10);
    await User.create({ username: ADMIN_USERNAME, password: hash });
    console.log(`\u2713 Admin user created  ->  ${ADMIN_USERNAME} / ${ADMIN_PASSWORD}`);
  } else {
    console.log('\u2713 Admin user already exists');
  }

  // ---- Gallery ----
  if ((await Gallery.countDocuments()) === 0) {
    const items = [
      ['Air Freight Operations', 'Air Freight', '/assets/img/gallery/gallery-01.jpg'],
      ['Ocean Freight Containers', 'Ocean Freight', '/assets/img/gallery/gallery-02.jpg'],
      ['Road Transportation Fleet', 'Transportation', '/assets/img/gallery/gallery-03.jpg'],
      ['Warehousing & Storage', 'Warehousing', '/assets/img/gallery/gallery-04.jpg'],
      ['Custom Clearance Desk', 'Custom Clearance', '/assets/img/gallery/gallery-05.jpg'],
      ['Project Cargo Handling', 'Project Cargo', '/assets/img/gallery/gallery-06.jpg'],
    ];
    await Gallery.insertMany(items.map((it, i) => ({ title: it[0], category: it[1], image: it[2], sort_order: i })));
    console.log(`\u2713 Seeded ${items.length} gallery items`);
  }

  // ---- Team ----
  if ((await Team.countDocuments()) === 0) {
    const members = [
      ['Rajesh Kumar', 'Managing Director', '/assets/img/team/t-1.png'],
      ['Priya Sharma', 'Operations Head', '/assets/img/team/t-2.png'],
      ['Amit Verma', 'Freight Manager', '/assets/img/team/t-3.png'],
      ['Neha Gupta', 'Customer Relations', '/assets/img/team/t-6.png'],
    ];
    await Team.insertMany(members.map((m, i) => ({
      name: m[0], role: m[1], image: m[2], facebook: '', linkedin: '', twitter: '', instagram: '', sort_order: i,
    })));
    console.log(`\u2713 Seeded ${members.length} team members`);
  }

  // ---- Blogs ----
  if ((await Blog.countDocuments()) === 0) {
    const blogs = [
      {
        title: 'How Air Freight Keeps Global Supply Chains Moving',
        slug: 'how-air-freight-keeps-global-supply-chains-moving',
        excerpt: 'Air freight is the fastest way to move time-sensitive cargo across borders. Here is how Onwayy Cargo makes it reliable and cost-effective.',
        image: '/assets/img/blog/blog-page-img-1.jpg',
        category: 'Air Freight',
        content: '<p>When speed matters most, air freight is the answer. For high-value, perishable, or urgent shipments, moving goods by air gives businesses the predictability and reach they need to serve customers worldwide.</p><p>At Onwayy Cargo we combine an extensive network of airline partners with experienced documentation specialists, so your shipment clears paperwork smoothly and reaches its destination on time. From express delivery to chartering, hazardous and perishable handling, and door-to-door service, every detail is managed for you.</p><h3>Why choose air freight?</h3><p>Air freight dramatically reduces transit time compared with ocean or land transport. It is ideal for industries such as pharmaceuticals, electronics, automotive spares and e-commerce, where late delivery directly affects revenue.</p>',
      },
      {
        title: 'Understanding Incoterms 2020: A Quick Guide for Importers',
        slug: 'understanding-incoterms-2020-quick-guide',
        excerpt: 'Incoterms define who is responsible for cost, risk and insurance at every stage of an international shipment. Know them before you trade.',
        image: '/assets/img/blog/blog-page-img-2.jpg',
        category: 'Insights',
        content: '<p>Incoterms \u2014 short for International Commercial Terms \u2014 are a set of globally recognised rules published by the International Chamber of Commerce. They clearly define the responsibilities of buyers and sellers for the delivery of goods under sales contracts.</p><p>Choosing the right Incoterm protects both parties from misunderstandings about who pays freight, who carries the risk, and where ownership changes hands. Whether you are working with EXW, FOB, CIF or DDP, our specialists guide you to the most cost-effective and least risky option for your trade lane.</p>',
      },
      {
        title: 'Warehousing & Distribution: Storing Smarter, Shipping Faster',
        slug: 'warehousing-distribution-storing-smarter',
        excerpt: 'Dedicated, shared and bonded warehousing solutions that keep your inventory secure and your distribution efficient.',
        image: '/assets/img/blog/blog-page-img-3.jpg',
        category: 'Warehousing',
        content: '<p>Modern logistics is about more than just moving boxes \u2014 it is about storing them intelligently. Onwayy Cargo offers dedicated, shared and bonded warehousing that forms an integral part of your supply chain.</p><p>With strategically located facilities, real-time inventory visibility and value-added services such as kitting, labelling and order fulfilment, we help you reduce holding costs while improving delivery speed to your customers.</p>',
      },
    ];
    await Blog.insertMany(blogs.map((b) => ({
      title: b.title, slug: b.slug, excerpt: b.excerpt, content: b.content,
      image: b.image, author: 'Onwayy Cargo', category: b.category, status: 'published',
    })));
    console.log(`\u2713 Seeded ${blogs.length} blog posts`);
  }

  console.log('\nSeeding complete.');
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => { console.error('Seeding failed:', err.message); process.exit(1); });

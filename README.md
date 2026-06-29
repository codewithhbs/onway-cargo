# Onwayy Cargo — Website + Backend + Admin Panel

Full package: **Next.js 16 frontend** + **Node.js/Express backend** + **Admin Panel**.
Gallery, Team aur Blog pages **dynamic** hain (backend se aate hain), aur Contact + Quote
form submissions seedhe **admin panel** me dikhte hain.

```
onway/
├── frontend/   → Next.js 16 website (public site)
└── backend/    → Express API + Admin Panel (/admin) + JSON file DB
```

---

## 1) Backend chalao (pehle ye)

```bash
cd backend
npm install
npm run seed      # admin user + sample gallery/team/blogs seed karta hai (ek hi baar)
npm start         # http://localhost:5000 par chalega
```

- **Admin Panel:** http://localhost:5000/admin

- **API base:** http://localhost:5000/api
- **Health check:** http://localhost:5000/api/health

Database ek simple **JSON file** hai: `backend/db/data.json` (koi native DB compile
nahi — kahin bhi bina headache ke chalega). Reset karna ho to file delete karke
`npm run seed` dobara chala do.

### Backend config — `backend/.env`
```
PORT=5000
JWT_SECRET=...            # production me strong random value daalo

FRONTEND_ORIGIN=http://localhost:3000   # CORS (frontend ka URL)
PUBLIC_BASE_URL=http://localhost:5000   # uploaded image URLs ke liye
```

> Admin password badalna ho: `.env` me `ADMIN_PASSWORD` set karo, `data.json` delete
> karke `npm run seed` dobara chalao. (Ya naya user banane ka logic add kar sakte ho.)

---

## 2) Frontend chalao

```bash
cd frontend
npm install
npm run dev       # http://localhost:3000
```

Production build:
```bash
npm run build
npm start
```

### Frontend config — `frontend/.env.local`
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SITE_URL=https://www.onwayycargo.com
```
- `NEXT_PUBLIC_API_URL` → backend ka API base. Live server par backend domain daalo.
- `NEXT_PUBLIC_SITE_URL` → sitemap / canonical / OG tags isi se bante hain.

> Agar backend band ho tab bhi `next build` **crash nahi** hoga — dynamic pages
> safe fallback (khaali list) ke saath render ho jaate hain.

---

## 3) Admin Panel se kya manage hota hai

| Section        | Kaam |
|----------------|------|
| **Dashboard**  | Counts + unread leads |
| **Gallery**    | Images add/edit/delete (file upload ya URL) → `/gallery` page par live |
| **Team**       | Members + social links → `/team` page par live |
| **Blogs**      | Posts (HTML content, slug auto) → `/blog` aur `/blog/[slug]` par live |
| **Contact Leads** | Website ke Contact form submissions (unread badge + mark read) |
| **Quote Requests** | Homepage "Price Calculation" form submissions |

Image upload: form me **file choose** karo (backend `uploads/` me save hoti hai), ya
seedha **image URL/path** paste kar do — dono chalte hain.

---

## 4) Pages (sab reference site jaise + SEO ready)

- `/` Home (hero slider, about, services, quote form, testimonials, counters, blog)
- `/about`, `/contact`
- Services: `/air-freight` `/ocean-freight` `/custom-clearance` `/transportation` `/warehousing`
- Industries: `/food-industry` `/automobiles` `/tiles-industry` `/manufacturing` `/pharmaceutical` `/other-industries`
- `/gallery` `/team` `/blog` `/blog/[slug]` `/incoterms`
- SEO: per-page `<title>`/meta/canonical/OpenGraph, `Organization` JSON-LD,
  auto `/sitemap.xml` (blog slugs included) + `/robots.txt`

---

## 5) Production notes

1. Backend ko apne server par chalao (PM2/systemd). `.env` me `PUBLIC_BASE_URL` aur
   `FRONTEND_ORIGIN` apne real domains se set karo.
2. Frontend `.env.local` me `NEXT_PUBLIC_API_URL` ko backend domain par point karo.
3. `JWT_SECRET` aur admin password zaroor badlo.
4. Uploaded images persist rakhne ke liye `backend/uploads/` ko backup/volume me rakho.

---

**Verified:** Backend API 14/14 tests pass · `next build` exit 0 (23 routes) ·
frontend⇄backend data contract matched.

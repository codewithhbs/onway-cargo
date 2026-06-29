# Onwayy Cargo — Backend ab MongoDB (Mongoose) par

Ye sirf **changed/new backend files** hain. Apne project me `backend/` folder ke andar
ye files **overwrite/add** kar do. Frontend me **kuch change nahi** — wahi same chalega.

---

## Kya naya / change hua

**NEW files**
- `backend/db/connect.js` — MongoDB connection (mongoose)
- `backend/models/` — 6 models + 1 helper:
  `User.js`, `Gallery.js`, `Team.js`, `Blog.js`, `Contact.js`, `Quote.js`, `_transform.js`

**CHANGED files**
- `backend/package.json` — `mongoose` add hua (sqlite/json store hata)
- `backend/server.js` — Mongo se connect hokar start hota hai; `/api/stats` ab DB counts se
- `backend/db/seed.js` — ab Mongo me seed karta hai
- `backend/routes/*.js` — saare 6 routes mongoose models use karte hain
- `backend/.env.example` — `MONGODB_URI` add hua

**DELETE karo (ab use nahi)**
- `backend/db/store.js`   ❌ hata do
- `backend/db/data.json`  ❌ hata do (purana JSON data)

> `middleware/` aur `public/admin/` files **bilkul same** hain — unhe haath lagane ki zaroorat nahi.

---

## Important: API response same hai

Models ka `toJSON` aise set kiya hai ki response bilkul pehle jaisa rahe —
`_id` ki jagah `id`, aur `createdAt` → `created_at` (format `YYYY-MM-DD HH:MM:SS`),
`is_read` 0/1 Number. Isliye **frontend aur admin panel bina kisi change ke chalte hain.**

---

## Chalane ka tareeka

### 1) MongoDB ready karo
- **Local:** MongoDB install karke chalu rakho → URI: `mongodb://127.0.0.1:27017/onwayycargo`
- **Atlas (free cloud):** cluster banao, connection string lo:
  `mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/onwayycargo`

### 2) `backend/.env` me ye line add/update karo
```
MONGODB_URI=mongodb://127.0.0.1:27017/onwayycargo
```
(baaki .env values — PORT, JWT_SECRET, ADMIN_*, FRONTEND_ORIGIN, PUBLIC_BASE_URL — same rehti hain)

### 3) Install + seed + run
```bash
cd backend
npm install        # mongoose install hoga
npm run seed       # admin + sample gallery/team/blogs Mongo me daalega (ek baar)
npm start          # http://localhost:5556
```
- Admin panel: http://localhost:5556/admin  (login: `admin` / `admin123`)
- Agar Mongo band hoga to server clear error dega: `MongoDB connection failed: ...`

---

## Test status (honest)

- ✅ Saari files **syntax-checked** (`node --check`) — sab clean
- ✅ `mongoose` install — 0 vulnerabilities
- ✅ **Response-shape verified** — har model ka `toJSON` wahi fields deta hai jo
  frontend/admin padhte hain (`id`, `created_at`, `is_read`, slug, etc.), `_id`/`__v` hidden
- ✅ Date format `YYYY-MM-DD HH:MM:SS` — purane store se exactly same
- ⚠️ **Live DB CRUD test** sandbox me nahi chala (MongoDB binary download wahan blocked tha).
  Ye tumhare machine pe Mongo ke saath chalega. Routes logic purane (tested) version se 1:1 same hai.

Pehli baar chalane ke baad ek round check kar lena: ek gallery item add karo, ek
contact form submit karo, admin me dikhna chahiye — sab wire-up same hai.

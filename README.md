# Olideen Directory — Setup Guide
## Built by Olideen Technologies | May 2025

---

## 📁 File Structure

```
olideen-directory/
├── index.html          ← Homepage (main directory)
├── town.html           ← Town landing page (?t=Estcourt)
├── business.html       ← Individual business page (?id=123)
├── towns.html          ← Towns hub + categories hub
├── categories.html     ← Category page (?cat=Tech)
├── robots.txt          ← Tells Google what to index
├── sitemap.xml         ← Generate this (see below)
├── css/
│   └── style.css       ← All shared styles
└── js/
    └── app.js          ← Supabase, SEO utils, shared logic
```

---

## 🚀 STEP 1 — Set Up Supabase (Free)

1. Go to https://supabase.com → New Project (free tier)
2. Create a table called `businesses` with these columns:

| Column       | Type        | Notes                    |
|-------------|-------------|--------------------------|
| id           | int8        | Primary key, auto-increment |
| name         | text        | NOT NULL                 |
| category     | text        | NOT NULL                 |
| town         | text        | NOT NULL                 |
| whatsapp     | text        | nullable                 |
| website      | text        | nullable                 |
| description  | text        | nullable                 |
| owner_name   | text        | nullable — PRIVATE       |
| owner_phone  | text        | nullable — PRIVATE       |
| owner_email  | text        | nullable — PRIVATE       |
| created_at   | timestamptz | default: now()           |

3. Enable Row Level Security (RLS):
   - Go to Authentication → Policies
   - Add policy: SELECT → "Enable read access for all users" (anon)
   - Add policy: INSERT → "Enable insert for all users" (anon)

4. IMPORTANT — Create a DB View to protect private fields:
```sql
CREATE VIEW public_businesses AS
  SELECT id, name, category, town, whatsapp, website, description, created_at
  FROM businesses;
```
Then update `PUBLIC_COLS` in `js/app.js` to query `public_businesses` instead.

5. Go to Settings → API → copy your:
   - Project URL
   - anon / public key

6. Paste them in `js/app.js`:
```js
const SUPABASE_URL      = 'https://xxxx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhb...';
```

---

## 🌐 STEP 2 — Deploy to Netlify (Free, gets you a real domain)

1. Go to https://netlify.com → New Site → Deploy manually
2. Drag and drop your entire `olideen-directory/` folder
3. You'll get a free URL like `https://olideen-directory.netlify.app`
4. For a custom domain (recommended for SEO):
   - Buy `olideendirectory.co.za` at https://domains.co.za (~R150/year)
   - In Netlify: Site Settings → Domain Management → Add custom domain
   - Follow DNS instructions

---

## 🔍 STEP 3 — Google Search Console (Critical for ranking)

1. Go to https://search.google.com/search-console
2. Add your property (your domain URL)
3. Verify ownership (Netlify makes this easy — HTML file method)
4. Submit your sitemap:
   - Generate `sitemap.xml` (see below)
   - In Search Console: Sitemaps → Submit `sitemap.xml`
5. Request indexing for each page:
   - Paste each URL into the search bar at top → "Request Indexing"

---

## 🗺️ STEP 4 — Generate sitemap.xml

Create a `sitemap.xml` file in your root. Update the URLs and dates:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://directory.olideentech.co.za/</loc>
    <lastmod>2025-05-01</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://directory.olideentech.co.za/towns.html</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://directory.olideentech.co.za/categories.html</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <!-- Add a <url> entry for each town and each business -->
  <url>
    <loc>https://directory.olideentech.co.za/town.html?t=Estcourt</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

**Pro tip:** Once you have 20+ listings, write a small Node.js script to
auto-generate sitemap.xml from your Supabase data. Ask Olideen to help build this.

---

## 📈 STEP 5 — After Launch: What Actually Gets You Ranked

### Short term (first 30 days):
- Share the directory link in every local WhatsApp group
- Post in local Facebook groups: "Estcourt Businesses", "Ladysmith Buy & Sell" etc.
- Get 10+ real businesses listed — an empty directory ranks for nothing
- Ask each listed business to share their listing link on their socials
  (this creates backlinks, which Google counts as votes)

### Medium term (1-3 months):
- Every new business added = a new indexed page = a new keyword opportunity
- Target zero-competition phrases: "hair salon Estcourt", "computer repairs Ladysmith"
- Add a "Business of the Week" feature to generate fresh content Google likes

### Long term (3-6 months):
- Expand to neighbouring towns: Winterton, Colenso, Weenen, Newcastle
- Consider adding a blog section: "Top 5 Restaurants in Ladysmith" etc.
  These rank easily and funnel traffic to your directory
- Monetise: featured listings, website builds for listed businesses

---

## 🔒 Privacy Notes

The form collects:
- **Public:** name, category, town, WhatsApp, website, description
- **Private (Olideen only):** owner name, personal phone, email

The Supabase query in `app.js` only fetches public columns.
The private columns never leave the database unless you query them
with your service_role key (which stays server-side only).

---

## 📞 Support
Built by Olideen Technologies — May 2025
For questions, use the Study Smart WhatsApp or email.

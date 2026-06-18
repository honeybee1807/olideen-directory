/* ================================================================
   HIDDEN GEMS SA — Shared JS (app.js)
   Built by Olideen Technologies · Estcourt, KZN
   ================================================================ */

/* ─── SUPABASE CONFIG ───────────────────────────────────────────── */
const SUPABASE_URL      = 'https://uwxanvllgomcpjtotowd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3eGFudmxsZ29tY3BqdG90b3dkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwODM0NTMsImV4cCI6MjA5NTY1OTQ1M30.NHKwsie6Vsza6BiHulYPLuuIPI9s4jgLRuNKejW8JKk';

const PUBLIC_COLS = 'id,name,category,town,whatsapp,website,description,created_at';

let _sb = null;
let isSupabaseReady = false;

function initSupabase() {
  try {
    _sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    isSupabaseReady = true;
    return true;
  } catch(e) { console.error('Supabase init:', e); return false; }
}

/* ─── DEMO DATA ──────────────────────────────────────────────────── */
const DEMO_DATA = [
  { id:1,  name:"Aunty Mariam's Samoosas",  category:"Food & Drinks",   town:"Estcourt",         whatsapp:"27831111111", website:"",                                   description:"Freshly made samoosas, vetkoek and pies from our home kitchen — order for events, markets or daily delivery in Estcourt.", status:"approved" },
  { id:2,  name:"Sbu Diesel Transport",     category:"Transport",       town:"Estcourt",         whatsapp:"27832222222", website:"",                                   description:"Reliable diesel transport for furniture, goods and equipment across KZN. Honest, experienced, locally trusted.", status:"approved" },
  { id:3,  name:"Sweet Layers Bakery",      category:"Food & Drinks",   town:"Estcourt",         whatsapp:"27833333333", website:"https://instagram.com/sweetlayers",  description:"Custom celebration cakes, cupcakes and pastries made to order from our home kitchen. Serving Estcourt families since 2021.", status:"approved" },
  { id:4,  name:"Estcourt Tutors",          category:"Education",       town:"Estcourt",         whatsapp:"27834444444", website:"",                                   description:"Maths, Science and English tutoring for Grade 8–12. Small groups and one-on-one sessions — WhatsApp to book a slot.", status:"approved" },
  { id:5,  name:"Kuda's Tech Hub",          category:"Tech",            town:"Estcourt",         whatsapp:"27835111222", website:"",                                   description:"Laptop repairs, phone screen replacements and IT support. Affordable rates, quick turnaround — Estcourt based.", status:"approved" },
  { id:6,  name:"Ladysmith Auto Repairs",   category:"Services",        town:"Ladysmith",        whatsapp:"27835555555", website:"",                                   description:"Trusted mechanical repairs and panel beating for all vehicle makes. Honest work — serving Ladysmith for over 8 years.", status:"approved" },
  { id:7,  name:"Clarity Beauty Studio",    category:"Health & Beauty", town:"Ladysmith",        whatsapp:"27836666666", website:"",                                   description:"Hair braiding, natural hair care, nail art and beauty treatments in Ladysmith. Book via WhatsApp — walk-ins welcome.", status:"approved" },
  { id:8,  name:"MaMkhize Home Catering",   category:"Food & Drinks",   town:"Ladysmith",        whatsapp:"27837777777", website:"",                                   description:"Traditional Zulu catering for funerals, weddings and imicimbi. Home-cooked food prepared with pride.", status:"approved" },
  { id:9,  name:"Neon Visuals KZN",         category:"Tech",            town:"Ladysmith",        whatsapp:"27838888888", website:"https://instagram.com/neonvisuals",  description:"Graphic design, flyers, logos and social media content. Fast turnaround, affordable packages for local businesses.", status:"approved" },
  { id:10, name:"Corner Spaza Ladysmith",   category:"Retail",          town:"Ladysmith",        whatsapp:"27839123456", website:"",                                   description:"Groceries, airtime, electricity tokens and everyday essentials. Open 7 days — conveniently located in Ladysmith.", status:"approved" },
  { id:11, name:"Mama Zulu Catering",       category:"Food & Drinks",   town:"Pietermaritzburg", whatsapp:"27839999999", website:"",                                   description:"Traditional Zulu catering for all occasions — funerals, weddings, events. We cook with pride and serve with joy.", status:"approved" },
  { id:12, name:"PMB Coding Academy",       category:"Education",       town:"Pietermaritzburg", whatsapp:"27830000000", website:"https://pmbcodes.co.za",             description:"Coding bootcamps, computer literacy and digital skills for youth and adults in Pietermaritzburg. Empowering local talent.", status:"approved" },
  { id:13, name:"The Hair Lounge PMB",      category:"Health & Beauty", town:"Pietermaritzburg", whatsapp:"27831234000", website:"https://instagram.com/hairlounge",   description:"Natural hair care, protective styles and colour treatments in PMB. We celebrate every hair type — WhatsApp to book.", status:"approved" },
  { id:14, name:"BuildRight Hardware",      category:"Retail",          town:"Pietermaritzburg", whatsapp:"27835678000", website:"",                                   description:"Quality hardware, tools and building materials at competitive prices. Serving PMB contractors and homeowners daily.", status:"approved" },
  { id:15, name:"Nomvula's Home Cleaning",  category:"Home & Garden",   town:"Newcastle",        whatsapp:"27839876543", website:"",                                   description:"Reliable home and office cleaning services in Newcastle. Thorough, affordable and trusted by local families.", status:"approved" },
  { id:16, name:"Newcastle Spaza & More",   category:"Retail",          town:"Newcastle",        whatsapp:"27836543210", website:"",                                   description:"Groceries, airtime, electricity tokens and everyday household essentials. Open 7 days a week in Newcastle.", status:"approved" },
  { id:17, name:"Thabo's Barber Shop",      category:"Health & Beauty", town:"Newcastle",        whatsapp:"27831987654", website:"",                                   description:"Fresh cuts, fades and beard trims in Newcastle. Clean shop, good vibes — walk in or book on WhatsApp.", status:"approved" },
];

/* ─── DATA FETCHERS ──────────────────────────────────────────────── */
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function fetchAllBusinesses() {
  if (!isSupabaseReady) { await sleep(400); return [...DEMO_DATA]; }
  const { data, error } = await _sb
    .from('businesses').select(PUBLIC_COLS)
    .eq('status','approved')
    .order('town',{ascending:true}).order('created_at',{ascending:false});
  if (error) throw error;
  return data || [];
}

async function fetchByTown(town) {
  if (!isSupabaseReady) { await sleep(300); return DEMO_DATA.filter(b => normaliseTown(b.town) === normaliseTown(town)); }
  const { data, error } = await _sb
    .from('businesses').select(PUBLIC_COLS)
    .eq('status','approved').ilike('town',town)
    .order('created_at',{ascending:false});
  if (error) throw error;
  return data || [];
}

async function fetchByCategory(cat) {
  if (!isSupabaseReady) { await sleep(300); return DEMO_DATA.filter(b => b.category === cat); }
  const { data, error } = await _sb
    .from('businesses').select(PUBLIC_COLS)
    .eq('status','approved').eq('category',cat)
    .order('town',{ascending:true}).order('created_at',{ascending:false});
  if (error) throw error;
  return data || [];
}

async function fetchById(id) {
  if (!isSupabaseReady) { await sleep(200); return DEMO_DATA.find(b => b.id == id) || null; }
  const { data, error } = await _sb
    .from('businesses').select(PUBLIC_COLS)
    .eq('status','approved').eq('id',id).single();
  if (error) throw error;
  return data;
}

async function insertBusiness(payload) {
  if (!isSupabaseReady) { await sleep(700); return { ...payload, id: Date.now(), status: 'pending' }; }
  const { error } = await _sb
    .from('businesses')
    .insert([{ ...payload, status: 'pending' }]);
  if (error) throw error;
  return { status: 'pending' };
}

/* ─── HELPERS ────────────────────────────────────────────────────── */
function normaliseTown(t) {
  return (t || 'Other').trim().replace(/\b\w/g, c => c.toUpperCase());
}
function slugify(str) {
  return (str || '').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
}
function escHtml(s) {
  if (!s) return '';
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function waLink(num) { return num ? 'https://wa.me/' + num.replace(/\D/g,'') : ''; }
function initial(n)  { return n ? n.charAt(0).toUpperCase() : '?'; }

const CAT_CLASS = {
  'Tech':'cat-tech','Food & Drinks':'cat-food','Fashion':'cat-fashion',
  'Health & Beauty':'cat-health','Education':'cat-education',
  'Services':'cat-services','Retail':'cat-retail',
  'Transport':'cat-transport','Home & Garden':'cat-home','Other':'cat-other',
};
function catClass(c) { return CAT_CLASS[c] || 'cat-other'; }

function groupByTown(list) {
  const map = new Map();
  list.forEach(b => {
    const t = normaliseTown(b.town);
    if (!map.has(t)) map.set(t, []);
    map.get(t).push(b);
  });
  return new Map([...map.entries()].sort((a,b) => a[0].localeCompare(b[0])));
}

/* ─── SEO ────────────────────────────────────────────────────────── */
function setMeta(title, description, canonical) {
  document.title = title;
  setMetaTag('name','description', description);
  setMetaTag('property','og:title', title);
  setMetaTag('property','og:description', description);
  if (canonical) {
    let l = document.querySelector('link[rel="canonical"]');
    if (!l) { l = document.createElement('link'); l.rel = 'canonical'; document.head.appendChild(l); }
    l.href = canonical;
  }
}
function setMetaTag(attr, name, content) {
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, name); document.head.appendChild(el); }
  el.setAttribute('content', content);
}
function injectSchema(json) {
  let el = document.getElementById('schema-ld');
  if (!el) { el = document.createElement('script'); el.id = 'schema-ld'; el.type = 'application/ld+json'; document.head.appendChild(el); }
  el.textContent = JSON.stringify(json);
}
function buildLocalBusinessSchema(biz) {
  const s = {
    "@context":"https://schema.org","@type":"LocalBusiness",
    "name": biz.name,
    "description": biz.description || `${biz.name} is a ${biz.category} business in ${biz.town}.`,
    "address": { "@type":"PostalAddress","addressLocality":biz.town,"addressCountry":"ZA" },
    "areaServed": biz.town,
    "category": biz.category,
  };
  if (biz.website) s.url = biz.website;
  if (biz.whatsapp) s.telephone = '+' + biz.whatsapp.replace(/\D/g,'');
  return s;
}
function buildDirectorySchema(businesses, pageName) {
  return {
    "@context":"https://schema.org","@type":"ItemList",
    "name": `${pageName} — Hidden Gems SA`,
    "numberOfItems": businesses.length,
    "itemListElement": businesses.map((b,i) => ({
      "@type":"ListItem","position":i+1,
      "item":{ "@type":"LocalBusiness","name":b.name,
        "address":{"@type":"PostalAddress","addressLocality":b.town,"addressCountry":"ZA"} }
    }))
  };
}

/* ─── RENDERERS ──────────────────────────────────────────────────── */
function renderTableSection(list) {
  if (!list.length) return '';
  const rows = list.map((b,i) => `
    <tr style="animation-delay:${i*0.03}s">
      <td><div class="biz-name-cell">
        <div class="biz-initial">${initial(b.name)}</div>
        <div>
          <a href="business.html?id=${b.id}" class="biz-name-link" style="font-weight:600;color:var(--ink);transition:color .15s;"
             onmouseover="this.style.color='var(--gold)'" onmouseout="this.style.color='var(--ink)'">${escHtml(b.name)}</a>
          ${b.description ? `<div class="biz-desc-small">${escHtml(b.description)}</div>` : ''}
        </div>
      </div></td>
      <td><span class="cat-pill ${catClass(b.category)}">${escHtml(b.category)}</span></td>
      <td><a href="town.html?t=${encodeURIComponent(b.town)}" style="color:var(--muted);font-size:0.82rem;">${escHtml(normaliseTown(b.town))}</a></td>
      <td>${b.whatsapp
        ? `<a href="${waLink(b.whatsapp)}" target="_blank" class="link-btn wa link-btn-sm">💬 WhatsApp</a>`
        : `<span class="link-btn none link-btn-sm">—</span>`}</td>
      <td>${b.website
        ? `<a href="${escHtml(b.website)}" target="_blank" rel="noopener" class="link-btn web link-btn-sm">↗ Website</a>`
        : `<span class="link-btn none link-btn-sm">—</span>`}</td>
    </tr>`).join('');
  return `<div class="table-wrap"><table>
    <thead><tr><th>Business</th><th>Category</th><th>Town</th><th>WhatsApp</th><th>Website</th></tr></thead>
    <tbody>${rows}</tbody></table></div>`;
}

function renderCardsSection(list) {
  if (!list.length) return '';
  return `<div class="cards-grid">${list.map((b,i) => `
    <article class="biz-card anim" style="animation-delay:${i*0.04}s">
      <div class="card-head">
        <div class="card-initial">${initial(b.name)}</div>
        <div style="min-width:0;">
          <div style="display:flex;align-items:center;gap:7px;margin-bottom:3px;">
            <span style="width:5px;height:5px;background:var(--gold);transform:rotate(45deg);flex-shrink:0;"></span>
            <span style="font-size:10px;font-weight:600;letter-spacing:.15em;text-transform:uppercase;color:var(--muted);">${escHtml(b.category)}</span>
          </div>
          <div class="card-name">
            <a href="business.html?id=${b.id}">${escHtml(b.name)}</a>
          </div>
        </div>
      </div>
      ${b.description ? `<p class="card-desc">${escHtml(b.description)}</p>` : ''}
      <div class="card-town">&#9679; <a href="town.html?t=${encodeURIComponent(b.town)}" style="color:inherit;">${escHtml(normaliseTown(b.town))}</a></div>
      <div class="card-links">
        ${b.whatsapp
          ? `<a href="${waLink(b.whatsapp)}" target="_blank" class="link-btn wa">💬 WhatsApp</a>`
          : `<span class="link-btn none" style="flex:1;text-align:center;">No WhatsApp</span>`}
        ${b.website
          ? `<a href="${escHtml(b.website)}" target="_blank" rel="noopener" class="link-btn web">↗ Website</a>`
          : `<span class="link-btn none" style="flex:1;text-align:center;">No Website</span>`}
      </div>
    </article>`).join('')}</div>`;
}

function renderTownSections(grouped, view, collapsedTowns) {
  let html = '';
  grouped.forEach((businesses, town) => {
    const collapsed = collapsedTowns && collapsedTowns.has(town);
    const bodyId = 'town-body-' + slugify(town);
    const bodyStyle = collapsed ? 'max-height:0;' : `max-height:${businesses.length*300+200}px;`;
    html += `
      <div class="town-section anim">
        <div class="town-header" onclick="toggleTown('${town.replace(/'/g,"\\'")}','${bodyId}')">
          <div style="display:flex;align-items:baseline;gap:18px;">
            <span class="town-title"><a href="town.html?t=${encodeURIComponent(town)}">${escHtml(town)}</a></span>
            <span class="town-count">${businesses.length} listed</span>
          </div>
          <span class="town-line"></span>
          <span class="town-toggle ${collapsed ? 'collapsed' : ''}" id="toggle-${bodyId}">▾</span>
        </div>
        <div class="town-body ${collapsed ? 'collapsed' : ''}" style="${bodyStyle}" id="${bodyId}">
          ${view === 'cards' ? renderCardsSection(businesses) : renderTableSection(businesses)}
        </div>
      </div>`;
  });
  return html || `<div class="state-box">
    <div class="state-icon">No gems found.</div>
    <h3>No results</h3>
    <p>Try a different search, or <button onclick="openModal()" style="background:none;border:none;color:var(--gold);cursor:pointer;font-size:0.85rem;text-decoration:underline">be the first to list here!</button></p>
  </div>`;
}

function toggleTown(town, bodyId) {
  const body   = document.getElementById(bodyId);
  const toggle = document.getElementById('toggle-' + bodyId);
  if (!body) return;
  if (body.classList.contains('collapsed')) {
    body.style.maxHeight = body.scrollHeight + 400 + 'px';
    body.classList.remove('collapsed');
    toggle && toggle.classList.remove('collapsed');
  } else {
    body.style.maxHeight = body.scrollHeight + 'px';
    requestAnimationFrame(() => {
      body.style.maxHeight = '0';
      body.classList.add('collapsed');
      toggle && toggle.classList.add('collapsed');
    });
  }
}

/* ─── MODAL ──────────────────────────────────────────────────────── */
function openModal() {
  document.getElementById('modalOverlay').classList.add('open');
  document.getElementById('formContent').style.display = '';
  document.getElementById('successState').classList.remove('show');
  resetForm();
  setTimeout(() => document.getElementById('bizName').focus(), 260);
}
function closeModal() { document.getElementById('modalOverlay').classList.remove('open'); }
function handleOverlayClick(e) { if (e.target === document.getElementById('modalOverlay')) closeModal(); }
function resetForm() {
  ['bizName','bizCategory','bizTown','bizWhatsapp','bizWebsite','bizDesc','bizDetail','bizOwner','ownerContact']
    .forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
}

/* ─── SUBMIT ─────────────────────────────────────────────────────── */
async function submitBusiness() {
  const name     = (document.getElementById('bizName')?.value      || '').trim();
  const category = document.getElementById('bizCategory')?.value   || '';
  const town     = (document.getElementById('bizTown')?.value      || '').trim();
  const whatsapp = (document.getElementById('bizWhatsapp')?.value  || '').trim();
  const website  = (document.getElementById('bizWebsite')?.value   || '').trim();
  const desc     = (document.getElementById('bizDesc')?.value      || '').trim();
  const detail   = (document.getElementById('bizDetail')?.value    || '').trim();
  const owner    = (document.getElementById('bizOwner')?.value     || '').trim();
  const contact  = (document.getElementById('ownerContact')?.value || '').trim();

  if (!name)     { showToast('⚠️ Business name is required','error'); return; }
  if (!category) { showToast('⚠️ Please select a category','error'); return; }
  if (!town)     { showToast('⚠️ Town / area is required','error'); return; }
  if (!detail)   { showToast('⚠️ Please tell us about your business','error'); return; }
  if (!owner)    { showToast('⚠️ Your name is required','error'); return; }
  if (!contact)  { showToast('⚠️ Your WhatsApp or email is required','error'); return; }

  const btn = document.getElementById('submitBtn');
  const lbl = document.getElementById('submitLabel');
  btn.disabled = true; lbl.textContent = 'Submitting…';

  const isEmail = contact.includes('@');
  const payload = {
    name, category, town: normaliseTown(town),
    whatsapp: whatsapp || null, website: website || null,
    description: desc || null, business_detail: detail,
    owner_name: owner,
    owner_phone: isEmail ? null : contact,
    owner_email: isEmail ? contact : null,
  };

  try {
    await insertBusiness(payload);
    document.getElementById('formContent').style.display = 'none';
    document.getElementById('successState').classList.add('show');
  } catch(e) {
    console.error(e);
    showToast('❌ Submission failed. Please try again.','error');
    btn.disabled = false; lbl.textContent = 'Submit for Review →';
  }
}

/* ─── TOAST ──────────────────────────────────────────────────────── */
let _toastTimer;
function showToast(msg, type = 'info') {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg; t.className = `toast show ${type}`;
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => t.classList.remove('show'), 3500);
}

/* ─── SHARED NAV / FOOTER / MODAL ───────────────────────────────── */
function renderNav(activePage) {
  return `<nav class="topnav" role="navigation" aria-label="Main navigation">
    <div class="topnav-inner">
      <a href="index.html" class="logo" aria-label="Hidden Gems SA Home">
        <img src="Hidden_Gems_SA_Logo.png" alt="Hidden Gems SA" class="logo-img" />
      </a>
      <div class="nav-links">
        <a href="index.html"      class="nav-link ${activePage==='home'?'active':''}">Directory</a>
        <a href="towns.html"      class="nav-link ${activePage==='towns'?'active':''}">Towns</a>
        <a href="categories.html" class="nav-link ${activePage==='cats'?'active':''}">Categories</a>
        <button class="nav-link nav-cta" onclick="openModal()">List My Business</button>
      </div>
    </div>
  </nav>`;
}

function renderFooter() {
  return `<footer role="contentinfo">
    <div class="footer-inner">
      <div class="footer-logo-wrap">
        <img src="Hidden_Gems_SA_Logo.png" alt="Hidden Gems SA" class="footer-logo-img" />
      </div>
      <p class="footer-left">
        Discovering local businesses across KwaZulu-Natal.<br>
        <span>Built by <strong>Olideen Technologies</strong> &middot; Estcourt, KZN</span>
      </p>
      <div class="footer-links">
        <a href="index.html">Directory</a>
        <a href="towns.html">Towns</a>
        <a href="categories.html">Categories</a>
        <a href="sitemap.xml">Sitemap</a>
      </div>
    </div>
  </footer>`;
}

function renderModal() {
  return `
  <div class="modal-overlay" id="modalOverlay" onclick="handleOverlayClick(event)">
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
      <div class="modal-accent"></div>
      <button class="modal-close" onclick="closeModal()" aria-label="Close">✕</button>

      <div id="formContent">
        <div class="modal-header">
          <h2 id="modalTitle">List your business</h2>
          <p>Free &middot; under two minutes &middot; reviewed before it goes live.</p>
        </div>
        <div class="modal-body">

          <div class="form-section-label public">
            <span class="dot"></span> Shown on the directory
          </div>

          <div class="field-group">
            <label>Business Name <span class="req">*</span></label>
            <input type="text" id="bizName" placeholder="e.g. Sweet Layers Bakery" maxlength="80" />
          </div>
          <div class="form-row">
            <div class="field-group">
              <label>Category <span class="req">*</span></label>
              <select id="bizCategory">
                <option value="">Select…</option>
                <option>Food &amp; Drinks</option>
                <option>Health &amp; Beauty</option>
                <option>Services</option>
                <option>Education</option>
                <option>Tech</option>
                <option>Fashion</option>
                <option>Retail</option>
                <option>Transport</option>
                <option>Home &amp; Garden</option>
                <option>Other</option>
              </select>
            </div>
            <div class="field-group">
              <label>Town / Area <span class="req">*</span></label>
              <input type="text" id="bizTown" placeholder="e.g. Estcourt" maxlength="60" />
            </div>
          </div>
          <div class="form-row">
            <div class="field-group">
              <label>WhatsApp Number</label>
              <input type="tel" id="bizWhatsapp" placeholder="27831234567" />
              <span class="field-hint">Country code, no + symbol</span>
            </div>
            <div class="field-group">
              <label>Website / Social Link</label>
              <input type="url" id="bizWebsite" placeholder="https:// or Instagram" />
            </div>
          </div>
          <div class="field-group">
            <label>Short Description</label>
            <input type="text" id="bizDesc" placeholder="One line about your business (optional)" maxlength="120" />
          </div>

          <div class="form-section-label private" style="margin-top:4px;">
            <span class="dot"></span> For review — not shown publicly
          </div>

          <div class="field-group">
            <label>What does your business sell or do? <span class="req">*</span></label>
            <textarea id="bizDetail" placeholder="A sentence or two helps us approve faster." maxlength="300"></textarea>
          </div>
          <div class="field-group">
            <label>Your Name <span class="req">*</span></label>
            <input type="text" id="bizOwner" placeholder="Your real name" maxlength="60" />
          </div>
          <div class="field-group">
            <label>Your WhatsApp or Email <span class="req">*</span></label>
            <input type="text" id="ownerContact" placeholder="So we can notify you when approved" maxlength="100" />
          </div>

        </div>
        <div class="modal-footer">
          <button class="btn-cancel" onclick="closeModal()">Cancel</button>
          <button class="btn-submit" id="submitBtn" onclick="submitBusiness()">
            <span id="submitLabel">Submit for Review →</span>
          </button>
        </div>
      </div>

      <div class="success-state" id="successState">
        <div class="success-icon">✓</div>
        <h3>Submission Received!</h3>
        <p>Your listing is <strong>under review</strong>. We'll notify you via <strong>WhatsApp or email</strong> once approved — usually within 24 hours.</p>
        <button class="btn-primary" onclick="closeModal()" style="margin-top:1rem;">Done →</button>
      </div>
    </div>
  </div>
  <div class="toast" id="toast" role="alert"></div>`;
}

/* ─── KEYBOARD ───────────────────────────────────────────────────── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    document.getElementById('searchInput')?.focus();
  }
});

/* ─── BOOT ───────────────────────────────────────────────────────── */
initSupabase();
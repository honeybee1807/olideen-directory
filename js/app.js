/* ================================================================
   HIDDEN GEMS SA — app.js
   Single JavaScript file for all pages
   Built by Olideen Technologies · Estcourt, KZN
   ================================================================ */


/* ================================================================
   1. CONFIG
   ================================================================ */

const SUPABASE_URL      = 'https://uwxanvllgomcpjtotowd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3eGFudmxsZ29tY3BqdG90b3dkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwODM0NTMsImV4cCI6MjA5NTY1OTQ1M30.NHKwsie6Vsza6BiHulYPLuuIPI9s4jgLRuNKejW8JKk';
const PUBLIC_COLS       = 'id,name,category,town,whatsapp,website,description,owner_name,logo_url,created_at';

const CLOUDINARY_CLOUD  = 'dfxhlv8jc';
const CLOUDINARY_PRESET = 'hidden_gems_sa_logos';
const CLOUDINARY_URL    = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD}/image/upload`;

const SITE_URL = 'https://directory.olideentech.co.za';

let _sb = null;
let isSupabaseReady = false;

function initSupabase() {
  try {
    _sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    isSupabaseReady = true;
  } catch (e) {
    console.error('Supabase init failed:', e);
  }
}


/* ================================================================
   2. DEMO DATA (fallback when Supabase is not ready)
   ================================================================ */

const DEMO_DATA = [
  { id:1,  name:"Aunty Mariam's Samoosas",  owner_name:"Mariam Hassim",    category:"Food & Drinks",   town:"Estcourt",         whatsapp:"27831111111", website:"",                                  logo_url:null, description:"Freshly made samoosas, vetkoek and pies from our home kitchen — order for events, markets or daily delivery in Estcourt.", status:"approved" },
  { id:2,  name:"Sbu Diesel Transport",     owner_name:"Sibusiso Dlamini", category:"Transport",       town:"Estcourt",         whatsapp:"27832222222", website:"",                                  logo_url:null, description:"Reliable diesel transport for furniture, goods and equipment across KZN. Honest, experienced, locally trusted.", status:"approved" },
  { id:3,  name:"Sweet Layers Bakery",      owner_name:"Naledi Pillay",    category:"Food & Drinks",   town:"Estcourt",         whatsapp:"27833333333", website:"https://instagram.com/sweetlayers", logo_url:null, description:"Custom celebration cakes, cupcakes and pastries made to order from our home kitchen. Serving Estcourt families since 2021.", status:"approved" },
  { id:4,  name:"Estcourt Tutors",          owner_name:"Thandi Nkosi",     category:"Education",       town:"Estcourt",         whatsapp:"27834444444", website:"",                                  logo_url:null, description:"Maths, Science and English tutoring for Grade 8–12. Small groups and one-on-one sessions — WhatsApp to book a slot.", status:"approved" },
  { id:5,  name:"Kuda's Tech Hub",          owner_name:"Kudakwashe Moyo",  category:"Tech",            town:"Estcourt",         whatsapp:"27835111222", website:"",                                  logo_url:null, description:"Laptop repairs, phone screen replacements and IT support. Affordable rates, quick turnaround — Estcourt based.", status:"approved" },
  { id:6,  name:"Ladysmith Auto Repairs",   owner_name:"Jabu Ntuli",       category:"Services",        town:"Ladysmith",        whatsapp:"27835555555", website:"",                                  logo_url:null, description:"Trusted mechanical repairs and panel beating for all vehicle makes. Honest work — serving Ladysmith for over 8 years.", status:"approved" },
  { id:7,  name:"Clarity Beauty Studio",    owner_name:"Zanele Khumalo",   category:"Health & Beauty", town:"Ladysmith",        whatsapp:"27836666666", website:"",                                  logo_url:null, description:"Hair braiding, natural hair care, nail art and beauty treatments in Ladysmith. Book via WhatsApp — walk-ins welcome.", status:"approved" },
  { id:8,  name:"MaMkhize Home Catering",   owner_name:"Nomsa Mkhize",     category:"Food & Drinks",   town:"Ladysmith",        whatsapp:"27837777777", website:"",                                  logo_url:null, description:"Traditional Zulu catering for funerals, weddings and imicimbi. Home-cooked food prepared with pride.", status:"approved" },
  { id:9,  name:"Neon Visuals KZN",         owner_name:"Bongani Zulu",     category:"Tech",            town:"Ladysmith",        whatsapp:"27838888888", website:"https://instagram.com/neonvisuals", logo_url:null, description:"Graphic design, flyers, logos and social media content. Fast turnaround, affordable packages for local businesses.", status:"approved" },
  { id:10, name:"Corner Spaza Ladysmith",   owner_name:"Sipho Cele",       category:"Retail",          town:"Ladysmith",        whatsapp:"27839123456", website:"",                                  logo_url:null, description:"Groceries, airtime, electricity tokens and everyday essentials. Open 7 days — conveniently located in Ladysmith.", status:"approved" },
  { id:11, name:"Mama Zulu Catering",       owner_name:"Lindiwe Zulu",     category:"Food & Drinks",   town:"Pietermaritzburg", whatsapp:"27839999999", website:"",                                  logo_url:null, description:"Traditional Zulu catering for all occasions — funerals, weddings, events. We cook with pride and serve with joy.", status:"approved" },
  { id:12, name:"PMB Coding Academy",       owner_name:"Andile Mbatha",    category:"Education",       town:"Pietermaritzburg", whatsapp:"27830000000", website:"https://pmbcodes.co.za",            logo_url:null, description:"Coding bootcamps, computer literacy and digital skills for youth and adults in Pietermaritzburg. Empowering local talent.", status:"approved" },
  { id:13, name:"The Hair Lounge PMB",      owner_name:"Precious Sithole", category:"Health & Beauty", town:"Pietermaritzburg", whatsapp:"27831234000", website:"https://instagram.com/hairlounge",  logo_url:null, description:"Natural hair care, protective styles and colour treatments in PMB. We celebrate every hair type — WhatsApp to book.", status:"approved" },
  { id:14, name:"BuildRight Hardware",      owner_name:"Ravi Naidoo",      category:"Retail",          town:"Pietermaritzburg", whatsapp:"27835678000", website:"",                                  logo_url:null, description:"Quality hardware, tools and building materials at competitive prices. Serving PMB contractors and homeowners daily.", status:"approved" },
  { id:15, name:"Nomvula's Home Cleaning",  owner_name:"Nomvula Dube",     category:"Home & Garden",   town:"Newcastle",        whatsapp:"27839876543", website:"",                                  logo_url:null, description:"Reliable home and office cleaning services in Newcastle. Thorough, affordable and trusted by local families.", status:"approved" },
  { id:16, name:"Newcastle Spaza & More",   owner_name:"Patrick Mokoena",  category:"Retail",          town:"Newcastle",        whatsapp:"27836543210", website:"",                                  logo_url:null, description:"Groceries, airtime, electricity tokens and everyday household essentials. Open 7 days a week in Newcastle.", status:"approved" },
  { id:17, name:"Thabo's Barber Shop",      owner_name:"Thabo Shabalala",  category:"Health & Beauty", town:"Newcastle",        whatsapp:"27831987654", website:"",                                  logo_url:null, description:"Fresh cuts, fades and beard trims in Newcastle. Clean shop, good vibes — walk in or book on WhatsApp.", status:"approved" },
];


/* ================================================================
   3. HELPERS
   ================================================================ */

function normaliseTown(t) {
  return (t || 'Other').trim().replace(/\b\w/g, c => c.toUpperCase());
}

function slugify(str) {
  return (str || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function escHtml(s) {
  if (!s) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function waLink(num) {
  return num ? 'https://wa.me/' + num.replace(/\D/g, '') : '';
}

function initial(n) {
  return n ? n.charAt(0).toUpperCase() : '?';
}

const CAT_CLASS = {
  'Tech':           'cat-tech',
  'Food & Drinks':  'cat-food',
  'Fashion':        'cat-fashion',
  'Health & Beauty':'cat-health',
  'Education':      'cat-education',
  'Services':       'cat-services',
  'Retail':         'cat-retail',
  'Transport':      'cat-transport',
  'Home & Garden':  'cat-home',
  'Other':          'cat-other',
};
function catClass(c) {
  return CAT_CLASS[c] || 'cat-other';
}

const CAT_FA = {
  'Tech':           'fa-solid fa-microchip',
  'Food & Drinks':  'fa-solid fa-utensils',
  'Fashion':        'fa-solid fa-shirt',
  'Health & Beauty':'fa-solid fa-spa',
  'Education':      'fa-solid fa-book-open',
  'Services':       'fa-solid fa-wrench',
  'Retail':         'fa-solid fa-bag-shopping',
  'Transport':      'fa-solid fa-truck',
  'Home & Garden':  'fa-solid fa-leaf',
  'Other':          'fa-solid fa-box',
};
function catIcon(c) {
  return CAT_FA[c] || 'fa-solid fa-box';
}

function groupByTown(list) {
  const map = new Map();
  list.forEach(b => {
    const t = normaliseTown(b.town);
    if (!map.has(t)) map.set(t, []);
    map.get(t).push(b);
  });
  return new Map([...map.entries()].sort((a, b) => a[0].localeCompare(b[0])));
}

/* Render business avatar — logo image if available, else lettered circle */
function renderAvatar(b, size = 'md') {
  const sizes = { sm: '36px', md: '50px', lg: '72px' };
  const fonts = { sm: '1rem',  md: '23px', lg: '2.2rem' };
  const px = sizes[size] || sizes.md;
  const fs = fonts[size] || fonts.md;

  if (b.logo_url) {
    return `<div class="biz-avatar" style="width:${px};height:${px};flex-shrink:0;">
      <img src="${escHtml(b.logo_url)}"
           alt="${escHtml(b.name)} logo"
           style="width:${px};height:${px};border-radius:50%;object-fit:cover;border:1px solid var(--gold-light);display:block;"
           onerror="this.parentElement.innerHTML='<div class=\\'biz-initial\\'style=\\'width:${px};height:${px};font-size:${fs};border-radius:50%;background:var(--gold-pale);border:1px solid var(--gold-light);color:var(--gold);display:flex;align-items:center;justify-content:center;font-family:var(--font-head);font-style:italic;\\'>${initial(b.name)}</div>'" />
    </div>`;
  }
  return `<div class="biz-initial" style="width:${px};height:${px};font-size:${fs};flex-shrink:0;">${initial(b.name)}</div>`;
}

const sleep = ms => new Promise(r => setTimeout(r, ms));


/* ================================================================
   4. SUPABASE DATA FETCHERS
   ================================================================ */

async function fetchAllBusinesses() {
  if (!isSupabaseReady) { await sleep(400); return [...DEMO_DATA]; }
  const { data, error } = await _sb
    .from('businesses').select(PUBLIC_COLS)
    .eq('status', 'approved')
    .order('town', { ascending: true })
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

async function fetchByTown(town) {
  if (!isSupabaseReady) { await sleep(300); return DEMO_DATA.filter(b => normaliseTown(b.town) === normaliseTown(town)); }
  const { data, error } = await _sb
    .from('businesses').select(PUBLIC_COLS)
    .eq('status', 'approved').ilike('town', town)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

async function fetchByCategory(cat) {
  if (!isSupabaseReady) { await sleep(300); return DEMO_DATA.filter(b => b.category === cat); }
  const { data, error } = await _sb
    .from('businesses').select(PUBLIC_COLS)
    .eq('status', 'approved').eq('category', cat)
    .order('town', { ascending: true })
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

async function fetchById(id) {
  if (!isSupabaseReady) { await sleep(200); return DEMO_DATA.find(b => b.id == id) || null; }
  const { data, error } = await _sb
    .from('businesses').select(PUBLIC_COLS)
    .eq('status', 'approved').eq('id', id).single();
  if (error) throw error;
  return data;
}

async function insertBusiness(payload) {
  if (!isSupabaseReady) { await sleep(700); return { ...payload, id: Date.now(), status: 'pending' }; }
  const { error } = await _sb.from('businesses').insert([{ ...payload, status: 'pending' }]);
  if (error) throw error;
  return { status: 'pending' };
}


/* ================================================================
   5. CLOUDINARY LOGO UPLOAD
   ================================================================ */

async function uploadToCloudinary(blob) {
  const fd = new FormData();
  fd.append('file', blob, 'logo.jpg');
  fd.append('upload_preset', CLOUDINARY_PRESET);
  const res  = await fetch(CLOUDINARY_URL, { method: 'POST', body: fd });
  const data = await res.json();
  if (!res.ok || data.error) throw new Error(data.error?.message || 'Upload failed');
  return data.secure_url.replace('/upload/', '/upload/w_400,h_400,c_fill,g_face,r_max,q_auto,f_auto/');
}


/* ================================================================
   6. LOGO CROP
   ================================================================ */

let _cropper     = null;
let _croppedBlob = null;

function openCropModal(file) {
  if (!file || !file.type.startsWith('image/')) { showToast('Please select an image file', 'error'); return; }
  if (file.size > 10 * 1024 * 1024) { showToast('Image must be under 10MB', 'error'); return; }

  const overlay = document.getElementById('cropOverlay');
  const img     = document.getElementById('cropImage');
  if (!overlay || !img) { showToast('Crop tool not ready', 'error'); return; }

  if (_cropper) { _cropper.destroy(); _cropper = null; }

  overlay.classList.add('open');
  img.src = '';

  function initCropper() {
    if (_cropper) { _cropper.destroy(); _cropper = null; }
    _cropper = new Cropper(img, {
      aspectRatio: 1,
      viewMode: 1,
      dragMode: 'move',
      autoCropArea: 0.85,
      ready() {
        const viewBox = document.querySelector('#cropOverlay .cropper-view-box');
        const face    = document.querySelector('#cropOverlay .cropper-face');
        if (viewBox) viewBox.style.borderRadius = '50%';
        if (face)    face.style.borderRadius    = '50%';
      }
    });
  }

  const reader = new FileReader();
  reader.onload = e => {
    img.onload  = initCropper;
    img.onerror = () => showToast('Could not load image', 'error');
    img.src     = e.target.result;
    if (img.complete && img.naturalWidth) initCropper();
  };
  reader.readAsDataURL(file);
}

function closeCropModal() {
  document.getElementById('cropOverlay').classList.remove('open');
  if (_cropper) { _cropper.destroy(); _cropper = null; }
}

async function confirmCrop() {
  if (!_cropper) { showToast('Crop not ready — select image again', 'error'); return; }

  const btn = document.getElementById('cropConfirmBtn');
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing…';

  try {
    const canvas = _cropper.getCroppedCanvas({ width: 400, height: 400, imageSmoothingQuality: 'high' });
    if (!canvas) throw new Error('Could not generate crop');

    await new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) { reject(new Error('Could not create blob')); return; }
        _croppedBlob = blob;
        resolve();
      }, 'image/jpeg', 0.88);
    });

    const previewURL  = canvas.toDataURL('image/jpeg', 0.88);
    const preview     = document.getElementById('logoPreview');
    const placeholder = document.getElementById('logoPlaceholder');
    if (preview)     { preview.src = previewURL; preview.style.display = 'block'; }
    if (placeholder) { placeholder.style.display = 'none'; }
    const area = document.getElementById('logoUploadArea');
    if (area) area.classList.add('has-image');

    closeCropModal();
    showToast('Logo ready — submit your listing to save it', 'success');
  } catch (e) {
    showToast('Crop failed: ' + (e.message || 'unknown error'), 'error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-check"></i> <span>Use This Crop</span>';
  }
}

function removeLogo() {
  _croppedBlob = null;
  const preview     = document.getElementById('logoPreview');
  const placeholder = document.getElementById('logoPlaceholder');
  preview.src = '';
  preview.style.display     = 'none';
  placeholder.style.display = '';
  document.getElementById('logoUploadArea').classList.remove('has-image');
  document.getElementById('bizLogo').value = '';
}

/* Show/hide the remove button based on whether an image is set */
const _logoObserver = new MutationObserver(() => {
  const area       = document.getElementById('logoUploadArea');
  const removeWrap = document.getElementById('logoRemoveWrap');
  if (!area || !removeWrap) return;
  removeWrap.style.display = area.classList.contains('has-image') ? '' : 'none';
});
document.addEventListener('DOMContentLoaded', () => {
  const area = document.getElementById('logoUploadArea');
  if (area) _logoObserver.observe(area, { attributes: true, attributeFilter: ['class'] });
});


/* ================================================================
   7. SEO HELPERS
   ================================================================ */

function setMeta(title, description, canonical) {
  document.title = title;
  setMetaTag('name', 'description', description);
  setMetaTag('property', 'og:title', title);
  setMetaTag('property', 'og:description', description);
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
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": biz.name,
    "description": biz.description || `${biz.name} is a ${biz.category} business in ${biz.town}, KwaZulu-Natal.`,
    "address": { "@type": "PostalAddress", "addressLocality": biz.town, "addressRegion": "KwaZulu-Natal", "addressCountry": "ZA" },
    "areaServed": biz.town,
    "category": biz.category,
  };
  if (biz.website)    s.url       = biz.website;
  if (biz.whatsapp)   s.telephone = '+' + biz.whatsapp.replace(/\D/g, '');
  if (biz.owner_name) s.employee  = { "@type": "Person", "name": biz.owner_name };
  if (biz.logo_url)   s.logo      = biz.logo_url;
  return s;
}

function buildDirectorySchema(businesses, pageName) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `${pageName} — Hidden Gems SA`,
    "numberOfItems": businesses.length,
    "itemListElement": businesses.map((b, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "LocalBusiness",
        "name": b.name,
        "address": { "@type": "PostalAddress", "addressLocality": b.town, "addressRegion": "KwaZulu-Natal", "addressCountry": "ZA" }
      }
    }))
  };
}


/* ================================================================
   8. RENDERERS — TABLE, CARDS, TOWN SECTIONS
   ================================================================ */

function renderTableSection(list) {
  if (!list.length) return '';
  const rows = list.map((b, i) => `
    <tr style="animation-delay:${i * 0.03}s">
      <td><div class="biz-name-cell">
        ${renderAvatar(b, 'sm')}
        <div>
          <a href="business.html?id=${b.id}" class="biz-name-link">${escHtml(b.name)}</a>
          ${b.owner_name ? `<div class="biz-owner-small"><i class="fa-regular fa-user" style="font-size:9px;"></i> ${escHtml(b.owner_name)}</div>` : ''}
          ${b.description ? `<div class="biz-desc-small">${escHtml(b.description)}</div>` : ''}
        </div>
      </div></td>
      <td><span class="cat-pill ${catClass(b.category)}"><i class="${catIcon(b.category)}"></i> ${escHtml(b.category)}</span></td>
      <td><a href="town.html?t=${encodeURIComponent(b.town)}" style="color:var(--muted);font-size:0.82rem;display:flex;align-items:center;gap:5px;"><i class="fa-solid fa-location-dot" style="font-size:10px;color:var(--gold);"></i>${escHtml(normaliseTown(b.town))}</a></td>
      <td>${b.whatsapp
        ? `<a href="${waLink(b.whatsapp)}" target="_blank" class="link-btn wa link-btn-sm"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>`
        : `<span class="link-btn none link-btn-sm">—</span>`}</td>
      <td>${b.website
        ? `<a href="${escHtml(b.website)}" target="_blank" rel="noopener" class="link-btn web link-btn-sm"><i class="fa-solid fa-arrow-up-right-from-square"></i> Website</a>`
        : `<span class="link-btn none link-btn-sm">—</span>`}</td>
    </tr>`).join('');

  return `<div class="table-wrap"><table>
    <thead><tr><th>Business</th><th>Category</th><th>Town</th><th>WhatsApp</th><th>Website</th></tr></thead>
    <tbody>${rows}</tbody>
  </table></div>`;
}

function renderCardsSection(list) {
  if (!list.length) return '';
  return `<div class="cards-grid">${list.map((b, i) => `
    <article class="biz-card anim" style="animation-delay:${i * 0.04}s">
      <div class="card-head">
        ${renderAvatar(b, 'md')}
        <div style="min-width:0;">
          <div class="card-cat">
            <span class="card-cat-dot"></span>
            <span class="card-cat-label">${escHtml(b.category)}</span>
          </div>
          <div class="card-name"><a href="business.html?id=${b.id}">${escHtml(b.name)}</a></div>
          ${b.owner_name ? `<div class="card-owner"><i class="fa-regular fa-user" style="font-size:9px;margin-right:4px;"></i>${escHtml(b.owner_name)}</div>` : ''}
        </div>
      </div>
      ${b.description ? `<p class="card-desc">${escHtml(b.description)}</p>` : ''}
      <div class="card-town">
        <i class="fa-solid fa-location-dot" style="font-size:10px;color:var(--gold);"></i>
        <a href="town.html?t=${encodeURIComponent(b.town)}" style="color:inherit;">${escHtml(normaliseTown(b.town))}</a>
      </div>
      <div class="card-links">
        ${b.whatsapp
          ? `<a href="${waLink(b.whatsapp)}" target="_blank" class="link-btn wa"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>`
          : `<span class="link-btn none" style="flex:1;text-align:center;">No WhatsApp</span>`}
        ${b.website
          ? `<a href="${escHtml(b.website)}" target="_blank" rel="noopener" class="link-btn web"><i class="fa-solid fa-arrow-up-right-from-square"></i> Website</a>`
          : `<span class="link-btn none" style="flex:1;text-align:center;">No Website</span>`}
      </div>
    </article>`).join('')}</div>`;
}

function renderTownSections(grouped, view, collapsedTowns) {
  let html = '';
  grouped.forEach((businesses, town) => {
    const collapsed = collapsedTowns && collapsedTowns.has(town);
    const bodyId    = 'town-body-' + slugify(town);
    const bodyStyle = collapsed ? 'max-height:0;' : `max-height:${businesses.length * 320 + 200}px;`;
    html += `
      <div class="town-section anim">
        <div class="town-header" onclick="toggleTown('${town.replace(/'/g, "\\'")}','${bodyId}')">
          <div style="display:flex;align-items:baseline;gap:16px;">
            <span class="town-title"><a href="town.html?t=${encodeURIComponent(town)}">${escHtml(town)}</a></span>
            <span class="town-count">${businesses.length} listed</span>
          </div>
          <span class="town-line"></span>
          <span class="town-toggle ${collapsed ? 'collapsed' : ''}" id="toggle-${bodyId}"><i class="fa-solid fa-chevron-down"></i></span>
        </div>
        <div class="town-body ${collapsed ? 'collapsed' : ''}" style="${bodyStyle}" id="${bodyId}">
          ${view === 'cards' ? renderCardsSection(businesses) : renderTableSection(businesses)}
        </div>
      </div>`;
  });

  if (!html) {
    return `<div class="state-box">
      <div class="state-icon">No gems found.</div>
      <h3>No results</h3>
      <p>Try a different search or <button onclick="openModal()" style="background:none;border:none;color:var(--gold);cursor:pointer;text-decoration:underline;">be the first to list here!</button></p>
    </div>`;
  }
  return html;
}

function toggleTown(town, bodyId) {
  const body   = document.getElementById(bodyId);
  const toggle = document.getElementById('toggle-' + bodyId);
  if (!body) return;
  if (body.classList.contains('collapsed')) {
    body.style.maxHeight = body.scrollHeight + 400 + 'px';
    body.classList.remove('collapsed');
    if (toggle) toggle.classList.remove('collapsed');
  } else {
    body.style.maxHeight = body.scrollHeight + 'px';
    requestAnimationFrame(() => {
      body.style.maxHeight = '0';
      body.classList.add('collapsed');
      if (toggle) toggle.classList.add('collapsed');
    });
  }
}


/* ================================================================
   9. SHARED NAV, FOOTER, MODAL TEMPLATES
   ================================================================ */

function renderNav(activePage) {
  return `<nav class="topnav" role="navigation" aria-label="Main navigation">
    <div class="topnav-inner">
      <a href="index.html" class="logo" aria-label="Hidden Gems SA — Local Business Directory KwaZulu-Natal">
        <img src="HG_Logo.png" alt="Hidden Gems SA" class="logo-img" />
      </a>
      <div class="nav-links">
        <a href="index.html"      class="nav-link ${activePage === 'home'  ? 'active' : ''}">Directory</a>
        <a href="towns.html"      class="nav-link ${activePage === 'towns' ? 'active' : ''}">Towns</a>
        <a href="categories.html" class="nav-link ${activePage === 'cats'  ? 'active' : ''}">Categories</a>
        <button class="nav-link nav-cta" onclick="openModal()"><i class="fa-solid fa-plus" style="font-size:11px;"></i> List My Business</button>
      </div>
    </div>
  </nav>`;
}

function renderFooter() {
  return `<footer role="contentinfo">
    <div class="footer-inner">
      <div class="footer-logo-wrap">
        <img src="HG_Logo.png" alt="Hidden Gems SA — Free Local Business Directory KwaZulu-Natal" class="footer-logo-img" />
      </div>
      <p class="footer-left">
        Discovering local businesses across KwaZulu-Natal.<br>
        Built by <strong><a href="https://olideentech.co.za" target="_blank" rel="noopener" style="color:var(--ochre);text-decoration:none;">Olideen Technologies</a></strong> &middot; Estcourt, KZN
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
  <!-- Crop overlay -->
  <div class="crop-overlay" id="cropOverlay">
    <div class="crop-modal">
      <div class="crop-modal-header">
        <div>
          <h3 class="crop-title">Crop Your Logo</h3>
          <p class="crop-sub">Drag to reposition &middot; Pinch or scroll to zoom &middot; Displayed as a circle</p>
        </div>
        <button class="modal-close" type="button" onclick="closeCropModal()" aria-label="Close crop"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="crop-canvas-wrap">
        <img id="cropImage" src="" alt="Crop preview" style="max-width:100%;display:block;" />
      </div>
      <div class="crop-modal-footer">
        <button class="btn-cancel" type="button" onclick="closeCropModal()">Cancel</button>
        <button class="btn-submit" type="button" id="cropConfirmBtn" onclick="confirmCrop()">
          <i class="fa-solid fa-check"></i>
          <span>Use This Crop</span>
        </button>
      </div>
    </div>
  </div>

  <!-- Listing modal -->
  <div class="modal-overlay" id="modalOverlay" onclick="handleOverlayClick(event)">
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
      <div class="modal-accent"></div>
      <button class="modal-close" type="button" id="modalCloseBtn" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>

      <div id="formContent">
        <div class="modal-header">
          <h2 id="modalTitle">List your business</h2>
          <p>Free &middot; under two minutes &middot; reviewed before it goes live.</p>
        </div>
        <div class="modal-body">

          <div class="form-section-label public"><span class="dot"></span> Shown on the directory</div>

          <div class="field-group">
            <label>Business Name <span class="req">*</span></label>
            <input type="text" id="bizName" placeholder="e.g. Sweet Layers Bakery" maxlength="80" />
          </div>

          <div class="field-group">
            <label>Business Logo <span style="font-size:10px;color:var(--muted2);font-weight:400;">(optional — displayed as a circle)</span></label>
            <div class="logo-upload-area" id="logoUploadArea"
                 onclick="document.getElementById('bizLogo').click()"
                 ondragover="event.preventDefault()"
                 ondrop="event.preventDefault();openCropModal(event.dataTransfer.files[0])">
              <img id="logoPreview" src="" alt="Logo preview" style="display:none;width:80px;height:80px;border-radius:50%;object-fit:cover;border:2px solid var(--gold-light);" />
              <div id="logoPlaceholder">
                <i class="fa-solid fa-camera" style="font-size:22px;color:var(--muted2);margin-bottom:8px;"></i>
                <p style="font-size:12px;color:var(--muted);margin:0;">Click or drag to upload logo</p>
                <p style="font-size:10.5px;color:var(--muted2);margin:4px 0 0;">JPG, PNG or WEBP &middot; max 10MB</p>
              </div>
            </div>
            <input type="file" id="bizLogo" accept="image/*" style="display:none;"
                   onchange="if(this.files[0]) openCropModal(this.files[0])" />
            <div id="logoRemoveWrap" style="display:none;margin-top:6px;">
              <button type="button" onclick="removeLogo()" style="font-size:11px;color:var(--danger);background:none;border:none;cursor:pointer;padding:0;">
                <i class="fa-solid fa-trash-can" style="font-size:10px;"></i> Remove logo
              </button>
            </div>
          </div>

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

          <div class="form-row">
            <div class="field-group">
              <label>Town / City <span class="req">*</span></label>
              <input type="text" id="bizTown" placeholder="e.g. Estcourt" maxlength="60"
                     list="townSuggestions" autocomplete="off" />
              <datalist id="townSuggestions">
                <option value="Bergville" /><option value="Colenso" /><option value="Dundee" />
                <option value="Durban" /><option value="Empangeni" /><option value="Estcourt" />
                <option value="Greytown" /><option value="Harrismith" /><option value="Howick" />
                <option value="Ladysmith" /><option value="Mooi River" /><option value="Newcastle" />
                <option value="Pietermaritzburg" /><option value="Pinetown" />
                <option value="Port Shepstone" /><option value="Richards Bay" />
                <option value="Scottburgh" /><option value="Umhlanga" />
                <option value="Vryheid" /><option value="Weenen" /><option value="Winterton" />
              </datalist>
              <span class="field-hint">Start typing or enter your town name</span>
            </div>
            <div class="field-group">
              <label>Province <span class="req">*</span></label>
              <select id="bizProvince">
                <option value="">Select province…</option>
                <option value="Eastern Cape">Eastern Cape</option>
                <option value="Free State">Free State</option>
                <option value="Gauteng">Gauteng</option>
                <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                <option value="Limpopo">Limpopo</option>
                <option value="Mpumalanga">Mpumalanga</option>
                <option value="North West">North West</option>
                <option value="Northern Cape">Northern Cape</option>
                <option value="Western Cape">Western Cape</option>
              </select>
            </div>
          </div>

          <div class="form-row">
            <div class="field-group">
              <label>WhatsApp Number</label>
              <input type="tel" id="bizWhatsapp" placeholder="e.g. 0831234567" maxlength="15" />
              <span class="field-hint">Enter with 0 or +27 — we'll handle the rest</span>
            </div>
            <div class="field-group">
              <label>Website / Social Link</label>
              <input type="url" id="bizWebsite" placeholder="https:// or Instagram link" />
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
          <button class="btn-cancel" type="button" onclick="closeModal()">Cancel</button>
          <button class="btn-submit" type="button" id="submitBtn" onclick="submitBusiness()">
            <span id="submitLabel">Submit for Review</span>
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>

      <div class="success-state" id="successState">
        <div class="success-icon"><i class="fa-solid fa-check"></i></div>
        <h3>Submission Received!</h3>
        <p>Your listing is <strong>under review</strong>. We will notify you via <strong>WhatsApp or email</strong> once approved — usually within 24 hours.</p>
        <button class="btn-primary" type="button" onclick="closeModal()" style="margin-top:1rem;">Done <i class="fa-solid fa-arrow-right"></i></button>
      </div>
    </div>
  </div>
  <div class="toast" id="toast" role="alert"></div>`;
}


/* ================================================================
   10. MODAL LOGIC
   ================================================================ */

function openModal() {
  document.getElementById('modalOverlay').classList.add('open');
  document.getElementById('formContent').style.display = '';
  document.getElementById('successState').classList.remove('show');
  resetForm();
  const closeBtn = document.getElementById('modalCloseBtn');
  if (closeBtn) closeBtn.onclick = closeModal;
  setTimeout(() => {
    const body = document.querySelector('.modal-body');
    if (body) body.scrollTop = 0;
    document.getElementById('bizName').focus();
  }, 260);
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}

function handleOverlayClick(e) {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
}

function resetForm() {
  ['bizName','bizCategory','bizProvince','bizTown','bizWhatsapp','bizWebsite','bizDesc','bizDetail','bizOwner','ownerContact','bizLogo']
    .forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  removeLogo();
}

function normaliseWhatsApp(raw) {
  if (!raw) return null;
  const digits = raw.replace(/\D/g, '');
  if (!digits) return null;
  if (digits.startsWith('0') && digits.length === 10) return '27' + digits.slice(1);
  if (digits.startsWith('27')) return digits;
  return digits;
}

async function submitBusiness() {
  const name     = (document.getElementById('bizName')?.value      || '').trim();
  const category = document.getElementById('bizCategory')?.value   || '';
  const town     = (document.getElementById('bizTown')?.value      || '').trim();
  const province = document.getElementById('bizProvince')?.value   || '';
  const whatsapp = normaliseWhatsApp(document.getElementById('bizWhatsapp')?.value || '');
  const website  = (document.getElementById('bizWebsite')?.value   || '').trim();
  const desc     = (document.getElementById('bizDesc')?.value      || '').trim();
  const detail   = (document.getElementById('bizDetail')?.value    || '').trim();
  const owner    = (document.getElementById('bizOwner')?.value     || '').trim();
  const contact  = (document.getElementById('ownerContact')?.value || '').trim();

  if (!name)     { showToast('Business name is required', 'error'); return; }
  if (!category) { showToast('Please select a category', 'error'); return; }
  if (!town)     { showToast('Town / city is required', 'error'); return; }
  if (!province) { showToast('Please select your province', 'error'); return; }
  if (!detail)   { showToast('Please tell us about your business', 'error'); return; }
  if (!owner)    { showToast('Your name is required', 'error'); return; }
  if (!contact)  { showToast('Your WhatsApp or email is required', 'error'); return; }

  const btn = document.getElementById('submitBtn');
  const lbl = document.getElementById('submitLabel');
  btn.disabled = true;
  lbl.textContent = 'Submitting…';

  try {
    let logo_url = null;
    if (_croppedBlob) {
      lbl.textContent = 'Uploading logo…';
      logo_url = await uploadToCloudinary(_croppedBlob);
    }

    lbl.textContent = 'Submitting…';
    const isEmail = contact.includes('@');
    await insertBusiness({
      name,
      category,
      town: normaliseTown(town),
      province: province || null,
      whatsapp: whatsapp || null,
      website: website || null,
      description: desc || null,
      business_detail: detail,
      owner_name: owner,
      owner_phone: isEmail ? null : contact,
      owner_email: isEmail ? contact : null,
      logo_url,
    });

    document.getElementById('formContent').style.display = 'none';
    document.getElementById('successState').classList.add('show');
  } catch (e) {
    console.error('Submit error:', e);
    showToast('Error: ' + (e?.message || 'Unknown error — check console'), 'error');
    btn.disabled = false;
    lbl.textContent = 'Submit for Review';
  }
}


/* ================================================================
   11. TOAST
   ================================================================ */

let _toastTimer;
function showToast(msg, type = 'info') {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.className = `toast show ${type}`;
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => t.classList.remove('show'), 3500);
}


/* ================================================================
   12. FEATURED GEM OF THE WEEK
   ================================================================ */

function nextMondayMidnight() {
  const now  = new Date();
  const day  = now.getDay();
  const diff = day === 1 ? 7 : (8 - day) % 7 || 7;
  const next = new Date(now);
  next.setDate(now.getDate() + diff);
  next.setHours(0, 0, 0, 0);
  return next.toISOString();
}

function daysUntilRotation(isoDate) {
  const diff = new Date(isoDate) - new Date();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  if (days <= 0) return 'Rotating soon';
  if (days === 1) return 'Rotates tomorrow';
  return `Rotates in ${days} days`;
}

async function fetchFeaturedGem() {
  if (!isSupabaseReady) return null;
  const { data, error } = await _sb
    .from('featured_gem')
    .select('business_id, featured_until')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) { console.error('featured_gem fetch:', error); return null; }
  return data;
}

async function pickNewFeaturedGem(allBusinesses) {
  if (!isSupabaseReady || !allBusinesses.length) return null;

  const { data: history } = await _sb
    .from('featured_gem')
    .select('business_id')
    .order('created_at', { ascending: false })
    .limit(50);

  const recentIds = new Set((history || []).map(h => h.business_id));
  let pool = allBusinesses.filter(b => !recentIds.has(b.id));
  if (!pool.length) pool = [...allBusinesses];

  /* Businesses with logos get slightly higher chance */
  const withLogo    = pool.filter(b => b.logo_url);
  const withoutLogo = pool.filter(b => !b.logo_url);
  const weighted    = [...withLogo, ...withLogo, ...withoutLogo];

  const chosen = weighted[Math.floor(Math.random() * weighted.length)];

  await _sb.from('featured_gem').insert([{
    business_id: chosen.id,
    featured_until: nextMondayMidnight(),
  }]);

  return { business_id: chosen.id, featured_until: nextMondayMidnight() };
}

async function resolveFeaturedGem(allBusinesses) {
  let gem = await fetchFeaturedGem();
  if (!gem || new Date(gem.featured_until) <= new Date()) {
    gem = await pickNewFeaturedGem(allBusinesses);
  }
  if (!gem) return null;
  return allBusinesses.find(b => b.id === gem.business_id) || null;
}

async function renderFeaturedGem(allBusinesses) {
  const wrap = document.getElementById('featuredWrap');
  if (!wrap) return;

  wrap.style.display = '';
  wrap.innerHTML = `<div class="gem-skeleton">
    <div class="gem-skel-line" style="width:60%;height:14px;"></div>
    <div class="gem-skel-line" style="width:40%;height:10px;margin-top:8px;"></div>
    <div class="gem-skel-line" style="width:100%;height:48px;margin-top:14px;"></div>
  </div>`;

  const biz = await resolveFeaturedGem(allBusinesses);
  if (!biz) { wrap.style.display = 'none'; return; }

  const gemRow = await fetchFeaturedGem();
  const until  = gemRow ? daysUntilRotation(gemRow.featured_until) : '';

  const avatarHtml = biz.logo_url
    ? `<div class="gem-week-avatar"><img src="${escHtml(biz.logo_url)}" alt="${escHtml(biz.name)} logo" /></div>`
    : `<div class="gem-week-avatar">${initial(biz.name)}</div>`;

  wrap.innerHTML = `
    <div class="gem-week-wrap">
      <div class="gem-week-badge"><i class="fa-solid fa-gem"></i> Gem of the Week</div>
      <div class="gem-week-card">
        <div class="gem-week-accent"></div>
        <div class="gem-week-body">
          <div class="gem-week-head">
            ${avatarHtml}
            <div>
              <div class="gem-week-cat"><i class="${catIcon(biz.category)}"></i>${escHtml(biz.category)}</div>
              <div class="gem-week-name">${escHtml(biz.name)}</div>
              ${biz.owner_name ? `<div class="gem-week-owner"><i class="fa-regular fa-user" style="font-size:9px;"></i>${escHtml(biz.owner_name)}</div>` : ''}
            </div>
          </div>
          ${biz.description ? `<p class="gem-week-desc">${escHtml(biz.description)}</p>` : ''}
          <div class="gem-week-footer">
            <div>
              <div class="gem-week-town">
                <i class="fa-solid fa-location-dot"></i>
                <a href="town.html?t=${encodeURIComponent(biz.town)}" style="color:inherit;">${escHtml(normaliseTown(biz.town))}</a>
              </div>
              ${until ? `<div class="gem-week-rotation"><i class="fa-regular fa-clock" style="font-size:9px;"></i> ${until}</div>` : ''}
            </div>
            <div class="gem-week-actions">
              ${biz.whatsapp
                ? `<a href="${waLink(biz.whatsapp)}" target="_blank" class="link-btn wa"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>`
                : ''}
              <a href="business.html?id=${biz.id}" class="link-btn web"><i class="fa-solid fa-arrow-up-right-from-square"></i> View listing</a>
            </div>
          </div>
        </div>
      </div>
    </div>`;
}


/* ================================================================
   13. GEM GRAPHIC GENERATOR (used by admin.html)
   ================================================================ */

async function generateGemGraphic(biz) {
  const W = 1080, H = 1080;
  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');

  /* Background */
  ctx.fillStyle = '#F5EDE6';
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = 'rgba(165,133,112,0.12)';
  for (let x = 12; x < W; x += 24) {
    for (let y = 12; y < H; y += 24) {
      ctx.beginPath(); ctx.arc(x, y, 1, 0, Math.PI * 2); ctx.fill();
    }
  }

  /* Top band */
  ctx.fillStyle = '#3D0A05';
  ctx.fillRect(0, 0, W, 220);
  const grd = ctx.createLinearGradient(0, 220, W, 220);
  grd.addColorStop(0, '#BC8514'); grd.addColorStop(0.5, '#E6D2A8'); grd.addColorStop(1, '#BC8514');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 217, W, 6);

  ctx.fillStyle = '#E6D2A8';
  ctx.font = 'bold 28px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('✦  GEM OF THE WEEK  ✦', W / 2, 100);
  ctx.fillStyle = '#FFFDFB';
  ctx.font = 'italic 600 56px "Playfair Display", serif';
  ctx.fillText('Hidden Gems SA', W / 2, 175);

  /* Avatar circle */
  const CX = W / 2, CY = 380, R = 110;
  ctx.save();
  ctx.beginPath(); ctx.arc(CX, CY, R, 0, Math.PI * 2); ctx.clip();
  if (biz.logo_url) {
    try {
      const img = await loadImage(biz.logo_url);
      ctx.drawImage(img, CX - R, CY - R, R * 2, R * 2);
    } catch {
      drawMonogram(ctx, CX, CY, R, biz.name);
    }
  } else {
    drawMonogram(ctx, CX, CY, R, biz.name);
  }
  ctx.restore();
  ctx.strokeStyle = '#BC8514';
  ctx.lineWidth = 6;
  ctx.beginPath(); ctx.arc(CX, CY, R + 6, 0, Math.PI * 2); ctx.stroke();

  /* Business name */
  ctx.fillStyle = '#3D0A05';
  ctx.font = 'bold 62px "Playfair Display", serif';
  ctx.textAlign = 'center';
  wrapText(ctx, biz.name, W / 2, 550, W - 120, 72);

  if (biz.owner_name) {
    ctx.fillStyle = '#9A8678';
    ctx.font = 'italic 32px "Playfair Display", serif';
    ctx.fillText(biz.owner_name, W / 2, 640);
  }

  /* Category and town pills */
  ctx.fillStyle = '#FAF2E0';
  roundRect(ctx, W / 2 - 260, 670, 230, 54, 27); ctx.fill();
  roundRect(ctx, W / 2 + 30,  670, 230, 54, 27); ctx.fill();
  ctx.fillStyle = '#BC8514';
  ctx.font = 'bold 24px Inter, sans-serif';
  ctx.fillText(biz.category, W / 2 - 145, 704);
  ctx.fillText('📍 ' + normaliseTown(biz.town), W / 2 + 145, 704);

  if (biz.description) {
    ctx.fillStyle = '#5C2A1E';
    ctx.font = '26px Inter, sans-serif';
    wrapText(ctx, biz.description, W / 2, 790, W - 160, 36, 3);
  }

  /* Bottom band */
  ctx.fillStyle = '#3D0A05';
  ctx.fillRect(0, H - 160, W, 160);
  ctx.fillStyle = '#E6D2A8';
  ctx.font = 'bold 26px Inter, sans-serif';
  ctx.fillText('directory.olideentech.co.za', W / 2, H - 100);
  ctx.fillStyle = 'rgba(218,193,177,0.6)';
  ctx.font = '22px Inter, sans-serif';
  ctx.fillText('Built by Olideen Technologies — olideentech.co.za', W / 2, H - 58);

  return canvas;
}

function drawMonogram(ctx, cx, cy, r, name) {
  ctx.fillStyle = '#FAF2E0';
  ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
  ctx.fillStyle = '#BC8514';
  ctx.font = `italic bold ${r}px "Playfair Display", serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(initial(name), cx, cy);
  ctx.textBaseline = 'alphabetic';
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload  = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function wrapText(ctx, text, x, y, maxW, lineH, maxLines = 99) {
  const words = text.split(' ');
  let line = '', lines = 0;
  for (const word of words) {
    const test = line ? line + ' ' + word : word;
    if (ctx.measureText(test).width > maxW && line) {
      ctx.fillText(line, x, y + lines * lineH);
      line = word; lines++;
      if (lines >= maxLines) { ctx.fillText(line + '…', x, y + lines * lineH); return; }
    } else {
      line = test;
    }
  }
  if (line) ctx.fillText(line, x, y + lines * lineH);
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

async function downloadGemGraphic(biz) {
  const btn = document.getElementById('btnDownloadGraphic');
  if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Generating…'; }
  try {
    const canvas = await generateGemGraphic(biz);
    const link   = document.createElement('a');
    link.download = `hidden-gems-${slugify(biz.name)}-gem-of-the-week.png`;
    link.href     = canvas.toDataURL('image/png');
    link.click();
  } catch (e) {
    console.error('Graphic error:', e);
    alert('Could not generate graphic: ' + e.message);
  } finally {
    if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-download"></i> Download Graphic'; }
  }
}


/* ================================================================
   14. GEM OWNER NOTIFICATION (WhatsApp message)
   ================================================================ */

function buildNotifyMessage(biz) {
  const listingUrl = `${SITE_URL}/business.html?id=${biz.id}`;
  return encodeURIComponent(
    `Hi ${biz.owner_name || 'there'}! 🎉 Big news — *${biz.name}* has just been selected as this week's featured Gem on Hidden Gems SA, our free local business directory for KwaZulu-Natal built by Olideen Technologies.\n\n` +
    `Your business is now sitting right at the top of the directory — seen by everyone who visits this week. 👀\n\n` +
    `We've put together a shareable graphic for you — post it on your Instagram, Facebook or WhatsApp status to let your customers know you've been featured! The more you share it, the more people find you. 📲\n\n` +
    `View your live listing here: ${listingUrl}\n\n` +
    `Well done and keep doing what you do — your community sees you. 💎\n\n` +
    `— Lubnah\nHidden Gems SA Team\n🌐 ${SITE_URL}\n💻 Built by Olideen Technologies — olideentech.co.za`
  );
}

function notifyGemOwner(biz) {
  if (!biz.whatsapp) { alert('This business has no WhatsApp number on record.'); return; }
  const num = biz.whatsapp.replace(/\D/g, '');
  window.open(`https://wa.me/${num}?text=${buildNotifyMessage(biz)}`, '_blank');
}


/* ================================================================
   15. KEYBOARD SHORTCUTS
   ================================================================ */

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeCropModal();
    closeModal();
  }
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    document.getElementById('searchInput')?.focus();
  }
});


/* ================================================================
   16. INDEX.HTML — main directory page
   ================================================================ */

/* Only runs when on index.html (checks for #directoryMain) */
(function indexPage() {
  let allBusinesses = [];
  let activeFilter  = 'All';
  let currentView   = 'table';
  const collapsedTowns = new Set();

  document.addEventListener('DOMContentLoaded', () => {
    if (!document.getElementById('directoryMain')) return;

    document.getElementById('nav-placeholder').innerHTML    = renderNav('home');
    document.getElementById('footer-placeholder').innerHTML = renderFooter();
    document.getElementById('modal-placeholder').innerHTML  = renderModal();
    loadDirectory();
  });

  async function loadDirectory() {
    try {
      allBusinesses = await fetchAllBusinesses();
      updateStats();
      updateSchemaListings();
      renderFeaturedGem(allBusinesses);
      renderDirectory();
    } catch (e) {
      console.error(e);
      document.getElementById('directoryMain').innerHTML = `
        <div class="directory-inner">
          <div class="state-box">
            <div class="state-icon">Could not load.</div>
            <h3>Could not load directory</h3>
            <p>Please check your Supabase configuration in js/app.js</p>
          </div>
        </div>`;
    }
  }

  function updateStats() {
    const towns = new Set(allBusinesses.map(b => normaliseTown(b.town)));
    document.getElementById('statCount').textContent = allBusinesses.length;
    document.getElementById('statTowns').textContent = towns.size;
  }

  function updateSchemaListings() {
    const schema = buildDirectorySchema(allBusinesses, 'KwaZulu-Natal Business Directory');
    document.getElementById('schema-listings').textContent = JSON.stringify(schema);
  }

  function getFiltered() {
    const q = (document.getElementById('searchInput')?.value || '').toLowerCase().trim();
    return allBusinesses.filter(b => {
      const matchCat = activeFilter === 'All' || b.category === activeFilter;
      const matchQ   = !q ||
        (b.name        || '').toLowerCase().includes(q) ||
        (b.category    || '').toLowerCase().includes(q) ||
        (b.town        || '').toLowerCase().includes(q) ||
        (b.description || '').toLowerCase().includes(q) ||
        (b.owner_name  || '').toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }

  function renderDirectory() {
    const filtered = getFiltered();
    const countEl  = document.getElementById('visibleCount');
    if (countEl) countEl.textContent = filtered.length;
    const grouped = groupByTown(filtered);
    const inner   = document.querySelector('.directory-inner') ||
      (() => { const d = document.createElement('div'); d.className = 'directory-inner'; document.getElementById('directoryMain').appendChild(d); return d; })();
    inner.innerHTML = renderTownSections(grouped, currentView, collapsedTowns);
  }

  window.handleSearch = function() { renderDirectory(); };

  window.setFilter = function(cat) {
    activeFilter = cat;
    document.querySelectorAll('.filter-tab').forEach(btn =>
      btn.classList.toggle('active', btn.dataset.cat === cat));
    renderDirectory();
  };

  window.setView = function(v) {
    currentView = v;
    document.getElementById('tableViewBtn').classList.toggle('active', v === 'table');
    document.getElementById('cardViewBtn').classList.toggle('active',  v === 'cards');
    renderDirectory();
  };

  window.onBusinessAdded = function(biz) {
    allBusinesses.unshift({ ...biz, id: Date.now() });
    updateStats();
    renderDirectory();
  };
})();


/* ================================================================
   17. BUSINESS.HTML — single business detail page
   ================================================================ */

(function businessPage() {
  let currentBiz = null;

  document.addEventListener('DOMContentLoaded', () => {
    if (!document.getElementById('detailWrap')) return;

    document.getElementById('nav-placeholder').innerHTML    = renderNav('');
    document.getElementById('footer-placeholder').innerHTML = renderFooter();
    document.getElementById('modal-placeholder').innerHTML  = renderModal();

    const params = new URLSearchParams(window.location.search);
    const id     = params.get('id');
    if (!id) { renderNotFound(); return; }
    loadBusiness(id);
  });

  async function loadBusiness(id) {
    try {
      currentBiz = await fetchById(id);
      if (!currentBiz) { renderNotFound(); return; }
      renderBusiness();
      loadRelated();
    } catch (e) {
      console.error(e);
      renderNotFound();
    }
  }

  function renderBusiness() {
    const b    = currentBiz;
    const town = normaliseTown(b.town);

    const title = `${b.name} — ${b.category} in ${town} | Hidden Gems SA`;
    const desc  = b.description
      ? `${b.description} — Find ${b.name} on Hidden Gems SA. ${b.category} business in ${town}, KwaZulu-Natal.`
      : `${b.name} is a ${b.category} business in ${town}, KwaZulu-Natal. Find contact details on Hidden Gems SA.`;

    setMeta(title, desc, `${SITE_URL}/business.html?id=${b.id}`);
    setMetaTag('property', 'og:title',       title);
    setMetaTag('property', 'og:description', desc);
    setMetaTag('property', 'og:type',        'business.business');
    injectSchema(buildLocalBusinessSchema(b));

    document.getElementById('breadcrumbNav').innerHTML = `
      <div class="breadcrumb-inner">
        <a href="index.html">Directory</a>
        <span class="sep">›</span>
        <a href="town.html?t=${encodeURIComponent(b.town)}">${escHtml(town)}</a>
        <span class="sep">›</span>
        <span class="current">${escHtml(b.name)}</span>
      </div>`;

    document.getElementById('detailWrap').innerHTML = `
      <div class="detail-card anim">
        <div class="detail-accent"></div>
        <div class="detail-body">
          <div class="detail-head">
            <div class="detail-initial">${initial(b.name)}</div>
            <div>
              <h1 class="detail-name">${escHtml(b.name)}</h1>
              <div class="detail-meta">
                <span class="cat-pill ${catClass(b.category)}">${escHtml(b.category)}</span>
                <a href="town.html?t=${encodeURIComponent(b.town)}" style="font-size:0.78rem;color:var(--muted);">
                  &#9679; ${escHtml(town)}
                </a>
              </div>
            </div>
          </div>

          ${b.description ? `<p class="detail-desc">${escHtml(b.description)}</p>` : ''}

          <div class="detail-links">
            ${b.whatsapp ? `<a href="${waLink(b.whatsapp)}" target="_blank" rel="noopener" class="link-btn wa">💬 Chat on WhatsApp</a>` : ''}
            ${b.website  ? `<a href="${escHtml(b.website)}" target="_blank" rel="noopener" class="link-btn web">↗ Visit Website</a>` : ''}
            ${!b.whatsapp && !b.website ? '<p style="color:var(--muted);font-size:0.83rem;">No contact links listed yet.</p>' : ''}
          </div>

          <div class="detail-seo-text">
            <h2>About ${escHtml(b.name)}</h2>
            <p>${escHtml(b.name)} is a local ${escHtml(b.category.toLowerCase())} business in ${escHtml(town)}, KwaZulu-Natal. Listed on Hidden Gems SA — a free local business directory connecting customers to businesses across KZN.</p>
            <p>${b.description ? escHtml(b.description) + ' ' : ''}${b.whatsapp ? `You can reach ${escHtml(b.name)} directly on WhatsApp. ` : ''}${b.website ? 'Visit their website for more information. ' : ''}</p>
            <p>Looking for more ${escHtml(b.category.toLowerCase())} businesses in ${escHtml(town)}?
              <a href="town.html?t=${encodeURIComponent(b.town)}" style="color:var(--gold);">See all businesses in ${escHtml(town)} →</a>
            </p>
          </div>
        </div>
      </div>

      <div class="related-section" id="relatedSection">
        <div style="text-align:center;padding:2rem;"><div class="spinner"></div></div>
      </div>

      <div style="margin-top:2rem;padding:2rem;background:var(--gold-pale);border:1px solid var(--gold-light);border-radius:14px;text-align:center;">
        <p style="font-family:'Playfair Display',serif;font-size:1.4rem;color:var(--ink);margin-bottom:0.5rem;">Own a business in ${escHtml(town)}?</p>
        <p style="font-size:0.85rem;color:var(--muted);margin-bottom:1rem;">Get listed on Hidden Gems SA for free. No sign-up, no cost, always live.</p>
        <button class="btn-primary" onclick="openModal()">List My Business Free →</button>
      </div>`;
  }

  async function loadRelated() {
    const b = currentBiz;
    try {
      const all   = await fetchByTown(b.town);
      const rel   = all.filter(x => x.id != b.id && x.category === b.category).slice(0, 4);
      const other = all.filter(x => x.id != b.id && x.category !== b.category).slice(0, 4);
      const show  = rel.length ? rel : other;
      const sec   = document.getElementById('relatedSection');
      if (!sec) return;
      if (!show.length) { sec.innerHTML = ''; return; }
      sec.innerHTML = `<h2>More Businesses in ${escHtml(normaliseTown(b.town))}</h2>${renderCardsSection(show)}`;
    } catch (e) { /* silent */ }
  }

  function renderNotFound() {
    document.getElementById('detailWrap').innerHTML = `
      <div class="state-box">
        <div class="state-icon">No gem found.</div>
        <h3>Business not found</h3>
        <p>This listing may have been removed. <a href="index.html" style="color:var(--gold);">Browse the full directory →</a></p>
      </div>`;
  }
})();


/* ================================================================
   18. TOWN.HTML — single town page
   ================================================================ */

(function townPage() {
  let townBusinesses = [];
  let activeFilter   = 'All';
  let currentView    = 'table';
  let currentTown    = '';

  document.addEventListener('DOMContentLoaded', () => {
    if (!document.getElementById('breadcrumbTown')) return;

    document.getElementById('nav-placeholder').innerHTML    = renderNav('towns');
    document.getElementById('footer-placeholder').innerHTML = renderFooter();
    document.getElementById('modal-placeholder').innerHTML  = renderModal();

    const params = new URLSearchParams(window.location.search);
    currentTown  = normaliseTown(params.get('t') || 'Unknown');
    loadTownPage();
  });

  async function loadTownPage() {
    const title = `${currentTown} Local Businesses — Hidden Gems SA`;
    const desc  = `Find local businesses in ${currentTown}, KwaZulu-Natal. Browse tech, food, fashion, health, education and services in ${currentTown}. List your business free.`;
    setMeta(title, desc, `${SITE_URL}/town.html?t=${encodeURIComponent(currentTown)}`);
    setMetaTag('property', 'og:title',       title);
    setMetaTag('property', 'og:description', desc);

    document.getElementById('breadcrumbTown').textContent = currentTown;
    document.getElementById('heroTownName').textContent   = currentTown;
    document.getElementById('heroKicker').textContent     = `${currentTown} · Local Business Directory`;

    try {
      townBusinesses = await fetchByTown(currentTown);
      injectSchema({ "@context": "https://schema.org", "@graph": townBusinesses.map(b => buildLocalBusinessSchema(b)) });
      updatePageStats();
      buildCategoryFilters();
      buildSeoBlock();
      renderPage();
    } catch (e) {
      console.error(e);
      document.querySelector('.directory-inner').innerHTML = `
        <div class="state-box">
          <div class="state-icon">⚠️</div>
          <h3>Could not load listings</h3>
          <p>Check your Supabase config.</p>
        </div>`;
    }
  }

  function updatePageStats() {
    const cats = new Set(townBusinesses.map(b => b.category));
    document.getElementById('statCount').textContent = townBusinesses.length;
    document.getElementById('statCats').textContent  = cats.size;
    document.getElementById('heroSub').textContent   =
      `Discover ${townBusinesses.length} local ${townBusinesses.length === 1 ? 'business' : 'businesses'} in ${currentTown}. Browse by category or search below.`;
  }

  function buildCategoryFilters() {
    const cats = [...new Set(townBusinesses.map(b => b.category))].sort();
    const tabs  = document.getElementById('filterTabs');
    cats.forEach(cat => {
      const btn = document.createElement('button');
      btn.className   = 'filter-tab';
      btn.dataset.cat = cat;
      btn.textContent = cat;
      btn.onclick     = () => window.setTownFilter(cat);
      tabs.appendChild(btn);
    });
  }

  function buildSeoBlock() {
    const cats = [...new Set(townBusinesses.map(b => b.category))].join(', ');
    document.getElementById('seoBlock').innerHTML = `
      <h2>Find Local Businesses in ${escHtml(currentTown)}</h2>
      <p>Hidden Gems SA lists local businesses in ${escHtml(currentTown)}, KwaZulu-Natal. Currently featuring ${townBusinesses.length} ${townBusinesses.length === 1 ? 'business' : 'businesses'} across categories including ${escHtml(cats || 'various industries')}.</p>
      <p>Own a business in ${escHtml(currentTown)}?
        <button onclick="openModal()" style="background:none;border:none;color:var(--gold);cursor:pointer;font-size:inherit;text-decoration:underline;">List it free →</button>
      </p>`;
  }

  function getFiltered() {
    const q = (document.getElementById('searchInput')?.value || '').toLowerCase().trim();
    return townBusinesses.filter(b => {
      const matchCat = activeFilter === 'All' || b.category === activeFilter;
      const matchQ   = !q ||
        (b.name        || '').toLowerCase().includes(q) ||
        (b.category    || '').toLowerCase().includes(q) ||
        (b.description || '').toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }

  function renderPage() {
    const filtered = getFiltered();
    document.getElementById('visibleCount').textContent = filtered.length;
    const inner = document.querySelector('.directory-inner') ||
      (() => { const d = document.createElement('div'); d.className = 'directory-inner'; document.getElementById('mainContent').appendChild(d); return d; })();

    if (!filtered.length) {
      inner.innerHTML = `<div class="state-box">
        <div class="state-icon">No gems found.</div>
        <h3>No results</h3>
        <p>Try adjusting your search or <button onclick="openModal()" style="background:none;border:none;color:var(--gold);cursor:pointer;text-decoration:underline;">be the first to list here!</button></p>
      </div>`;
      return;
    }

    inner.innerHTML = currentView === 'table'
      ? `<div class="town-section">${renderTableSection(filtered)}</div>`
      : `<div class="town-section">${renderCardsSection(filtered)}</div>`;
  }

  window.setTownFilter = function(cat) {
    activeFilter = cat;
    document.querySelectorAll('.filter-tab').forEach(btn =>
      btn.classList.toggle('active', btn.dataset.cat === cat));
    renderPage();
  };

  window.setView = window.setView || function(v) {
    currentView = v;
    document.getElementById('tableViewBtn').classList.toggle('active', v === 'table');
    document.getElementById('cardViewBtn').classList.toggle('active',  v === 'cards');
    renderPage();
  };

  window.onBusinessAdded = function(biz) {
    if (normaliseTown(biz.town) === currentTown) {
      townBusinesses.unshift({ ...biz, id: Date.now() });
      updatePageStats();
      renderPage();
    }
  };
})();


/* ================================================================
   19. TOWNS.HTML — town and category hub
   ================================================================ */

(function townsPage() {
  const CAT_ICONS = {
    'Tech':'💻','Food & Drinks':'🍽️','Fashion':'👗','Health & Beauty':'💆',
    'Education':'📚','Services':'🔧','Retail':'🛍️','Transport':'🚚',
    'Home & Garden':'🌿','Other':'📦'
  };

  document.addEventListener('DOMContentLoaded', () => {
    if (!document.getElementById('townGrid')) return;

    document.getElementById('nav-placeholder').innerHTML    = renderNav('towns');
    document.getElementById('footer-placeholder').innerHTML = renderFooter();
    document.getElementById('modal-placeholder').innerHTML  = renderModal();
    loadHubs();
  });

  async function loadHubs() {
    try {
      const all = await fetchAllBusinesses();
      renderTownHub(all);
      renderCatHub(all);
    } catch (e) {
      console.error(e);
    }
  }

  function renderTownHub(all) {
    const map = new Map();
    all.forEach(b => { const t = normaliseTown(b.town); map.set(t, (map.get(t) || 0) + 1); });
    const sorted = [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));

    document.getElementById('townIntro').textContent =
      `${sorted.length} town${sorted.length !== 1 ? 's' : ''} currently listed in the directory.`;

    const schema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "KwaZulu-Natal Towns — Hidden Gems SA",
      "itemListElement": sorted.map(([town], i) => ({
        "@type": "ListItem", "position": i + 1, "name": town,
        "url": `${SITE_URL}/town.html?t=${encodeURIComponent(town)}`
      }))
    };
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(schema);
    document.head.appendChild(s);

    document.getElementById('townGrid').innerHTML = sorted.map(([town, count]) => `
      <a href="town.html?t=${encodeURIComponent(town)}" class="hub-card anim" aria-label="${escHtml(town)} — ${count} businesses">
        <div>
          <div class="hub-card-name">${escHtml(town)}</div>
          <div class="hub-card-sub">${count} ${count === 1 ? 'business' : 'businesses'} listed</div>
        </div>
        <span class="hub-card-arrow">→</span>
      </a>`).join('');
  }

  function renderCatHub(all) {
    const map = new Map();
    all.forEach(b => map.set(b.category, (map.get(b.category) || 0) + 1));
    const sorted = [...map.entries()].sort((a, b) => b[1] - a[1]);

    document.getElementById('catGrid').innerHTML = sorted.map(([cat, count]) => `
      <a href="categories.html?cat=${encodeURIComponent(cat)}" class="cat-hub-card anim" aria-label="${escHtml(cat)} — ${count} businesses">
        <div class="cat-hub-icon ${catClass(cat)}">${CAT_ICONS[cat] || '📦'}</div>
        <div>
          <div class="cat-hub-name">${escHtml(cat)}</div>
          <div class="cat-hub-count">${count} listed</div>
        </div>
        <span class="cat-hub-arrow">→</span>
      </a>`).join('');
  }
})();


/* ================================================================
   20. CATEGORIES.HTML — category hub and single category page
   ================================================================ */

(function categoriesPage() {
  const CAT_ICONS = {
    'Tech':'💻','Food & Drinks':'🍽️','Fashion':'👗','Health & Beauty':'💆',
    'Education':'📚','Services':'🔧','Retail':'🛍️','Transport':'🚚',
    'Home & Garden':'🌿','Other':'📦'
  };
  const CAT_DESCRIPTIONS = {
    'Tech':           'Technology businesses offering IT support, repairs, software development, graphic design and digital services.',
    'Food & Drinks':  'Restaurants, caterers, fast food, bakeries, coffee shops and food delivery businesses.',
    'Fashion':        'Clothing stores, tailors, shoe shops and fashion retailers offering local and African-inspired styles.',
    'Health & Beauty':'Hair salons, spas, skincare, beauty parlours, gyms and wellness services.',
    'Education':      'Schools, tutors, training centres, coding academies and skills development programmes.',
    'Services':       'Printing, plumbing, cleaning, security, logistics, events and other professional services.',
    'Retail':         'General stores, hardware shops, supermarkets and retail outlets serving local communities.',
    'Transport':      'Transport and logistics businesses offering delivery, courier and freight services across KZN.',
    'Home & Garden':  'Home maintenance, cleaning, gardening and renovation services.',
    'Other':          'Businesses that span multiple categories or are unique to their community.',
  };

  let catBusinesses    = [];
  let activeTownFilter = 'All';
  let currentView      = 'table';
  let currentCat       = '';
  let isCategoryMode   = false;

  document.addEventListener('DOMContentLoaded', () => {
    if (!document.getElementById('bcLabel')) return;

    document.getElementById('nav-placeholder').innerHTML    = renderNav('cats');
    document.getElementById('footer-placeholder').innerHTML = renderFooter();
    document.getElementById('modal-placeholder').innerHTML  = renderModal();

    const params = new URLSearchParams(window.location.search);
    currentCat   = params.get('cat') || '';

    if (currentCat) {
      isCategoryMode = true;
      loadCategoryPage(currentCat);
    } else {
      loadCategoryHub();
    }
  });

  async function loadCategoryHub() {
    setMeta(
      'Browse by Category — Hidden Gems SA | KwaZulu-Natal',
      'Find local businesses in KZN by category: Tech, Food, Fashion, Health, Education, Services and Retail.',
      `${SITE_URL}/categories.html`
    );
    try {
      const all = await fetchAllBusinesses();
      const map = new Map();
      all.forEach(b => { if (!map.has(b.category)) map.set(b.category, []); map.get(b.category).push(b); });

      const cards = [...map.entries()].sort((a, b) => b[1].length - a[1].length).map(([cat, list]) => `
        <a href="categories.html?cat=${encodeURIComponent(cat)}" class="biz-card anim" style="text-decoration:none;" aria-label="${escHtml(cat)} — ${list.length} businesses">
          <div class="card-head">
            <div class="card-initial" style="font-size:1.5rem;">${CAT_ICONS[cat] || '📦'}</div>
            <div>
              <div class="card-name" style="font-size:1.05rem;">${escHtml(cat)}</div>
              <span class="cat-pill ${catClass(cat)}" style="margin-top:0.3rem;display:inline-block;">${list.length} businesses</span>
            </div>
          </div>
          <p class="card-desc">${CAT_DESCRIPTIONS[cat] || ''}</p>
          <div style="margin-top:auto;font-size:0.76rem;color:var(--gold);font-style:italic;">Browse ${escHtml(cat)} →</div>
        </a>`).join('');

      document.getElementById('mainContent').innerHTML = `<div class="cards-grid">${cards}</div>`;
      document.getElementById('seoBlock').innerHTML = `
        <h2>Local Business Categories — KwaZulu-Natal</h2>
        <p>Hidden Gems SA organises local businesses across KZN into clear categories so customers can find exactly what they need. From tech and education to food and fashion, every type of business has a home here — completely free to list.</p>`;
    } catch (e) { console.error(e); }
  }

  async function loadCategoryPage(cat) {
    const title = `${cat} Businesses in KwaZulu-Natal — Hidden Gems SA`;
    const desc  = `Find local ${cat.toLowerCase()} businesses across KwaZulu-Natal on Hidden Gems SA. ${CAT_DESCRIPTIONS[cat] || ''}`;
    setMeta(title, desc, `${SITE_URL}/categories.html?cat=${encodeURIComponent(cat)}`);

    const bc = document.querySelector('.breadcrumb-inner');
    if (bc) bc.innerHTML = `
      <a href="index.html">Directory</a>
      <span class="sep">›</span>
      <a href="categories.html">Categories</a>
      <span class="sep">›</span>
      <span class="current">${escHtml(cat)}</span>`;

    document.getElementById('bcLabel').textContent    = cat;
    document.getElementById('heroKicker').textContent = `${cat} · KwaZulu-Natal`;
    document.getElementById('heroTitle').innerHTML    = `${escHtml(cat)} <span class="accent">Businesses.</span>`;
    document.getElementById('heroSub').textContent    = CAT_DESCRIPTIONS[cat] || `Find local ${cat} businesses across KZN.`;
    document.getElementById('searchBarWrap').style.display = '';
    document.getElementById('filterBarWrap').style.display = '';

    try {
      catBusinesses = await fetchByCategory(cat);
      injectSchema(buildDirectorySchema(catBusinesses, `${cat} Businesses — KwaZulu-Natal`));

      const towns = new Set(catBusinesses.map(b => normaliseTown(b.town)));
      document.getElementById('statCount').textContent = catBusinesses.length;
      document.getElementById('statTowns').textContent = towns.size;

      const townFilterTabs = document.getElementById('townFilterTabs');
      [...towns].sort().forEach(t => {
        const btn = document.createElement('button');
        btn.className    = 'filter-tab';
        btn.dataset.town = t;
        btn.textContent  = t;
        btn.onclick      = () => window.setCatTownFilter(t);
        townFilterTabs.appendChild(btn);
      });

      document.getElementById('seoBlock').innerHTML = `
        <h2>${escHtml(cat)} Businesses in KwaZulu-Natal</h2>
        <p>${CAT_DESCRIPTIONS[cat] || ''} Hidden Gems SA currently lists ${catBusinesses.length} ${cat.toLowerCase()} ${catBusinesses.length === 1 ? 'business' : 'businesses'} across ${towns.size} ${towns.size === 1 ? 'town' : 'towns'} in KwaZulu-Natal.</p>
        <p>Own a ${escHtml(cat.toLowerCase())} business?
          <button onclick="openModal()" style="background:none;border:none;color:var(--gold);cursor:pointer;font-size:inherit;text-decoration:underline;">List it for free →</button>
        </p>`;

      renderCategoryPage();
    } catch (e) { console.error(e); }
  }

  function getFilteredCat() {
    const q = (document.getElementById('searchInput')?.value || '').toLowerCase().trim();
    return catBusinesses.filter(b => {
      const matchTown = activeTownFilter === 'All' || normaliseTown(b.town) === activeTownFilter;
      const matchQ    = !q ||
        (b.name        || '').toLowerCase().includes(q) ||
        (b.town        || '').toLowerCase().includes(q) ||
        (b.description || '').toLowerCase().includes(q);
      return matchTown && matchQ;
    });
  }

  function renderCategoryPage() {
    const filtered = getFilteredCat();
    document.getElementById('visibleCount').textContent = filtered.length;
    const grouped = groupByTown(filtered);
    document.getElementById('mainContent').innerHTML =
      `<div style="max-width:var(--max-w);margin:0 auto;">${renderTownSections(grouped, currentView, new Set())}</div>`;
  }

  window.setCatTownFilter = function(town) {
    activeTownFilter = town;
    document.querySelectorAll('#townFilterTabs .filter-tab').forEach(btn =>
      btn.classList.toggle('active', btn.dataset.town === town));
    renderCategoryPage();
  };

  window.setCatView = function(v) {
    currentView = v;
    document.getElementById('tableViewBtn').classList.toggle('active', v === 'table');
    document.getElementById('cardViewBtn').classList.toggle('active',  v === 'cards');
    if (isCategoryMode) renderCategoryPage();
  };
})();


/* ================================================================
   21. ADMIN.HTML — review portal
   ================================================================ */

(function adminPage() {
  if (!document.getElementById('adminWrap')) return;

  const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3eGFudmxsZ29tY3BqdG90b3dkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDA4MzQ1MywiZXhwIjoyMDk1NjU5NDUzfQ.ysXV6yCVUmx9WLNm_wEV07VURRi8i-kP0NhWmChVL3k';
  const ADMIN_PASSWORD = 'GWJSLO@786';
  const SESSION_KEY    = 'hg_admin_auth';

  let _adminSb    = null;
  let allSubs     = [];
  let allApproved = [];
  let activeTab   = 'pending';
  let currentGemBiz = null;

  /* ── Auth ── */
  window.doLogin = function() {
    const pw = document.getElementById('pwInput').value;
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1');
      document.getElementById('loginScreen').style.display = 'none';
      document.getElementById('adminWrap').classList.add('show');
      initAdmin();
    } else {
      document.getElementById('loginError').style.display = 'block';
      document.getElementById('pwInput').value = '';
      document.getElementById('pwInput').focus();
    }
  };

  window.doLogout = function() {
    sessionStorage.removeItem(SESSION_KEY);
    location.reload();
  };

  function initAdmin() {
    _adminSb = supabase.createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
    loadSubmissions();
    loadCurrentGem();
    loadApprovedForSearch();
  }

  /* ── Load submissions ── */
  async function loadSubmissions() {
    document.getElementById('submissionsList').innerHTML = '<div class="empty-state"><div class="spinner"></div></div>';
    try {
      const { data, error } = await _adminSb
        .from('businesses')
        .select('id,name,category,town,whatsapp,website,description,business_detail,owner_name,owner_phone,owner_email,logo_url,status,review_note,created_at')
        .order('created_at', { ascending: false });
      if (error) throw error;
      allSubs = data || [];
      updateStats();
      renderList();
      document.getElementById('lastRefresh').textContent = 'Updated ' + new Date().toLocaleTimeString();
    } catch (e) {
      console.error(e);
      document.getElementById('submissionsList').innerHTML =
        '<div class="empty-state"><div class="empty-icon">⚠️</div><h3>Load failed</h3><p>Check your service role key.</p></div>';
    }
  }

  window.refresh = async function() { await loadSubmissions(); };

  function updateStats() {
    const count = s => allSubs.filter(b => b.status === s).length;
    document.getElementById('sPending').textContent  = count('pending');
    document.getElementById('sApproved').textContent = count('approved');
    document.getElementById('sRejected').textContent = count('rejected');
    document.getElementById('sTotal').textContent    = allSubs.length;
  }

  /* ── Tabs ── */
  window.setTab = function(tab) {
    activeTab = tab;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
    renderList();
  };

  function getVisible() {
    return activeTab === 'all' ? allSubs : allSubs.filter(b => b.status === activeTab);
  }

  /* ── Render submission list ── */
  function renderList() {
    const list = getVisible();
    const el   = document.getElementById('submissionsList');
    if (!list.length) {
      el.innerHTML = `<div class="empty-state">
        <div class="empty-icon">${activeTab === 'pending' ? 'All clear.' : 'Nothing here.'}</div>
        <h3>${activeTab === 'pending' ? 'All clear!' : 'Nothing here'}</h3>
        <p>No ${activeTab === 'all' ? 'submissions' : activeTab + ' submissions'} yet.</p>
      </div>`;
      return;
    }
    el.innerHTML = list.map(b => renderCard(b)).join('');
  }

  function esc(s) {
    if (!s) return '';
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function renderCard(b) {
    const created = new Date(b.created_at).toLocaleDateString('en-ZA', { day:'numeric', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' });
    const waContact    = b.owner_phone ? `<a href="https://wa.me/${b.owner_phone.replace(/\D/g,'')}" target="_blank" class="inline-link wa"><i class="fa-brands fa-whatsapp"></i> ${esc(b.owner_phone)}</a>` : '';
    const emailContact = b.owner_email ? `<a href="mailto:${esc(b.owner_email)}" class="inline-link web"><i class="fa-solid fa-envelope"></i> ${esc(b.owner_email)}</a>` : '';

    const avatar = b.logo_url
      ? `<img src="${esc(b.logo_url)}" alt="${esc(b.name)} logo" style="width:44px;height:44px;border-radius:50%;object-fit:cover;border:1px solid var(--gold-light);flex-shrink:0;" />`
      : `<div class="sub-initial">${b.name ? b.name.charAt(0).toUpperCase() : '?'}</div>`;

    const logoBlock = b.logo_url
      ? `<div class="detail-block full" style="background:var(--gold-pale);border:1px solid var(--gold-light);border-radius:10px;padding:16px 18px;">
           <div class="detail-label" style="color:var(--ochre);margin-bottom:10px;"><i class="fa-solid fa-image"></i> Business Logo — review before approving</div>
           <div style="display:flex;align-items:center;gap:16px;">
             <img src="${esc(b.logo_url)}" alt="${esc(b.name)} logo" style="width:80px;height:80px;border-radius:50%;object-fit:cover;border:2px solid var(--gold-light);flex-shrink:0;" />
             <div>
               <p style="font-size:13px;color:var(--ink2);line-height:1.55;margin:0;">Check this logo is appropriate and represents the business before approving.</p>
               <a href="${esc(b.logo_url)}" target="_blank" rel="noopener" style="font-size:11.5px;color:var(--gold);margin-top:6px;display:inline-flex;align-items:center;gap:5px;"><i class="fa-solid fa-arrow-up-right-from-square"></i> View full size</a>
             </div>
           </div>
         </div>`
      : `<div class="detail-block full" style="background:var(--surface2);border:1px solid var(--border);border-radius:10px;padding:14px 18px;">
           <div class="detail-label"><i class="fa-regular fa-image"></i> Business Logo</div>
           <p style="font-size:12.5px;color:var(--muted2);margin-top:6px;">No logo uploaded — monogram will be shown.</p>
         </div>`;

    return `
    <div class="sub-card status-${b.status}" id="card-${b.id}">
      <div class="sub-card-header" onclick="toggleCard(${b.id})">
        ${avatar}
        <div style="flex:1;min-width:0;">
          <div class="sub-biz-name">${esc(b.name)}</div>
          <div class="sub-meta">
            <span><i class="fa-solid fa-location-dot" style="font-size:9px;color:var(--gold);"></i> ${esc(b.town)}</span>
            <span>&middot;</span>
            <span>${esc(b.category)}</span>
            ${b.logo_url ? '<span>&middot;</span><span style="color:var(--gold);font-size:10px;"><i class="fa-solid fa-image"></i> Has logo</span>' : ''}
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:10px;flex-shrink:0;">
          <span style="font-size:11px;color:var(--muted2);">${created}</span>
          <span class="status-badge ${b.status}">${b.status}</span>
          <span class="expand-icon"><i class="fa-solid fa-chevron-down"></i></span>
        </div>
      </div>

      <div class="sub-card-body">
        ${logoBlock}
        <div class="review-detail-box">
          <div class="detail-label"><i class="fa-solid fa-clipboard-list"></i> What they say their business does</div>
          <div class="detail-value" style="margin-top:6px;">${esc(b.business_detail) || '<em style="color:var(--muted)">Not provided</em>'}</div>
        </div>
        <div class="detail-block">
          <div class="detail-label">Public Description</div>
          <div class="detail-value">${esc(b.description) || '<em style="color:var(--muted2)">None</em>'}</div>
        </div>
        <div class="detail-block">
          <div class="detail-label">Public Links</div>
          <div class="detail-value" style="display:flex;gap:6px;flex-wrap:wrap;margin-top:4px;">
            ${b.whatsapp ? `<a href="https://wa.me/${b.whatsapp.replace(/\D/g,'')}" target="_blank" class="inline-link wa"><i class="fa-brands fa-whatsapp"></i> ${esc(b.whatsapp)}</a>` : ''}
            ${b.website  ? `<a href="${esc(b.website)}" target="_blank" class="inline-link web"><i class="fa-solid fa-arrow-up-right-from-square"></i> ${esc(b.website.replace(/^https?:\/\//,''))}</a>` : ''}
            ${!b.whatsapp && !b.website ? '<span style="color:var(--muted2);font-size:0.8rem;">No links provided</span>' : ''}
          </div>
        </div>
        <div class="detail-block">
          <div class="detail-label"><i class="fa-solid fa-lock" style="font-size:9px;"></i> Owner Name (private)</div>
          <div class="detail-value">${esc(b.owner_name) || '—'}</div>
        </div>
        <div class="detail-block">
          <div class="detail-label"><i class="fa-solid fa-lock" style="font-size:9px;"></i> Owner Contact (private)</div>
          <div class="detail-value" style="display:flex;gap:6px;flex-wrap:wrap;margin-top:4px;">
            ${waContact}${emailContact}
            ${!b.owner_phone && !b.owner_email ? '<span style="color:var(--muted2);">None provided</span>' : ''}
          </div>
        </div>
        ${b.review_note ? `<div class="detail-block full"><div class="detail-label">Previous Note</div><div class="detail-value" style="font-style:italic;color:var(--muted);">"${esc(b.review_note)}"</div></div>` : ''}
        ${b.status === 'pending' ? `
        <div class="sub-actions">
          <button class="btn-approve" onclick="approveCard(${b.id},event)"><i class="fa-solid fa-check"></i> Approve &amp; publish</button>
          <input type="text" class="note-input" id="note-${b.id}" placeholder="Optional: reason for rejection…" maxlength="200" />
          <button class="btn-reject" onclick="rejectCard(${b.id},event)"><i class="fa-solid fa-xmark"></i> Reject</button>
          <span class="note-hint">Note is shown to the owner on rejection.</span>
        </div>` : `
        <div class="sub-actions">
          <span style="font-size:12.5px;color:var(--muted);">Status: <strong>${b.status}</strong>${b.review_note ? ` — "${esc(b.review_note)}"` : ''}</span>
          ${b.status === 'rejected' ? `<button class="btn-approve" style="margin-left:auto;" onclick="approveCard(${b.id},event)"><i class="fa-solid fa-rotate-left"></i> Re-approve</button>` : ''}
          ${b.status === 'approved' ? `<button class="btn-reject"  style="margin-left:auto;" onclick="rejectCard(${b.id},event)"><i class="fa-solid fa-xmark"></i> Remove</button>` : ''}
        </div>`}
      </div>
    </div>`;
  }

  window.toggleCard = function(id) {
    document.getElementById('card-' + id).classList.toggle('expanded');
  };

  window.approveCard = async function(id, e) {
    e.stopPropagation();
    const card = document.getElementById('card-' + id);
    const btns = card.querySelectorAll('.btn-approve,.btn-reject');
    btns.forEach(b => b.disabled = true);
    try {
      const { error } = await _adminSb.from('businesses').update({ status: 'approved', review_note: null }).eq('id', id);
      if (error) throw error;
      const sub = allSubs.find(b => b.id === id);
      if (sub) sub.status = 'approved';
      updateStats(); renderList();
      adminToast('✓ Approved — listing is now live', 'ok');
    } catch (err) {
      console.error(err);
      adminToast('❌ Update failed — check Supabase connection', 'err');
      btns.forEach(b => b.disabled = false);
    }
  };

  window.rejectCard = async function(id, e) {
    e.stopPropagation();
    const card = document.getElementById('card-' + id);
    const note = document.getElementById('note-' + id)?.value.trim() || '';
    const btns = card.querySelectorAll('.btn-approve,.btn-reject');
    btns.forEach(b => b.disabled = true);
    try {
      const { error } = await _adminSb.from('businesses').update({ status: 'rejected', review_note: note || null }).eq('id', id);
      if (error) throw error;
      const sub = allSubs.find(b => b.id === id);
      if (sub) { sub.status = 'rejected'; sub.review_note = note || null; }
      updateStats(); renderList();
      adminToast('✕ Listing rejected', 'ok');
    } catch (err) {
      console.error(err);
      adminToast('❌ Update failed', 'err');
      btns.forEach(b => b.disabled = false);
    }
  };

  /* ── Featured Gem admin ── */
  async function loadApprovedForSearch() {
    const { data } = await _adminSb
      .from('businesses')
      .select('id,name,category,town,whatsapp,owner_name,logo_url')
      .eq('status', 'approved')
      .order('name', { ascending: true });
    allApproved = data || [];
  }

  async function loadCurrentGem() {
    const wrap = document.getElementById('currentGemWrap');
    try {
      const { data: gemRow } = await _adminSb
        .from('featured_gem')
        .select('business_id, featured_until, created_at')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!gemRow) {
        wrap.innerHTML = '<p style="font-size:13px;color:var(--muted);font-style:italic;">No featured gem set yet. The algorithm will pick one automatically when the directory loads, or you can manually set one below.</p>';
        return;
      }

      const { data: biz } = await _adminSb
        .from('businesses')
        .select('id,name,category,town,whatsapp,owner_name,logo_url')
        .eq('id', gemRow.business_id)
        .single();

      if (!biz) { wrap.innerHTML = '<p style="color:var(--muted);font-size:13px;">Featured business not found.</p>'; return; }

      currentGemBiz = biz;
      const until    = new Date(gemRow.featured_until);
      const untilStr = until.toLocaleDateString('en-ZA', { weekday:'long', day:'numeric', month:'long' });
      const expired  = until <= new Date();

      const avatarHtml = biz.logo_url
        ? `<img src="${esc(biz.logo_url)}" alt="${esc(biz.name)}" style="width:52px;height:52px;border-radius:50%;object-fit:cover;border:2px solid var(--gold-light);" />`
        : `<div class="current-gem-avatar">${biz.name.charAt(0).toUpperCase()}</div>`;

      wrap.innerHTML = `
        <div class="current-gem-card">
          ${avatarHtml}
          <div class="current-gem-info">
            <div class="current-gem-name">${esc(biz.name)}</div>
            <div class="current-gem-meta">${esc(biz.category)} &middot; ${esc(biz.town)}</div>
            <div class="current-gem-until"><i class="fa-regular fa-clock" style="font-size:10px;"></i>
              ${expired ? '⚠️ Expired — will rotate on next page load' : `Featured until ${untilStr}`}
            </div>
          </div>
        </div>
        <div class="gem-action-btns">
          ${biz.whatsapp
            ? `<button class="btn-notify" onclick="adminNotifyGemOwner()"><i class="fa-brands fa-whatsapp"></i> Notify Owner</button>`
            : `<span style="font-size:12px;color:var(--muted);font-style:italic;">No WhatsApp — cannot notify</span>`}
          <button class="btn-download" id="btnDownloadGraphic" onclick="adminDownloadGemGraphic()"><i class="fa-solid fa-download"></i> Download Graphic</button>
        </div>`;
    } catch (e) {
      console.error(e);
      wrap.innerHTML = '<p style="color:var(--danger);font-size:13px;">Could not load featured gem.</p>';
    }
  }

  window.searchGemOverride = function() {
    const q       = (document.getElementById('gemSearchInput').value || '').toLowerCase().trim();
    const results = document.getElementById('gemSearchResults');
    if (!q) { results.innerHTML = ''; return; }

    const matches = allApproved.filter(b =>
      b.name.toLowerCase().includes(q) ||
      (b.town || '').toLowerCase().includes(q) ||
      (b.owner_name || '').toLowerCase().includes(q)
    ).slice(0, 8);

    if (!matches.length) {
      results.innerHTML = '<p style="font-size:12px;color:var(--muted);padding:8px;">No businesses found.</p>';
      return;
    }

    results.innerHTML = matches.map(b => {
      const avatar = b.logo_url
        ? `<img src="${esc(b.logo_url)}" alt="${esc(b.name)}" style="width:36px;height:36px;border-radius:50%;object-fit:cover;border:1px solid var(--gold-light);" />`
        : `<div class="gem-result-avatar">${b.name.charAt(0).toUpperCase()}</div>`;
      return `
        <div class="gem-result-row">
          ${avatar}
          <div>
            <div class="gem-result-name">${esc(b.name)}</div>
            <div class="gem-result-meta">${esc(b.category)} &middot; ${esc(b.town)}</div>
          </div>
          <button class="btn-feature" onclick="featureThisBusiness(${b.id})"><i class="fa-solid fa-gem"></i> Feature</button>
        </div>`;
    }).join('');
  };

  window.featureThisBusiness = async function(id) {
    const biz = allApproved.find(b => b.id === id);
    if (!biz) return;
    const btn = document.querySelector(`button[onclick="featureThisBusiness(${id})"]`);
    if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>'; }
    try {
      const now  = new Date();
      const day  = now.getDay();
      const diff = day === 1 ? 7 : (8 - day) % 7 || 7;
      const next = new Date(now);
      next.setDate(now.getDate() + diff);
      next.setHours(0, 0, 0, 0);
      await _adminSb.from('featured_gem').insert([{ business_id: biz.id, featured_until: next.toISOString() }]);
      currentGemBiz = biz;
      document.getElementById('gemSearchInput').value = '';
      document.getElementById('gemSearchResults').innerHTML = '';
      await loadCurrentGem();
      adminToast(`✨ ${biz.name} is now the featured Gem!`, 'ok');
    } catch (e) {
      console.error(e);
      adminToast('❌ Could not set featured gem', 'err');
      if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-gem"></i> Feature'; }
    }
  };

  window.adminNotifyGemOwner = function() {
    if (!currentGemBiz) return;
    notifyGemOwner(currentGemBiz);
  };

  window.adminDownloadGemGraphic = async function() {
    if (!currentGemBiz) return;
    await downloadGemGraphic(currentGemBiz);
  };

  function adminToast(msg, type = 'ok') {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.className   = `toast show ${type}`;
    setTimeout(() => t.classList.remove('show'), 3500);
  }

  /* ── Boot ── */
  window.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem(SESSION_KEY) === '1') {
      document.getElementById('loginScreen').style.display = 'none';
      document.getElementById('adminWrap').classList.add('show');
      initAdmin();
    } else {
      document.getElementById('pwInput').focus();
    }
    document.getElementById('pwInput').addEventListener('keydown', e => {
      if (e.key === 'Enter') window.doLogin();
    });
  });
})();


/* ================================================================
   BOOT
   ================================================================ */
initSupabase();
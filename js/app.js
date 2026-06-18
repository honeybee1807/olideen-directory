/* ================================================================
   HIDDEN GEMS SA — Shared JS (app.js)
   Built by Olideen Technologies · Estcourt, KZN
   ================================================================ */

/* ─── CONFIG ─────────────────────────────────────────────────────── */
const SUPABASE_URL      = 'https://uwxanvllgomcpjtotowd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3eGFudmxsZ29tY3BqdG90b3dkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwODM0NTMsImV4cCI6MjA5NTY1OTQ1M30.NHKwsie6Vsza6BiHulYPLuuIPI9s4jgLRuNKejW8JKk';
const PUBLIC_COLS = 'id,name,category,town,whatsapp,website,description,owner_name,logo_url,created_at';

const CLOUDINARY_CLOUD  = 'dfxhlv8jc';
const CLOUDINARY_PRESET = 'hidden_gems_sa_logos';
const CLOUDINARY_URL    = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD}/image/upload`;

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

/* ─── CATEGORY ICONS ─────────────────────────────────────────────── */
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
function catIcon(c) { return CAT_FA[c] || 'fa-solid fa-box'; }

/* ─── LOGO / MONOGRAM HELPERS ────────────────────────────────────── */
/* Returns an <img> if logo_url exists, otherwise the lettered circle */
function renderAvatar(b, size = 'md') {
  const sizes = { sm: '36px', md: '50px', lg: '72px' };
  const px = sizes[size] || sizes.md;
  const fontSizes = { sm: '1rem', md: '23px', lg: '2.2rem' };
  const fs = fontSizes[size] || fontSizes.md;

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
  const { error } = await _sb.from('businesses').insert([{ ...payload, status: 'pending' }]);
  if (error) throw error;
  return { status: 'pending' };
}

/* ─── CLOUDINARY UPLOAD ──────────────────────────────────────────── */
async function uploadToCloudinary(blob) {
  const fd = new FormData();
  fd.append('file', blob, 'logo.jpg');
  fd.append('upload_preset', CLOUDINARY_PRESET);
  const res  = await fetch(CLOUDINARY_URL, { method: 'POST', body: fd });
  const data = await res.json();
  if (!res.ok || data.error) throw new Error(data.error?.message || 'Upload failed');
  /* Return a Cloudinary URL that forces circle crop + 400px */
  return data.secure_url.replace('/upload/', '/upload/w_400,h_400,c_fill,g_face,r_max,q_auto,f_auto/');
}

/* ─── CROPPER STATE ──────────────────────────────────────────────── */
let _cropper      = null;
let _croppedBlob  = null;
let _cropObjectURL = null;

function openCropModal(file) {
  /* Validate */
  if (!file || !file.type.startsWith('image/')) { showToast('Please select an image file','error'); return; }
  if (file.size > 10 * 1024 * 1024) { showToast('Image must be under 10MB','error'); return; }

  const overlay = document.getElementById('cropOverlay');
  const img     = document.getElementById('cropImage');
  if (!overlay || !img) { showToast('Crop tool not ready — please try again','error'); return; }

  /* Destroy any existing cropper first */
  if (_cropper) { _cropper.destroy(); _cropper = null; }

  /* Revoke previous object URL */
  if (_cropObjectURL) { URL.revokeObjectURL(_cropObjectURL); _cropObjectURL = null; }

  overlay.classList.add('open');

  /* Reset the img element completely */
  img.src = '';

  function initCropper() {
    if (_cropper) { _cropper.destroy(); _cropper = null; }
    _cropper = new Cropper(img, {
      aspectRatio: 1,
      viewMode: 1,
      dragMode: 'move',
      autoCropArea: 0.85,
      movable: true,
      zoomable: true,
      scalable: false,
      cropBoxMovable: true,
      cropBoxResizable: true,
      toggleDragModeOnDblclick: false,
      ready() {
        const viewBox = document.querySelector('#cropOverlay .cropper-view-box');
        const face    = document.querySelector('#cropOverlay .cropper-face');
        if (viewBox) viewBox.style.borderRadius = '50%';
        if (face)    face.style.borderRadius    = '50%';
      }
    });
  }

  /* Use FileReader so we control exactly when the src is set */
  const reader = new FileReader();
  reader.onload = (e) => {
    img.onload  = initCropper;
    img.onerror = () => showToast('Could not load image','error');
    img.src     = e.target.result;
    /* If browser already has it cached, onload may not fire — call directly */
    if (img.complete && img.naturalWidth) initCropper();
  };
  reader.readAsDataURL(file);
}

function closeCropModal() {
  document.getElementById('cropOverlay').classList.remove('open');
  if (_cropper) { _cropper.destroy(); _cropper = null; }
}

async function confirmCrop() {
  if (!_cropper) {
    showToast('Crop not ready — please select image again','error');
    return;
  }

  const btn = document.getElementById('cropConfirmBtn');
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing…';

  try {
    const canvas = _cropper.getCroppedCanvas({ width: 400, height: 400, imageSmoothingQuality: 'high' });
    if (!canvas) throw new Error('Could not generate crop canvas');

    await new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) { reject(new Error('Could not create image blob')); return; }
        _croppedBlob = blob;
        resolve();
      }, 'image/jpeg', 0.88);
    });

    /* Show preview in the form */
    const previewURL  = canvas.toDataURL('image/jpeg', 0.88);
    const preview     = document.getElementById('logoPreview');
    const placeholder = document.getElementById('logoPlaceholder');
    if (preview)     { preview.src = previewURL; preview.style.display = 'block'; }
    if (placeholder) { placeholder.style.display = 'none'; }
    const area = document.getElementById('logoUploadArea');
    if (area) area.classList.add('has-image');

    closeCropModal();
    showToast('Logo ready — submit your listing to save it','success');
  } catch(e) {
    console.error('Crop error:', e);
    showToast('Crop failed: ' + (e.message || 'unknown error'), 'error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-check"></i> <span>Use This Crop</span>';
  }
}

function removeLogo() {
  _croppedBlob  = null;
  _croppedBlob  = null;
  const preview = document.getElementById('logoPreview');
  const placeholder = document.getElementById('logoPlaceholder');
  preview.src   = '';
  preview.style.display     = 'none';
  placeholder.style.display = '';
  document.getElementById('logoUploadArea').classList.remove('has-image');
  document.getElementById('bizLogo').value = '';
}

/* ─── HELPERS ────────────────────────────────────────────────────── */
function normaliseTown(t) { return (t||'Other').trim().replace(/\b\w/g, c => c.toUpperCase()); }
function slugify(str)     { return (str||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,''); }
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
  list.forEach(b => { const t = normaliseTown(b.town); if (!map.has(t)) map.set(t,[]); map.get(t).push(b); });
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
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr,name); document.head.appendChild(el); }
  el.setAttribute('content', content);
}
function injectSchema(json) {
  let el = document.getElementById('schema-ld');
  if (!el) { el = document.createElement('script'); el.id='schema-ld'; el.type='application/ld+json'; document.head.appendChild(el); }
  el.textContent = JSON.stringify(json);
}
function buildLocalBusinessSchema(biz) {
  const s = {
    "@context":"https://schema.org","@type":"LocalBusiness",
    "name": biz.name,
    "description": biz.description || `${biz.name} is a ${biz.category} business in ${biz.town}, KwaZulu-Natal.`,
    "address": { "@type":"PostalAddress","addressLocality":biz.town,"addressRegion":"KwaZulu-Natal","addressCountry":"ZA" },
    "areaServed": biz.town, "category": biz.category,
    "geo": { "@type":"GeoCoordinates","addressCountry":"ZA" },
    "openingHoursSpecification": { "@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday"] },
  };
  if (biz.website)    s.url      = biz.website;
  if (biz.whatsapp)   s.telephone = '+' + biz.whatsapp.replace(/\D/g,'');
  if (biz.owner_name) s.employee  = { "@type":"Person","name":biz.owner_name };
  if (biz.logo_url)   s.logo      = biz.logo_url;
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
        "address":{"@type":"PostalAddress","addressLocality":b.town,"addressRegion":"KwaZulu-Natal","addressCountry":"ZA"} }
    }))
  };
}

/* ─── RENDERERS ──────────────────────────────────────────────────── */
function renderTableSection(list) {
  if (!list.length) return '';
  const rows = list.map((b,i) => `
    <tr style="animation-delay:${i*0.03}s">
      <td><div class="biz-name-cell">
        ${renderAvatar(b,'sm')}
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
    <tbody>${rows}</tbody></table></div>`;
}

function renderCardsSection(list) {
  if (!list.length) return '';
  return `<div class="cards-grid">${list.map((b,i) => `
    <article class="biz-card anim" style="animation-delay:${i*0.04}s">
      <div class="card-head">
        ${renderAvatar(b,'md')}
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
    const bodyStyle = collapsed ? 'max-height:0;' : `max-height:${businesses.length*320+200}px;`;
    html += `
      <div class="town-section anim">
        <div class="town-header" onclick="toggleTown('${town.replace(/'/g,"\\'")}','${bodyId}')">
          <div style="display:flex;align-items:baseline;gap:16px;">
            <span class="town-title"><a href="town.html?t=${encodeURIComponent(town)}">${escHtml(town)}</a></span>
            <span class="town-count">${businesses.length} listed</span>
          </div>
          <span class="town-line"></span>
          <span class="town-toggle ${collapsed?'collapsed':''}" id="toggle-${bodyId}"><i class="fa-solid fa-chevron-down"></i></span>
        </div>
        <div class="town-body ${collapsed?'collapsed':''}" style="${bodyStyle}" id="${bodyId}">
          ${view==='cards' ? renderCardsSection(businesses) : renderTableSection(businesses)}
        </div>
      </div>`;
  });
  return html || `<div class="state-box">
    <div class="state-icon">No gems found.</div>
    <h3>No results</h3>
    <p>Try a different search or <button onclick="openModal()" style="background:none;border:none;color:var(--gold);cursor:pointer;font-size:0.85rem;text-decoration:underline;">be the first to list here!</button></p>
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
  /* Attach close button — injected into DOM by renderModal so must be wired here */
  const closeBtn = document.getElementById('modalCloseBtn');
  if (closeBtn) closeBtn.onclick = closeModal;
  /* Always scroll to top of modal body */
  setTimeout(() => {
    const body = document.querySelector('.modal-body');
    if (body) body.scrollTop = 0;
    document.getElementById('bizName').focus();
  }, 260);
}
function closeModal() { document.getElementById('modalOverlay').classList.remove('open'); }
function handleOverlayClick(e) { if (e.target === document.getElementById('modalOverlay')) closeModal(); }
function resetForm() {
  ['bizName','bizCategory','bizProvince','bizTown','bizWhatsapp','bizWebsite','bizDesc','bizDetail','bizOwner','ownerContact','bizLogo']
    .forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  removeLogo();
}

/* ─── WHATSAPP NORMALISER ────────────────────────────────────────── */
function normaliseWhatsApp(raw) {
  if (!raw) return null;
  const digits = raw.replace(/\D/g, '');
  if (!digits) return null;
  /* 0831234567 → 27831234567 */
  if (digits.startsWith('0') && digits.length === 10) return '27' + digits.slice(1);
  /* 27831234567 — already correct */
  if (digits.startsWith('27') && digits.length === 11) return digits;
  /* +27... stripped to 27... */
  if (digits.startsWith('27')) return digits;
  /* Fallback — return as-is */
  return digits;
}

/* ─── SUBMIT ─────────────────────────────────────────────────────── */
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

  if (!name)     { showToast('Business name is required','error'); return; }
  if (!category) { showToast('Please select a category','error'); return; }
  if (!town)     { showToast('Town / city is required','error'); return; }
  if (!province) { showToast('Please select your province','error'); return; }
  if (!detail)   { showToast('Please tell us about your business','error'); return; }
  if (!owner)    { showToast('Your name is required','error'); return; }
  if (!contact)  { showToast('Your WhatsApp or email is required','error'); return; }

  const btn = document.getElementById('submitBtn');
  const lbl = document.getElementById('submitLabel');
  btn.disabled = true;
  lbl.textContent = _croppedBlob ? 'Uploading logo…' : 'Submitting…';

  try {
    let logo_url = null;
    if (_croppedBlob) {
      lbl.textContent = 'Uploading logo…';
      logo_url = await uploadToCloudinary(_croppedBlob);
    }

    lbl.textContent = 'Submitting…';
    const isEmail = contact.includes('@');
    const payload = {
      name, category,
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
    };

    await insertBusiness(payload);
    document.getElementById('formContent').style.display = 'none';
    document.getElementById('successState').classList.add('show');
  } catch(e) {
    console.error('SUBMIT ERROR:', e);
    console.error('Message:', e?.message);
    console.error('Details:', JSON.stringify(e, null, 2));
    showToast(`Error: ${e?.message || 'Unknown error — check console'}`, 'error');
    btn.disabled = false;
    lbl.textContent = 'Submit for Review';
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
      <a href="index.html" class="logo" aria-label="Hidden Gems SA — Local Business Directory KwaZulu-Natal">
        <img src="Hidden_Gems_SA_Logo.png" alt="Hidden Gems SA" class="logo-img" />
      </a>
      <div class="nav-links">
        <a href="index.html"      class="nav-link ${activePage==='home'?'active':''}">Directory</a>
        <a href="towns.html"      class="nav-link ${activePage==='towns'?'active':''}">Towns</a>
        <a href="categories.html" class="nav-link ${activePage==='cats'?'active':''}">Categories</a>
        <button class="nav-link nav-cta" onclick="openModal()"><i class="fa-solid fa-plus" style="font-size:11px;"></i> List My Business</button>
      </div>
    </div>
  </nav>`;
}

function renderFooter() {
  return `<footer role="contentinfo">
    <div class="footer-inner">
      <div class="footer-logo-wrap">
        <img src="Hidden_Gems_SA_Logo.png" alt="Hidden Gems SA — Free Local Business Directory KwaZulu-Natal" class="footer-logo-img" />
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
  <!-- ══ CROP OVERLAY ════════════════════════════════════════════ -->
  <div class="crop-overlay" id="cropOverlay">
    <div class="crop-modal">
      <div class="crop-modal-header">
        <div>
          <h3 class="crop-title">Crop Your Logo</h3>
          <p class="crop-sub">Drag to reposition &middot; Pinch or scroll to zoom &middot; Will be displayed as a circle</p>
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

  <!-- ══ LISTING MODAL ═══════════════════════════════════════════ -->
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

          <!-- Public fields -->
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
                <option value="Bergville" />
                <option value="Bhisho" />
                <option value="Bloemfontein" />
                <option value="Cape Town" />
                <option value="Colenso" />
                <option value="Dundee" />
                <option value="Durban" />
                <option value="East London" />
                <option value="Empangeni" />
                <option value="Escourt" />
                <option value="Estcourt" />
                <option value="George" />
                <option value="Greytown" />
                <option value="Harrismith" />
                <option value="Howick" />
                <option value="Johannesburg" />
                <option value="Kimberley" />
                <option value="Klerksdorp" />
                <option value="Ladysmith" />
                <option value="Mahikeng" />
                <option value="Middelburg" />
                <option value="Mooi River" />
                <option value="Mpumalanga" />
                <option value="Nelspruit" />
                <option value="Newcastle" />
                <option value="Paarl" />
                <option value="Pietermaritzburg" />
                <option value="Pinetown" />
                <option value="Polokwane" />
                <option value="Port Elizabeth" />
                <option value="Port Shepstone" />
                <option value="Potchefstroom" />
                <option value="Pretoria" />
                <option value="Richards Bay" />
                <option value="Rustenburg" />
                <option value="Scottburgh" />
                <option value="Stanger" />
                <option value="Stellenbosch" />
                <option value="Ulundi" />
                <option value="Umhlanga" />
                <option value="Upington" />
                <option value="Vryheid" />
                <option value="Weenen" />
                <option value="Winterton" />
              </datalist>
              <span class="field-hint">Start typing or select — or enter your own town name</span>
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

/* ─── LOGO UPLOAD AREA — show remove button when image set ──────── */
const _logoObserver = new MutationObserver(() => {
  const area = document.getElementById('logoUploadArea');
  const removeWrap = document.getElementById('logoRemoveWrap');
  if (!area || !removeWrap) return;
  removeWrap.style.display = area.classList.contains('has-image') ? '' : 'none';
});
document.addEventListener('DOMContentLoaded', () => {
  const area = document.getElementById('logoUploadArea');
  if (area) _logoObserver.observe(area, { attributes: true, attributeFilter: ['class'] });
});

/* ─── KEYBOARD ───────────────────────────────────────────────────── */
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

/* ─── BOOT ───────────────────────────────────────────────────────── */
initSupabase();

/* ================================================================
   FEATURED GEM OF THE WEEK
   ================================================================ */

const SITE_URL = 'https://directory.olideentech.co.za';

/* ── Get next Monday midnight ─────────────────────────────────── */
function nextMondayMidnight() {
  const now  = new Date();
  const day  = now.getDay(); // 0=Sun,1=Mon...
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

/* ── Fetch current featured gem from Supabase ──────────────────── */
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

/* ── Pick a new featured gem algorithmically ───────────────────── */
async function pickNewFeaturedGem(allBusinesses) {
  if (!isSupabaseReady || !allBusinesses.length) return null;

  /* Get history of who has been featured */
  const { data: history } = await _sb
    .from('featured_gem')
    .select('business_id')
    .order('created_at', { ascending: false })
    .limit(50);

  const recentIds = new Set((history || []).map(h => h.business_id));

  /* Priority: never featured > has logo > any */
  let pool = allBusinesses.filter(b => !recentIds.has(b.id));
  if (!pool.length) pool = [...allBusinesses]; // everyone's had a turn — reset

  /* Boost businesses with logos */
  const withLogo    = pool.filter(b => b.logo_url);
  const withoutLogo = pool.filter(b => !b.logo_url);
  const weighted    = [...withLogo, ...withLogo, ...withoutLogo]; // logo businesses appear 2x

  const chosen = weighted[Math.floor(Math.random() * weighted.length)];

  /* Write to Supabase */
  const featured_until = nextMondayMidnight();
  await _sb.from('featured_gem').insert([{
    business_id: chosen.id,
    featured_until,
  }]);

  return { business_id: chosen.id, featured_until };
}

/* ── Main: resolve who is featured right now ───────────────────── */
async function resolveFeaturedGem(allBusinesses) {
  let gem = await fetchFeaturedGem();

  /* If expired or missing — pick a new one */
  if (!gem || new Date(gem.featured_until) <= new Date()) {
    gem = await pickNewFeaturedGem(allBusinesses);
  }
  if (!gem) return null;

  return allBusinesses.find(b => b.id === gem.business_id) || null;
}

/* ── Render featured gem card on index.html ────────────────────── */
async function renderFeaturedGem(allBusinesses) {
  const wrap = document.getElementById('featuredWrap');
  if (!wrap) return;

  /* Show skeleton while loading */
  wrap.style.display = '';
  wrap.innerHTML = `
    <div class="gem-skeleton">
      <div class="gem-skel-line" style="width:60%;height:14px;"></div>
      <div class="gem-skel-line" style="width:40%;height:10px;margin-top:8px;"></div>
      <div class="gem-skel-line" style="width:100%;height:48px;margin-top:14px;"></div>
    </div>`;

  const biz = await resolveFeaturedGem(allBusinesses);
  if (!biz) { wrap.style.display = 'none'; return; }

  /* Resolve featured_until for display */
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

/* ── Generate shareable branded canvas image ───────────────────── */
async function generateGemGraphic(biz) {
  const W = 1080, H = 1080;
  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');

  /* Background */
  ctx.fillStyle = '#F5EDE6';
  ctx.fillRect(0, 0, W, H);

  /* Dot pattern */
  ctx.fillStyle = 'rgba(165,133,112,0.12)';
  for (let x = 12; x < W; x += 24)
    for (let y = 12; y < H; y += 24)
      { ctx.beginPath(); ctx.arc(x, y, 1, 0, Math.PI*2); ctx.fill(); }

  /* Top maroon band */
  ctx.fillStyle = '#3D0A05';
  ctx.fillRect(0, 0, W, 220);

  /* Gold accent line */
  const grd = ctx.createLinearGradient(0, 220, W, 220);
  grd.addColorStop(0, '#BC8514');
  grd.addColorStop(0.5, '#E6D2A8');
  grd.addColorStop(1, '#BC8514');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 217, W, 6);

  /* "Gem of the Week" label */
  ctx.fillStyle = '#E6D2A8';
  ctx.font = 'bold 28px Inter, sans-serif';
  ctx.letterSpacing = '4px';
  ctx.textAlign = 'center';
  ctx.fillText('✦  GEM OF THE WEEK  ✦', W/2, 100);

  /* Hidden Gems SA title */
  ctx.fillStyle = '#FFFDFB';
  ctx.font = 'italic 600 56px "Playfair Display", serif';
  ctx.fillText('Hidden Gems SA', W/2, 175);

  /* Business logo or monogram circle */
  const CX = W/2, CY = 380, R = 110;
  ctx.save();
  ctx.beginPath(); ctx.arc(CX, CY, R, 0, Math.PI*2); ctx.clip();

  if (biz.logo_url) {
    try {
      const img = await loadImage(biz.logo_url);
      ctx.drawImage(img, CX-R, CY-R, R*2, R*2);
    } catch {
      drawMonogram(ctx, CX, CY, R, biz.name);
    }
  } else {
    drawMonogram(ctx, CX, CY, R, biz.name);
  }
  ctx.restore();

  /* Gold ring around avatar */
  ctx.strokeStyle = '#BC8514';
  ctx.lineWidth = 6;
  ctx.beginPath(); ctx.arc(CX, CY, R+6, 0, Math.PI*2); ctx.stroke();

  /* Business name */
  ctx.fillStyle = '#3D0A05';
  ctx.font = 'bold 62px "Playfair Display", serif';
  ctx.textAlign = 'center';
  wrapText(ctx, biz.name, W/2, 550, W-120, 72);

  /* Owner name */
  if (biz.owner_name) {
    ctx.fillStyle = '#9A8678';
    ctx.font = 'italic 32px "Playfair Display", serif';
    ctx.fillText(biz.owner_name, W/2, 640);
  }

  /* Category + Town pills */
  ctx.fillStyle = '#FAF2E0';
  roundRect(ctx, W/2 - 260, 670, 230, 54, 27); ctx.fill();
  roundRect(ctx, W/2 + 30,  670, 230, 54, 27); ctx.fill();

  ctx.fillStyle = '#BC8514';
  ctx.font = 'bold 24px Inter, sans-serif';
  ctx.fillText(biz.category, W/2 - 145, 704);
  ctx.fillText('📍 ' + normaliseTown(biz.town), W/2 + 145, 704);

  /* Description */
  if (biz.description) {
    ctx.fillStyle = '#5C2A1E';
    ctx.font = '26px Inter, sans-serif';
    wrapText(ctx, biz.description, W/2, 790, W-160, 36, 3);
  }

  /* Bottom band */
  ctx.fillStyle = '#3D0A05';
  ctx.fillRect(0, H-160, W, 160);

  ctx.fillStyle = '#E6D2A8';
  ctx.font = 'bold 26px Inter, sans-serif';
  ctx.fillText('directory.olideentech.co.za', W/2, H-100);

  ctx.fillStyle = 'rgba(218,193,177,0.6)';
  ctx.font = '22px Inter, sans-serif';
  ctx.fillText('Built by Olideen Technologies — olideentech.co.za', W/2, H-58);

  return canvas;
}

function drawMonogram(ctx, cx, cy, r, name) {
  ctx.fillStyle = '#FAF2E0';
  ctx.fillRect(cx-r, cy-r, r*2, r*2);
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
    } else { line = test; }
  }
  if (line) ctx.fillText(line, x, y + lines * lineH);
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x+r, y);
  ctx.lineTo(x+w-r, y); ctx.quadraticCurveTo(x+w, y, x+w, y+r);
  ctx.lineTo(x+w, y+h-r); ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
  ctx.lineTo(x+r, y+h); ctx.quadraticCurveTo(x, y+h, x, y+h-r);
  ctx.lineTo(x, y+r); ctx.quadraticCurveTo(x, y, x+r, y);
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
  } catch(e) {
    console.error('Graphic error:', e);
    alert('Could not generate graphic: ' + e.message);
  } finally {
    if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-download"></i> Download Graphic'; }
  }
}

/* ── Build WhatsApp notify message ─────────────────────────────── */
function buildNotifyMessage(biz) {
  const listingUrl = `${SITE_URL}/business.html?id=${biz.id}`;
  const msg =
`Hi ${biz.owner_name || 'there'}! 🎉 Big news — *${biz.name}* has just been selected as this week's featured Gem on Hidden Gems SA, our free local business directory for KwaZulu-Natal built by Olideen Technologies.

Your business is now sitting right at the top of the directory — seen by everyone who visits this week. 👀

We've put together a shareable graphic for you — post it on your Instagram, Facebook or WhatsApp status to let your customers know you've been featured! The more you share it, the more people find you. 📲

View your live listing here: ${listingUrl}

Well done and keep doing what you do — your community sees you. 💎

— Lubnah
Hidden Gems SA Team
🌐 ${SITE_URL}
💻 Built by Olideen Technologies — olideentech.co.za`;

  return encodeURIComponent(msg);
}

function notifyGemOwner(biz) {
  if (!biz.whatsapp) { alert('This business has no WhatsApp number on record.'); return; }
  const num = biz.whatsapp.replace(/\D/g,'');
  const url = `https://wa.me/${num}?text=${buildNotifyMessage(biz)}`;
  window.open(url, '_blank');
}
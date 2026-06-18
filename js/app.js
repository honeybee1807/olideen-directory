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
  setTimeout(() => document.getElementById('bizName').focus(), 260);
}
function closeModal() { document.getElementById('modalOverlay').classList.remove('open'); }
function handleOverlayClick(e) { if (e.target === document.getElementById('modalOverlay')) closeModal(); }
function resetForm() {
  ['bizName','bizCategory','bizTown','bizWhatsapp','bizWebsite','bizDesc','bizDetail','bizOwner','ownerContact','bizLogo']
    .forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  removeLogo();
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

  if (!name)     { showToast('Business name is required','error'); return; }
  if (!category) { showToast('Please select a category','error'); return; }
  if (!town)     { showToast('Town / area is required','error'); return; }
  if (!detail)   { showToast('Please tell us about your business','error'); return; }
  if (!owner)    { showToast('Your name is required','error'); return; }
  if (!contact)  { showToast('Your WhatsApp or email is required','error'); return; }

  const btn = document.getElementById('submitBtn');
  const lbl = document.getElementById('submitLabel');
  btn.disabled = true;
  lbl.textContent = _croppedBlob ? 'Uploading logo…' : 'Submitting…';

  try {
    /* Upload logo first if one was cropped */
    let logo_url = null;
    if (_croppedBlob) {
      lbl.textContent = 'Uploading logo…';
      logo_url = await uploadToCloudinary(_croppedBlob);
    }

    lbl.textContent = 'Submitting…';
    const isEmail = contact.includes('@');
    const payload = {
      name, category, town: normaliseTown(town),
      whatsapp: whatsapp || null, website: website || null,
      description: desc || null, business_detail: detail,
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
        <button class="modal-close" onclick="closeCropModal()" aria-label="Close crop"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="crop-canvas-wrap">
        <img id="cropImage" src="" alt="Crop preview" style="max-width:100%;display:block;" />
      </div>
      <div class="crop-modal-footer">
        <button class="btn-cancel" onclick="closeCropModal()">Cancel</button>
        <button class="btn-submit" id="cropConfirmBtn" onclick="confirmCrop()">
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
      <button class="modal-close" onclick="closeModal()" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>

      <div id="formContent">
        <div class="modal-header">
          <h2 id="modalTitle">List your business</h2>
          <p>Free &middot; under two minutes &middot; reviewed before it goes live.</p>
        </div>
        <div class="modal-body">

          <!-- Logo upload -->
          <div class="form-section-label public"><span class="dot"></span> Shown on the directory</div>

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
            <span id="submitLabel">Submit for Review</span>
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>

      <div class="success-state" id="successState">
        <div class="success-icon"><i class="fa-solid fa-check"></i></div>
        <h3>Submission Received!</h3>
        <p>Your listing is <strong>under review</strong>. We will notify you via <strong>WhatsApp or email</strong> once approved — usually within 24 hours.</p>
        <button class="btn-primary" onclick="closeModal()" style="margin-top:1rem;">Done <i class="fa-solid fa-arrow-right"></i></button>
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
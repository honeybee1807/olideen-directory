/* ================================================================
   OLIDEEN DIRECTORY — Shared JS (app.js)
   ================================================================ */

/* ─── CONFIGURATION ──────────────────────────────────────────────
   ADD these new columns to your existing "businesses" Supabase table:
     status          text    NOT NULL  default 'pending'
                             values: 'pending' | 'approved' | 'rejected'
     business_detail text    nullable  (review field, private)
     review_note     text    nullable  (your rejection note, private)

   RLS Policy changes:
     SELECT (anon)  → add filter: status = 'approved'
     INSERT (anon)  → allow (submissions always land as 'pending')
     UPDATE (anon)  → DENY — only the service_role key in admin.html can update
   ──────────────────────────────────────────────────────────────── */
const SUPABASE_URL      = 'https://uwxanvllgomcpjtotowd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3eGFudmxsZ29tY3BqdG90b3dkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwODM0NTMsImV4cCI6MjA5NTY1OTQ1M30.NHKwsie6Vsza6BiHulYPLuuIPI9s4jgLRuNKejW8JKk';

const PUBLIC_COLS = 'id,name,category,town,whatsapp,website,description,created_at';

let _sb = null;
let isSupabaseReady = false;

function initSupabase() {
  try {
    _sb = supabase.createClient('https://uwxanvllgomcpjtotowd.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3eGFudmxsZ29tY3BqdG90b3dkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwODM0NTMsImV4cCI6MjA5NTY1OTQ1M30.NHKwsie6Vsza6BiHulYPLuuIPI9s4jgLRuNKejW8JKk');
    isSupabaseReady = true;
    return true;
  } catch(e) { console.error('Supabase init:', e); return false; }
}

/* ─── DEMO DATA ──────────────────────────────────────────────────── */
const DEMO_DATA = [
  { id:1,  name:"Kuda's Tech Hub",       category:"Tech",            town:"Estcourt",         whatsapp:"27831111111", website:"https://kudatech.co.za",            description:"Laptop repairs, software setup & IT support.", status:"approved" },
  { id:2,  name:"Gogo's Kitchen",         category:"Food & Drinks",   town:"Estcourt",         whatsapp:"27832222222", website:"",                                  description:"Home-cooked traditional meals delivered daily.", status:"approved" },
  { id:3,  name:"Urban Threads",          category:"Fashion",         town:"Estcourt",         whatsapp:"27833333333", website:"https://instagram.com/urbanthreads", description:"Contemporary African fashion & streetwear.", status:"approved" },
  { id:4,  name:"Study Smart Tutoring",   category:"Education",       town:"Estcourt",         whatsapp:"27834444444", website:"",                                  description:"Computer science tutoring for Grade 10–12.", status:"approved" },
  { id:5,  name:"Clarity Beauty Studio",  category:"Health & Beauty", town:"Ladysmith",        whatsapp:"27835555555", website:"",                                  description:"Skincare consultations & premium beauty treatments.", status:"approved" },
  { id:6,  name:"SwiftPrint KZN",         category:"Services",        town:"Ladysmith",        whatsapp:"27836666666", website:"https://swiftprint.co.za",          description:"Same-day printing, branding and signage.", status:"approved" },
  { id:7,  name:"Corner Store Ladysmith", category:"Retail",          town:"Ladysmith",        whatsapp:"27837777777", website:"",                                  description:"Groceries, airtime, essentials and more.", status:"approved" },
  { id:8,  name:"Neon Visuals",           category:"Tech",            town:"Ladysmith",        whatsapp:"27838888888", website:"https://neonvisuals.co.za",         description:"Graphic design, video editing & social content.", status:"approved" },
  { id:9,  name:"Mama Zulu Catering",     category:"Food & Drinks",   town:"Pietermaritzburg", whatsapp:"27839999999", website:"",                                  description:"Traditional Zulu catering for all events.", status:"approved" },
  { id:10, name:"PMB Coding Academy",     category:"Education",       town:"Pietermaritzburg", whatsapp:"27830000000", website:"https://pmbcodes.co.za",            description:"Coding bootcamps for all skill levels.", status:"approved" },
  { id:11, name:"The Hair Lounge PMB",    category:"Health & Beauty", town:"Pietermaritzburg", whatsapp:"27831234000", website:"https://instagram.com/hairlounge",  description:"Natural hair care and protective styles.", status:"approved" },
  { id:12, name:"BuildRight Hardware",    category:"Retail",          town:"Pietermaritzburg", whatsapp:"27835678000", website:"",                                  description:"Hardware, tools and building materials.", status:"approved" },
];

/* ─── PUBLIC DATA (approved only) ───────────────────────────────── */
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
  if (!isSupabaseReady) { await sleep(300); return DEMO_DATA.filter(b=>normaliseTown(b.town)===normaliseTown(town)); }
  const { data, error } = await _sb
    .from('businesses').select(PUBLIC_COLS)
    .eq('status','approved').ilike('town',town)
    .order('created_at',{ascending:false});
  if (error) throw error;
  return data || [];
}

async function fetchByCategory(cat) {
  if (!isSupabaseReady) { await sleep(300); return DEMO_DATA.filter(b=>b.category===cat); }
  const { data, error } = await _sb
    .from('businesses').select(PUBLIC_COLS)
    .eq('status','approved').eq('category',cat)
    .order('town',{ascending:true}).order('created_at',{ascending:false});
  if (error) throw error;
  return data || [];
}

async function fetchById(id) {
  if (!isSupabaseReady) { await sleep(200); return DEMO_DATA.find(b=>b.id==id)||null; }
  const { data, error } = await _sb
    .from('businesses').select(PUBLIC_COLS)
    .eq('status','approved').eq('id',id).single();
  if (error) throw error;
  return data;
}

async function insertBusiness(payload) {
  if (!isSupabaseReady) { await sleep(700); return {...payload,id:Date.now(),status:'pending'}; }
  const { data, error } = await _sb
    .from('businesses')
    .insert([{...payload, status:'pending'}])
    .select('id,name,status').single();
  if (error) throw error;
  return data;
}

/* ─── HELPERS ────────────────────────────────────────────────────── */
const sleep = ms => new Promise(r=>setTimeout(r,ms));

function normaliseTown(t) {
  return (t||'Other').trim().replace(/\b\w/g,c=>c.toUpperCase());
}
function slugify(str) {
  return (str||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
}
function escHtml(s) {
  if(!s)return'';
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function waLink(num) { return num?'https://wa.me/'+num.replace(/\D/g,''):''; }
function initial(n) { return n?n.charAt(0).toUpperCase():'?'; }

const CAT_CLASS = {
  'Tech':'cat-tech','Food & Drinks':'cat-food','Fashion':'cat-fashion',
  'Health & Beauty':'cat-health','Education':'cat-education',
  'Services':'cat-services','Retail':'cat-retail','Other':'cat-other',
};
function catClass(c) { return CAT_CLASS[c]||'cat-other'; }

function groupByTown(list) {
  const map = new Map();
  list.forEach(b=>{const t=normaliseTown(b.town);if(!map.has(t))map.set(t,[]);map.get(t).push(b);});
  return new Map([...map.entries()].sort((a,b)=>a[0].localeCompare(b[0])));
}

/* ─── SEO ────────────────────────────────────────────────────────── */
function setMeta(title,description,canonical) {
  document.title=title;
  setMetaTag('name','description',description);
  setMetaTag('property','og:title',title);
  setMetaTag('property','og:description',description);
  if(canonical){
    let l=document.querySelector('link[rel="canonical"]');
    if(!l){l=document.createElement('link');l.rel='canonical';document.head.appendChild(l);}
    l.href=canonical;
  }
}
function setMetaTag(attr,name,content) {
  let el=document.querySelector(`meta[${attr}="${name}"]`);
  if(!el){el=document.createElement('meta');el.setAttribute(attr,name);document.head.appendChild(el);}
  el.setAttribute('content',content);
}
function injectSchema(json) {
  let el=document.getElementById('schema-ld');
  if(!el){el=document.createElement('script');el.id='schema-ld';el.type='application/ld+json';document.head.appendChild(el);}
  el.textContent=JSON.stringify(json);
}
function buildLocalBusinessSchema(biz) {
  const s={"@context":"https://schema.org","@type":"LocalBusiness","name":biz.name,
    "description":biz.description||`${biz.name} is a ${biz.category} business in ${biz.town}.`,
    "address":{"@type":"PostalAddress","addressLocality":biz.town,"addressCountry":"ZA"},
    "areaServed":biz.town,"category":biz.category};
  if(biz.website)s.url=biz.website;
  if(biz.whatsapp)s.telephone='+'+biz.whatsapp.replace(/\D/g,'');
  return s;
}
function buildDirectorySchema(businesses,pageName) {
  return {"@context":"https://schema.org","@type":"ItemList","name":`${pageName} — Olideen Directory`,
    "numberOfItems":businesses.length,
    "itemListElement":businesses.map((b,i)=>({"@type":"ListItem","position":i+1,
      "item":{"@type":"LocalBusiness","name":b.name,
        "address":{"@type":"PostalAddress","addressLocality":b.town,"addressCountry":"ZA"}}}))};
}

/* ─── RENDERERS ──────────────────────────────────────────────────── */
function renderTableSection(list) {
  if(!list.length)return'';
  const rows=list.map((b,i)=>`
    <tr style="animation-delay:${i*0.03}s">
      <td><div class="biz-name-cell">
        <div class="biz-initial">${initial(b.name)}</div>
        <div><a href="business.html?id=${b.id}" class="biz-name-link">${escHtml(b.name)}</a>
          ${b.description?`<div class="biz-desc-small">${escHtml(b.description)}</div>`:''}</div>
      </div></td>
      <td><span class="cat-pill ${catClass(b.category)}">${escHtml(b.category)}</span></td>
      <td><a href="town.html?t=${encodeURIComponent(b.town)}" style="color:var(--muted);font-size:0.82rem;">${escHtml(normaliseTown(b.town))}</a></td>
      <td>${b.whatsapp?`<a href="${waLink(b.whatsapp)}" target="_blank" class="link-btn wa">💬 WhatsApp</a>`:`<span class="link-btn none">—</span>`}</td>
      <td>${b.website?`<a href="${escHtml(b.website)}" target="_blank" rel="noopener" class="link-btn web">↗ Website</a>`:`<span class="link-btn none">—</span>`}</td>
    </tr>`).join('');
  return `<div class="table-wrap"><table>
    <thead><tr><th>Business</th><th>Category</th><th>Town</th><th>WhatsApp</th><th>Website</th></tr></thead>
    <tbody>${rows}</tbody></table></div>`;
}

function renderCardsSection(list) {
  if(!list.length)return'';
  return`<div class="cards-grid">${list.map((b,i)=>`
    <div class="biz-card" style="animation-delay:${i*0.04}s">
      <div class="card-head">
        <div class="card-initial">${initial(b.name)}</div>
        <div><div class="card-name"><a href="business.html?id=${b.id}">${escHtml(b.name)}</a></div>
          <span class="cat-pill ${catClass(b.category)}" style="margin-top:0.3rem;display:inline-block;">${escHtml(b.category)}</span></div>
      </div>
      ${b.description?`<p style="font-size:0.78rem;color:var(--muted);line-height:1.6;">${escHtml(b.description)}</p>`:''}
      <div style="font-size:0.72rem;font-family:var(--font-mono);">
        <a href="town.html?t=${encodeURIComponent(b.town)}" style="color:var(--muted);">📍 ${escHtml(normaliseTown(b.town))}</a></div>
      <div class="card-links">
        ${b.whatsapp?`<a href="${waLink(b.whatsapp)}" target="_blank" class="link-btn wa">💬 WhatsApp</a>`:`<span class="link-btn none" style="flex:1;text-align:center;">No WhatsApp</span>`}
        ${b.website?`<a href="${escHtml(b.website)}" target="_blank" rel="noopener" class="link-btn web">↗ Website</a>`:`<span class="link-btn none" style="flex:1;text-align:center;">No Website</span>`}
      </div>
    </div>`).join('')}</div>`;
}

function renderTownSections(grouped,view,collapsedTowns) {
  let html='';
  grouped.forEach((businesses,town)=>{
    const collapsed=collapsedTowns&&collapsedTowns.has(town);
    const bodyId='town-body-'+slugify(town);
    const bodyStyle=collapsed?'max-height:0;':`max-height:${businesses.length*200+200}px;`;
    html+=`
      <div class="town-section anim">
        <div class="town-header" onclick="toggleTown('${town.replace(/'/g,"\\'")}','${bodyId}')">
          <div class="town-title-wrap">
            <span class="town-title"><a href="town.html?t=${encodeURIComponent(town)}">${escHtml(town)}</a></span>
            <span class="town-count">${businesses.length} listed</span>
          </div>
          <span class="town-line"></span>
          <span class="town-toggle ${collapsed?'collapsed':''}" id="toggle-${bodyId}">▾</span>
        </div>
        <div class="town-body ${collapsed?'collapsed':''}" style="${bodyStyle}" id="${bodyId}">
          ${view==='cards'?renderCardsSection(businesses):renderTableSection(businesses)}
        </div>
      </div>`;
  });
  return html||`<div class="state-box"><div class="state-icon">⊘</div><h3>No results found</h3>
    <p>Try a different filter or <button onclick="openModal()" style="background:none;border:none;color:var(--gold);cursor:pointer;font-size:0.85rem;text-decoration:underline">add yours first!</button></p></div>`;
}

function toggleTown(town,bodyId) {
  const body=document.getElementById(bodyId);
  const toggle=document.getElementById('toggle-'+bodyId);
  if(!body)return;
  if(body.classList.contains('collapsed')){
    body.style.maxHeight=body.scrollHeight+400+'px';
    body.classList.remove('collapsed');
    toggle&&toggle.classList.remove('collapsed');
  } else {
    body.style.maxHeight=body.scrollHeight+'px';
    requestAnimationFrame(()=>{body.style.maxHeight='0';body.classList.add('collapsed');toggle&&toggle.classList.add('collapsed');});
  }
}

/* ─── MODAL ──────────────────────────────────────────────────────── */
function openModal() {
  document.getElementById('modalOverlay').classList.add('open');
  document.getElementById('formContent').style.display='';
  document.getElementById('successState').classList.remove('show');
  resetForm();
  setTimeout(()=>document.getElementById('bizName').focus(),260);
}
function closeModal() { document.getElementById('modalOverlay').classList.remove('open'); }
function handleOverlayClick(e) { if(e.target===document.getElementById('modalOverlay'))closeModal(); }
function resetForm() {
  ['bizName','bizCategory','bizTown','bizWhatsapp','bizWebsite','bizDesc','bizDetail','bizOwner','ownerContact']
    .forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
}

/* ─── SUBMIT ─────────────────────────────────────────────────────── */
async function submitBusiness() {
  const name    = (document.getElementById('bizName')?.value     ||'').trim();
  const category= document.getElementById('bizCategory')?.value  ||'';
  const town    = (document.getElementById('bizTown')?.value     ||'').trim();
  const whatsapp= (document.getElementById('bizWhatsapp')?.value ||'').trim();
  const website = (document.getElementById('bizWebsite')?.value  ||'').trim();
  const desc    = (document.getElementById('bizDesc')?.value     ||'').trim();
  const detail  = (document.getElementById('bizDetail')?.value   ||'').trim();
  const owner   = (document.getElementById('bizOwner')?.value    ||'').trim();
  const contact = (document.getElementById('ownerContact')?.value||'').trim();

  if(!name)    {showToast('⚠️ Business name is required','error');return;}
  if(!category){showToast('⚠️ Please select a category','error');return;}
  if(!town)    {showToast('⚠️ Town / area is required','error');return;}
  if(!detail)  {showToast('⚠️ Please tell us about your business','error');return;}
  if(!owner)   {showToast('⚠️ Your name is required','error');return;}
  if(!contact) {showToast('⚠️ Your WhatsApp or email is required','error');return;}

  const btn=document.getElementById('submitBtn');
  const lbl=document.getElementById('submitLabel');
  btn.disabled=true; lbl.textContent='Submitting…';

  const isEmail=contact.includes('@');
  const payload={
    name, category, town:normaliseTown(town),
    whatsapp:whatsapp||null, website:website||null,
    description:desc||null, business_detail:detail,
    owner_name:owner,
    owner_phone:isEmail?null:contact,
    owner_email:isEmail?contact:null,
  };

  try {
    await insertBusiness(payload);
    document.getElementById('formContent').style.display='none';
    document.getElementById('successState').classList.add('show');
  } catch(e) {
    console.error(e);
    showToast('❌ Submission failed. Please try again.','error');
    btn.disabled=false; lbl.textContent='Submit for Review →';
  }
}

/* ─── TOAST ──────────────────────────────────────────────────────── */
let _toastTimer;
function showToast(msg,type='info') {
  const t=document.getElementById('toast');
  if(!t)return;
  t.textContent=msg; t.className=`toast show ${type}`;
  clearTimeout(_toastTimer);
  _toastTimer=setTimeout(()=>t.classList.remove('show'),3500);
}

/* ─── SHARED NAV / FOOTER / MODAL ───────────────────────────────── */
function renderNav(activePage) {
  return`<nav class="topnav" role="navigation" aria-label="Main navigation">
    <div class="topnav-inner">
      <a href="index.html" class="logo" aria-label="Olideen Directory Home">
        <div class="logo-mark"><span>OT</span></div>
        <span class="logo-text">Olideen <em>Directory</em></span>
      </a>
      <div class="nav-links">
        <a href="index.html"      class="nav-link ${activePage==='home'?'active':''}">Directory</a>
        <a href="towns.html"      class="nav-link ${activePage==='towns'?'active':''}">Towns</a>
        <a href="categories.html" class="nav-link ${activePage==='cats'?'active':''}">Categories</a>
        <button class="nav-link nav-cta" onclick="openModal()">+ List Free</button>
      </div>
    </div>
  </nav>`;
}

function renderFooter() {
  return`<footer role="contentinfo"><div class="footer-inner">
    <p class="footer-left">An <strong>Olideen Technologies</strong> initiative — helping local businesses grow since May 2025.</p>
    <div class="footer-links">
      <a href="index.html">Directory</a><a href="towns.html">Towns</a>
      <a href="categories.html">Categories</a><a href="sitemap.xml">Sitemap</a>
    </div>
  </div></footer>`;
}

function renderModal() {
  return`
  <div class="modal-overlay" id="modalOverlay" onclick="handleOverlayClick(event)">
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
      <div class="modal-accent"></div>
      <button class="modal-close" onclick="closeModal()" aria-label="Close">✕</button>

      <div id="formContent">
        <div class="modal-header">
          <h2 id="modalTitle">List Your Business</h2>
          <p>Free · Under 2 minutes · Reviewed by Olideen before going live</p>
        </div>
        <div class="modal-body">

          <div class="form-section-label public"><span>🌐</span> Shown on the directory</div>

          <div class="field-group">
            <label>Business Name <span class="req">*</span></label>
            <input type="text" id="bizName" placeholder="e.g. Mama's Kitchen" maxlength="80" />
          </div>
          <div class="form-row">
            <div class="field-group">
              <label>Category <span class="req">*</span></label>
              <select id="bizCategory">
                <option value="">Select…</option>
                <option>Tech</option><option>Food & Drinks</option><option>Fashion</option>
                <option>Health & Beauty</option><option>Education</option>
                <option>Services</option><option>Retail</option><option>Other</option>
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

          <div class="form-section-label private" style="margin-top:0.4rem;">
            <span>📋</span> For review — not shown publicly
          </div>
          <p class="form-section-note">We review every listing before it goes live. A few sentences helps us approve faster.</p>

          <div class="field-group">
            <label>What does your business sell or do? <span class="req">*</span></label>
            <textarea id="bizDetail"
              placeholder="e.g. We sell handmade jewellery at the Estcourt market every Saturday. All items are locally sourced and handmade."
              maxlength="300" style="min-height:80px;"></textarea>
            <span class="field-hint">2–3 sentences is plenty.</span>
          </div>
          <div class="field-group">
            <label>Your Name <span class="req">*</span> <span class="tag prv">private</span></label>
            <input type="text" id="bizOwner" placeholder="Your real name" maxlength="60" />
          </div>
          <div class="field-group">
            <label>Your WhatsApp or Email <span class="req">*</span> <span class="tag prv">private</span></label>
            <input type="text" id="ownerContact" placeholder="Number or email — so we can notify you" maxlength="100" />
            <span class="field-hint">We'll notify you when approved, or reach out if we need more info.</span>
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
        <div class="success-icon" style="font-size:2rem;border:none;background:none;">⏳</div>
        <h3>Submission Received!</h3>
        <p>Your listing is <strong>under review</strong>. Olideen will notify you via <strong>WhatsApp or email</strong> once approved — usually within 24 hours.</p>
        <p style="font-size:0.75rem;color:var(--muted2);margin-top:0.5rem;">If we need more info, we'll reach out on the contact you provided.</p>
        <button class="btn-primary" onclick="closeModal()" style="margin-top:1rem;">Got it →</button>
      </div>
    </div>
  </div>
  <div class="toast" id="toast" role="alert"></div>`;
}

/* ─── KEYBOARD ───────────────────────────────────────────────────── */
document.addEventListener('keydown',e=>{
  if(e.key==='Escape')closeModal();
  if((e.metaKey||e.ctrlKey)&&e.key==='k'){e.preventDefault();document.getElementById('searchInput')?.focus();}
});

/* ─── BOOT ───────────────────────────────────────────────────────── */
initSupabase();

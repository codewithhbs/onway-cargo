/* Onwayy Cargo Admin Panel — vanilla JS SPA */
const API = location.origin + '/api';
const TOKEN_KEY = 'onwayy_admin_token';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

let TOKEN = localStorage.getItem(TOKEN_KEY) || '';
let modal;

/* ---------------- API helper ---------------- */
async function api(path, { method = 'GET', body, isForm = false } = {}) {
  const headers = {};
  if (TOKEN) headers.Authorization = 'Bearer ' + TOKEN;
  if (!isForm && body) headers['Content-Type'] = 'application/json';
  const res = await fetch(API + path, {
    method,
    headers,
    body: isForm ? body : body ? JSON.stringify(body) : undefined,
  });
  if (res.status === 401) { logout(); throw new Error('Session expired'); }
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.success === false) throw new Error(data.message || 'Request failed');
  return data;
}

function toast(msg, isErr = false) {
  const t = $('#toast');
  t.textContent = msg;
  t.className = 'app-toast show' + (isErr ? ' err' : '');
  setTimeout(() => (t.className = 'app-toast'), 2600);
}

/* ---------------- Auth ---------------- */
async function login() {
  const username = $('#username').value.trim();
  const password = $('#password').value;
  const err = $('#loginError');
  err.classList.add('d-none');
  try {
    const data = await api('/auth/login', { method: 'POST', body: { username, password } });
    TOKEN = data.token;
    localStorage.setItem(TOKEN_KEY, TOKEN);
    $('#whoami').textContent = data.user.username;
    showApp();
  } catch (e) {
    err.textContent = e.message;
    err.classList.remove('d-none');
  }
}
function logout() {
  TOKEN = '';
  localStorage.removeItem(TOKEN_KEY);
  $('#appShell').classList.add('d-none');
  $('#loginScreen').style.display = 'flex';
}
function showApp() {
  $('#loginScreen').style.display = 'none';
  $('#appShell').classList.remove('d-none');
  route();
  refreshBadges();
}

/* ---------------- Router ---------------- */
const VIEWS = {};
function route() {
  const view = (location.hash.replace('#', '') || 'dashboard');
  $$('.sidebar-nav a').forEach((a) => a.classList.toggle('active', a.dataset.view === view));
  $('#viewTitle').textContent = ({ dashboard: 'Dashboard', gallery: 'Gallery', team: 'Team', blogs: 'Blogs', contacts: 'Contact Leads', quotes: 'Quote Requests' }[view] || 'Dashboard');
  $('.sidebar')?.classList.remove('open');
  (VIEWS[view] || VIEWS.dashboard)();
}

async function refreshBadges() {
  try {
    const { data } = await api('/stats');
    const bc = $('#badgeContacts'), bq = $('#badgeQuotes');
    bc.textContent = data.contacts_unread; bc.classList.toggle('d-none', !data.contacts_unread);
    bq.textContent = data.quotes_unread; bq.classList.toggle('d-none', !data.quotes_unread);
  } catch {}
}

/* ---------------- Dashboard ---------------- */
VIEWS.dashboard = async function () {
  const root = $('#viewRoot');
  root.innerHTML = '<div class="text-muted">Loading…</div>';
  try {
    const { data } = await api('/stats');
    const cards = [
      ['Gallery Items', data.gallery, 'bi-images'],
      ['Team Members', data.team, 'bi-people'],
      ['Blog Posts', data.blogs, 'bi-journal-text'],
      ['Contact Leads', data.contacts, 'bi-envelope'],
      ['Quote Requests', data.quotes, 'bi-calculator'],
      ['Unread Leads', data.contacts_unread + data.quotes_unread, 'bi-bell'],
    ];
    root.innerHTML = `<div class="stat-grid">${cards.map((c) => `
      <div class="stat-card"><div class="stat-ic"><i class="bi ${c[2]}"></i></div>
      <div><h3>${c[1]}</h3><span>${c[0]}</span></div></div>`).join('')}</div>
      <div class="mt-4 text-muted small">Manage your website content from the menu on the left. Gallery, Team and Blog entries appear live on the website. Contact &amp; Quote form submissions land here automatically.</div>`;
  } catch (e) { root.innerHTML = `<div class="empty">${esc(e.message)}</div>`; }
};

/* ---------------- Generic table renderer ---------------- */
function tableShell(title, addLabel, columns) {
  return `<div class="panel">
    <div class="panel-head"><h5>${title}</h5>
      ${addLabel ? `<button class="btn btn-danger btn-sm ms-auto" id="addBtn"><i class="bi bi-plus-lg"></i> ${addLabel}</button>` : ''}
    </div>
    <div class="table-responsive"><table class="table mb-0 align-middle">
      <thead><tr>${columns.map((c) => `<th>${c}</th>`).join('')}</tr></thead>
      <tbody id="tbody"></tbody>
    </table></div></div>`;
}

function openForm(title, fields, current, onSave) {
  $('#modalTitle').textContent = title;
  $('#modalBody').innerHTML = fields.map((f) => {
    const val = current?.[f.name] ?? f.default ?? '';
    if (f.type === 'textarea')
      return `<div class="mb-3"><label class="form-label">${f.label}</label><textarea class="form-control" name="${f.name}" rows="${f.rows || 4}">${esc(val)}</textarea></div>`;
    if (f.type === 'select')
      return `<div class="mb-3"><label class="form-label">${f.label}</label><select class="form-select" name="${f.name}">${f.options.map((o) => `<option value="${o}" ${o === val ? 'selected' : ''}>${o}</option>`).join('')}</select></div>`;
    if (f.type === 'file')
      return `<div class="mb-3"><label class="form-label">${f.label}</label><input type="file" accept="image/*" class="form-control" name="${f.name}" />
        ${current?.image ? `<div class="form-text">Current: <a href="${esc(current.image)}" target="_blank">${esc(current.image)}</a></div>` : ''}
        <input class="form-control mt-2" name="image_url" placeholder="…or paste an image URL/path" value="${esc(f.name === 'image' ? (current?.image || '') : '')}" /></div>`;
    return `<div class="mb-3"><label class="form-label">${f.label}</label><input class="form-control" name="${f.name}" value="${esc(val)}" placeholder="${f.placeholder || ''}" /></div>`;
  }).join('');
  $('#modalSave').onclick = async () => {
    const form = new FormData();
    let hasFile = false;
    fields.forEach((f) => {
      const el = $(`[name="${f.name}"]`, $('#modalBody'));
      if (f.type === 'file') {
        if (el.files && el.files[0]) { form.append('image', el.files[0]); hasFile = true; }
        const urlEl = $('[name="image_url"]', $('#modalBody'));
        if (urlEl && urlEl.value.trim()) form.append('image', urlEl.value.trim());
      } else {
        form.append(f.name, el.value);
      }
    });
    try {
      await onSave(form);
      modal.hide();
      toast('Saved successfully');
      route();
      refreshBadges();
    } catch (e) { toast(e.message, true); }
  };
  modal.show();
}

/* ---------------- Gallery ---------------- */
VIEWS.gallery = async function () {
  const root = $('#viewRoot');
  root.innerHTML = tableShell('Gallery', 'Add Image', ['#', 'Image', 'Title', 'Category', 'Order', 'Actions']);
  const fields = [
    { name: 'title', label: 'Title' },
    { name: 'category', label: 'Category', default: 'General' },
    { name: 'sort_order', label: 'Sort Order', default: 0 },
    { name: 'image', label: 'Image', type: 'file' },
  ];
  const load = async () => {
    const { data } = await api('/gallery');
    $('#tbody').innerHTML = data.length ? data.map((g) => `<tr>
      <td>${g.id}</td><td><img class="thumb" src="${esc(g.image)}" onerror="this.style.opacity=.3"></td>
      <td>${esc(g.title)}</td><td>${esc(g.category)}</td><td>${g.sort_order}</td>
      <td><button class="btn btn-sm btn-outline-secondary" data-edit="${g.id}"><i class="bi bi-pencil"></i></button>
      <button class="btn btn-sm btn-outline-danger" data-del="${g.id}"><i class="bi bi-trash"></i></button></td></tr>`).join('')
      : `<tr><td colspan="6" class="empty">No gallery items yet.</td></tr>`;
    $$('[data-edit]').forEach((b) => b.onclick = () => {
      const item = data.find((x) => x.id == b.dataset.edit);
      openForm('Edit Gallery Item', fields, item, (fd) => api(`/gallery/${item.id}`, { method: 'PUT', body: fd, isForm: true }));
    });
    $$('[data-del]').forEach((b) => b.onclick = async () => { if (confirm('Delete this item?')) { await api(`/gallery/${b.dataset.del}`, { method: 'DELETE' }); toast('Deleted'); load(); } });
  };
  $('#addBtn').onclick = () => openForm('Add Gallery Item', fields, null, (fd) => api('/gallery', { method: 'POST', body: fd, isForm: true }));
  load();
};

/* ---------------- Team ---------------- */
VIEWS.team = async function () {
  const root = $('#viewRoot');
  root.innerHTML = tableShell('Team Members', 'Add Member', ['#', 'Photo', 'Name', 'Role', 'Order', 'Actions']);
  const fields = [
    { name: 'name', label: 'Name' },
    { name: 'role', label: 'Role / Designation' },
    { name: 'facebook', label: 'Facebook URL' },
    { name: 'linkedin', label: 'LinkedIn URL' },
    { name: 'twitter', label: 'Twitter / X URL' },
    { name: 'instagram', label: 'Instagram URL' },
    { name: 'sort_order', label: 'Sort Order', default: 0 },
    { name: 'image', label: 'Photo', type: 'file' },
  ];
  const load = async () => {
    const { data } = await api('/team');
    $('#tbody').innerHTML = data.length ? data.map((m) => `<tr>
      <td>${m.id}</td><td><img class="thumb" src="${esc(m.image)}" onerror="this.style.opacity=.3"></td>
      <td>${esc(m.name)}</td><td>${esc(m.role)}</td><td>${m.sort_order}</td>
      <td><button class="btn btn-sm btn-outline-secondary" data-edit="${m.id}"><i class="bi bi-pencil"></i></button>
      <button class="btn btn-sm btn-outline-danger" data-del="${m.id}"><i class="bi bi-trash"></i></button></td></tr>`).join('')
      : `<tr><td colspan="6" class="empty">No team members yet.</td></tr>`;
    $$('[data-edit]').forEach((b) => b.onclick = () => {
      const item = data.find((x) => x.id == b.dataset.edit);
      openForm('Edit Team Member', fields, item, (fd) => api(`/team/${item.id}`, { method: 'PUT', body: fd, isForm: true }));
    });
    $$('[data-del]').forEach((b) => b.onclick = async () => { if (confirm('Delete this member?')) { await api(`/team/${b.dataset.del}`, { method: 'DELETE' }); toast('Deleted'); load(); } });
  };
  $('#addBtn').onclick = () => openForm('Add Team Member', fields, null, (fd) => api('/team', { method: 'POST', body: fd, isForm: true }));
  load();
};

/* ---------------- Blogs ---------------- */
VIEWS.blogs = async function () {
  const root = $('#viewRoot');
  root.innerHTML = tableShell('Blog Posts', 'Add Post', ['#', 'Image', 'Title', 'Category', 'Status', 'Actions']);
  const fields = [
    { name: 'title', label: 'Title' },
    { name: 'slug', label: 'Slug (optional — auto from title)' },
    { name: 'category', label: 'Category', default: 'Logistics' },
    { name: 'author', label: 'Author', default: 'Onwayy Cargo' },
    { name: 'status', label: 'Status', type: 'select', options: ['published', 'draft'] },
    { name: 'excerpt', label: 'Excerpt', type: 'textarea', rows: 2 },
    { name: 'content', label: 'Content (HTML allowed)', type: 'textarea', rows: 8 },
    { name: 'image', label: 'Cover Image', type: 'file' },
  ];
  const load = async () => {
    const { data } = await api('/blogs');
    $('#tbody').innerHTML = data.length ? data.map((p) => `<tr>
      <td>${p.id}</td><td><img class="thumb" src="${esc(p.image)}" onerror="this.style.opacity=.3"></td>
      <td>${esc(p.title)}<div class="text-muted small">/${esc(p.slug)}</div></td><td>${esc(p.category)}</td>
      <td><span class="badge ${p.status === 'published' ? 'bg-success' : 'bg-secondary'}">${esc(p.status)}</span></td>
      <td><button class="btn btn-sm btn-outline-secondary" data-edit="${p.id}"><i class="bi bi-pencil"></i></button>
      <button class="btn btn-sm btn-outline-danger" data-del="${p.id}"><i class="bi bi-trash"></i></button></td></tr>`).join('')
      : `<tr><td colspan="6" class="empty">No blog posts yet.</td></tr>`;
    $$('[data-edit]').forEach((b) => b.onclick = async () => {
      const { data: item } = await api(`/blogs/${b.dataset.edit}`);
      openForm('Edit Blog Post', fields, item, (fd) => api(`/blogs/${item.id}`, { method: 'PUT', body: fd, isForm: true }));
    });
    $$('[data-del]').forEach((b) => b.onclick = async () => { if (confirm('Delete this post?')) { await api(`/blogs/${b.dataset.del}`, { method: 'DELETE' }); toast('Deleted'); load(); } });
  };
  $('#addBtn').onclick = () => openForm('Add Blog Post', fields, null, (fd) => api('/blogs', { method: 'POST', body: fd, isForm: true }));
  load();
};

/* ---------------- Contacts ---------------- */
VIEWS.contacts = async function () {
  const root = $('#viewRoot');
  root.innerHTML = tableShell('Contact Form Leads', null, ['#', 'Name', 'Email', 'Subject', 'Message', 'Date', '']);
  const { data } = await api('/contact');
  $('#tbody').innerHTML = data.length ? data.map((c) => `<tr class="${c.is_read ? '' : 'row-unread'}">
    <td>${c.id}</td><td>${esc(c.name)}${c.is_read ? '' : ' <span class="badge bg-danger">new</span>'}</td>
    <td>${esc(c.email)}<div class="text-muted small">${esc(c.phone)}</div></td>
    <td>${esc(c.subject)}</td><td style="max-width:280px">${esc(c.message)}</td>
    <td class="text-muted small">${esc(c.created_at)}</td>
    <td class="text-nowrap">
      <button class="btn btn-sm btn-outline-secondary" data-read="${c.id}" data-val="${c.is_read ? 0 : 1}" title="Toggle read"><i class="bi ${c.is_read ? 'bi-envelope' : 'bi-envelope-open'}"></i></button>
      <button class="btn btn-sm btn-outline-danger" data-del="${c.id}"><i class="bi bi-trash"></i></button></td></tr>`).join('')
    : `<tr><td colspan="7" class="empty">No contact submissions yet.</td></tr>`;
  $$('[data-read]').forEach((b) => b.onclick = async () => { await api(`/contact/${b.dataset.read}/read`, { method: 'PATCH', body: { is_read: Number(b.dataset.val) } }); VIEWS.contacts(); refreshBadges(); });
  $$('[data-del]').forEach((b) => b.onclick = async () => { if (confirm('Delete this lead?')) { await api(`/contact/${b.dataset.del}`, { method: 'DELETE' }); toast('Deleted'); VIEWS.contacts(); refreshBadges(); } });
  data.filter((c) => !c.is_read).forEach((c) => api(`/contact/${c.id}/read`, { method: 'PATCH', body: { is_read: 1 } }).catch(() => {}));
  setTimeout(refreshBadges, 600);
};

/* ---------------- Quotes ---------------- */
VIEWS.quotes = async function () {
  const root = $('#viewRoot');
  root.innerHTML = tableShell('Quote / Price Requests', null, ['#', 'Name', 'Email', 'Freight', 'Incoterms', 'Weight', 'Dimension', 'Date', '']);
  const { data } = await api('/quotes');
  $('#tbody').innerHTML = data.length ? data.map((q) => `<tr class="${q.is_read ? '' : 'row-unread'}">
    <td>${q.id}</td><td>${esc(q.name)}${q.is_read ? '' : ' <span class="badge bg-danger">new</span>'}</td>
    <td>${esc(q.email)}</td><td>${esc(q.freight_type)}</td><td>${esc(q.incoterms)}</td>
    <td>${esc(q.weight)}</td><td>${esc(q.dimension)}</td><td class="text-muted small">${esc(q.created_at)}</td>
    <td class="text-nowrap"><button class="btn btn-sm btn-outline-danger" data-del="${q.id}"><i class="bi bi-trash"></i></button></td></tr>`).join('')
    : `<tr><td colspan="9" class="empty">No quote requests yet.</td></tr>`;
  $$('[data-del]').forEach((b) => b.onclick = async () => { if (confirm('Delete this request?')) { await api(`/quotes/${b.dataset.del}`, { method: 'DELETE' }); toast('Deleted'); VIEWS.quotes(); refreshBadges(); } });
  data.filter((q) => !q.is_read).forEach((q) => api(`/quotes/${q.id}/read`, { method: 'PATCH', body: { is_read: 1 } }).catch(() => {}));
  setTimeout(refreshBadges, 600);
};

/* ---------------- Boot ---------------- */
document.addEventListener('DOMContentLoaded', () => {
  modal = new bootstrap.Modal('#formModal');
  $('#loginBtn').onclick = login;
  $('#password').addEventListener('keydown', (e) => { if (e.key === 'Enter') login(); });
  $('#logoutBtn').onclick = logout;
  $('#menuToggle').onclick = () => $('.sidebar').classList.toggle('open');
  window.addEventListener('hashchange', route);
  if (TOKEN) {
    api('/auth/me').then((d) => { $('#whoami').textContent = d.user.username; showApp(); }).catch(() => logout());
  } else {
    $('#loginScreen').style.display = 'flex';
  }
});

// Central API helper. Server components call these; on any failure they
// return safe fallbacks so `next build` never crashes when the backend is down.

export const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5556/api';

async function safeGet(path, fallback) {
  try {
    const res = await fetch(`${API_BASE}${path}`, { cache: 'no-store' });
    if (!res.ok) return fallback;
    const json = await res.json();
    return json?.data ?? fallback;
  } catch {
    return fallback;
  }
}

export const getGallery = () => safeGet('/gallery', []);
export const getTeam = () => safeGet('/team', []);
export const getBlogs = () => safeGet('/blogs?status=published', []);
export const getBlogBySlug = (slug) => safeGet(`/blogs/slug/${slug}`, null);

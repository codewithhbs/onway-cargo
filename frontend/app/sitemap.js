import { getBlogs } from '@/lib/api'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.onwayycargo.com'

const staticRoutes = [
  '', 'about', 'contact', 'gallery', 'team', 'blog', 'incoterms',
  'air-freight', 'ocean-freight', 'custom-clearance', 'transportation', 'warehousing',
  'food-industry', 'automobiles', 'tiles-industry', 'manufacturing', 'pharmaceutical', 'other-industries',
]

export default async function sitemap() {
  const now = new Date()
  const pages = staticRoutes.map((r) => ({
    url: `${SITE_URL}/${r}`,
    lastModified: now,
    changeFrequency: r === '' ? 'weekly' : 'monthly',
    priority: r === '' ? 1 : 0.7,
  }))

  let blogs = []
  try { blogs = await getBlogs() } catch { blogs = [] }
  const blogPages = blogs.map((b) => ({
    url: `${SITE_URL}/blog/${b.slug}`,
    lastModified: new Date(b.updated_at || b.created_at || now),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...pages, ...blogPages]
}

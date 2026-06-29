import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PageBanner from '@/components/PageBanner'
import { getBlogBySlug, getBlogs } from '@/lib/api'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.onwayycargo.com'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await getBlogBySlug(slug)
  if (!post) return { title: 'Post Not Found' }
  return {
    title: post.title,
    description: post.excerpt || post.title,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt || post.title,
      url: `${SITE_URL}/blog/${post.slug}`,
      images: post.image ? [post.image] : [],
    },
  }
}

function fmtDate(iso) {
  const d = new Date(iso || Date.now())
  return d.toLocaleDateString('en', { day: '2-digit', month: 'long', year: 'numeric' })
}

export default async function Page({ params }) {
  const { slug } = await params
  const post = await getBlogBySlug(slug)
  if (!post) notFound()

  const recent = (await getBlogs()).filter((b) => b.slug !== post.slug).slice(0, 4)

  return (
    <>
      <PageBanner title={post.title} crumb="Blog Details" />
      <section className="blog-details-area pt-120 pb-90 wow fadeInUp">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <article className="blog-details">
                {post.image && (
                  <div className="blog-details__img mb-35">
                    <img src={post.image} alt={post.title} style={{ width: '100%', borderRadius: 10 }} />
                  </div>
                )}
                <div className="blog__meta mb-20" style={{ fontSize: 14, color: '#777' }}>
                  <span><i className="fas fa-user"></i> {post.author}</span>
                  <span style={{ marginLeft: 16 }}><i className="fas fa-folder"></i> {post.category}</span>
                  <span style={{ marginLeft: 16 }}><i className="fas fa-calendar"></i> {fmtDate(post.created_at)}</span>
                </div>
                <h1 style={{ fontSize: 30, marginBottom: 20 }}>{post.title}</h1>
                <div
                  className="blog-content"
                  style={{ lineHeight: 1.8, color: '#444' }}
                  dangerouslySetInnerHTML={{ __html: post.content || `<p>${post.excerpt || ''}</p>` }}
                />
                <div className="mt-40">
                  <Link href="/blog" className="fill-btn clip-btn">← Back to Blog</Link>
                </div>
              </article>
            </div>
            <div className="col-lg-4">
              <aside className="blog-sidebar pl-30">
                <div className="sidebar-widget mb-40">
                  <h4 className="sidebar-widget__title mb-25">Recent Posts</h4>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {recent.map((r) => (
                      <li key={r.id} style={{ display: 'flex', gap: 12, marginBottom: 18 }}>
                        <img src={r.image} alt={r.title} style={{ width: 70, height: 60, objectFit: 'cover', borderRadius: 6, flex: 'none' }} />
                        <div>
                          <span style={{ fontSize: 12, color: '#999' }}>{fmtDate(r.created_at)}</span>
                          <h5 style={{ fontSize: 15, margin: 0 }}><Link href={`/blog/${r.slug}`}>{r.title}</Link></h5>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

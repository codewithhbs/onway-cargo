import React from 'react'
import Link from 'next/link'
import PageBanner from '@/components/PageBanner'
import { getBlogs } from '@/lib/api'

export const metadata = {
  title: 'Blog & Insights',
  description: 'Logistics insights, industry trends and shipping guides from the Onwayy Cargo team — air freight, ocean freight, incoterms, warehousing and more.',
  alternates: { canonical: '/blog' },
}

function fmtDate(iso) {
  const d = new Date(iso || Date.now())
  return d.toLocaleDateString('en', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default async function Page() {
  const blogs = await getBlogs()
  return (
    <>
      <PageBanner title="Blog & Insights" crumb="Blog" />
      <section className="blog-area pt-120 pb-90 wow fadeInUp">
        <div className="container">
          {blogs.length === 0 ? (
            <div className="text-center py-5"><p>No blog posts yet. Add them from the admin panel.</p></div>
          ) : (
            <div className="row">
              {blogs.map((b) => (
                <div className="col-lg-4 col-md-6 mb-40" key={b.id}>
                  <article className="blog__item" style={{ background: '#fff', borderRadius: 10, overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,.06)', height: '100%' }}>
                    <div className="blog__item-img">
                      <Link href={`/blog/${b.slug}`}>
                        <img src={b.image} alt={b.title} style={{ width: '100%', height: 220, objectFit: 'cover', display: 'block' }} />
                      </Link>
                    </div>
                    <div className="blog__item-content" style={{ padding: 22 }}>
                      <div className="blog__meta" style={{ fontSize: 13, color: '#777', marginBottom: 10 }}>
                        <span><i className="fas fa-user"></i> {b.author}</span>
                        <span style={{ marginLeft: 14 }}><i className="fas fa-folder"></i> {b.category}</span>
                      </div>
                      <h3 style={{ fontSize: 20, marginBottom: 10 }}>
                        <Link href={`/blog/${b.slug}`}>{b.title}</Link>
                      </h3>
                      <p style={{ color: '#666', marginBottom: 14 }}>{b.excerpt}</p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 13, color: '#999' }}>{fmtDate(b.created_at)}</span>
                        <Link href={`/blog/${b.slug}`} style={{ color: '#e3232a', fontWeight: 600 }}>Read More →</Link>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

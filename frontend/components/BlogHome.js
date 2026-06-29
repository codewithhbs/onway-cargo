import React from 'react'
import Link from 'next/link'
import { getBlogs } from '@/lib/api'

function fmtDate(iso) {
    const d = new Date(iso || Date.now())
    return { day: String(d.getDate()).padStart(2, '0'), mon: d.toLocaleString('en', { month: 'short' }) }
}

export default async function BlogHome() {
    const blogs = await getBlogs()
    if (!blogs || blogs.length === 0) return null

    const main = blogs.slice(0, 2)
    const side = blogs.slice(2, 5)

    return (
        <section className="blog pt-120 pb-85 white-bg">
            <div className="container">
                <div className="row align-items-center justify-content-center">
                    <div className="col-md-8 wow fadeInUp">
                        <div className="section__title mb-75 text-center">
                            <span className="sub-title">news insights</span>
                            <h2 className="title">our blog &amp; insights</h2>
                        </div>
                    </div>
                </div>
                <div className="blog-two">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="row">
                                {main.map((b) => {
                                    const d = fmtDate(b.created_at)
                                    return (
                                        <div className="col-md-6" key={b.id}>
                                            <article>
                                                <div className="blog__item mb-60 w-img wow fadeInUp">
                                                    <div className="blog__item-img mb-35">
                                                        <Link href={`/blog/${b.slug}`}><img src={b.image} alt={b.title} /></Link>
                                                        <div className="blog__meta dp-blog-meta1">
                                                            <span><a href="#"><i className="fas fa-user"></i> {b.author}</a></span>
                                                            <span><a href="#"><i className="fas fa-folder"></i> {b.category}</a></span>
                                                        </div>
                                                    </div>
                                                    <div className="blog__item-date">
                                                        <span><b>{d.day} </b>{d.mon}</span>
                                                    </div>
                                                    <div className="blog__item-content">
                                                        <h2><Link href={`/blog/${b.slug}`}>{b.title}</Link></h2>
                                                        <div className="blog__item-text">
                                                            <p>{b.excerpt}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </article>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="col-lg-4 wow fadeInUp">
                            <div className="row">
                                <div className="col-12">
                                    <div className="blog__title-wrapper mb-60">
                                        {(side.length ? side : main).map((b) => {
                                            const d = fmtDate(b.created_at)
                                            return (
                                                <article key={b.id}>
                                                    <div className="blog__title-inner">
                                                        <div className="blog__item-date">
                                                            <span><b>{d.day}</b>{d.mon}</span>
                                                        </div>
                                                        <div className="blog__item-title">
                                                            <h4><Link href={`/blog/${b.slug}`}>{b.title}</Link></h4>
                                                        </div>
                                                    </div>
                                                </article>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

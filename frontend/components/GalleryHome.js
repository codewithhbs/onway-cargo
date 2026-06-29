import React from 'react'
import Link from 'next/link'
import { getGallery } from '@/lib/api'

export default async function GalleryHome() {
    const all = await getGallery()
    if (!all || all.length === 0) return null

    const items = all.slice(0, 6) // home par limited

    return (
        <section className="gallery-home grey-bg-4 pt-120 pb-90">
            <div className="container">
                <div className="row align-items-center justify-content-center">
                    <div className="col-md-8 wow fadeInUp">
                        <div className="section__title mb-55 text-center">
                            <span className="sub-title">our gallery</span>
                            <h2 className="title">A Glimpse Of Our Operations</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {items.map((g) => (
                        <div className="col-lg-4 col-md-6 mb-30 wow fadeInUp" key={g.id}>
                            <div className="gallery-item" style={{ position: 'relative', overflow: 'hidden', borderRadius: 10 }}>
                                <img src={g.image} alt={g.title} style={{ width: '100%', height: 260, objectFit: 'cover', display: 'block' }} />
                                <div className="gallery-overlay" style={{
                                    position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                                    justifyContent: 'flex-end', padding: 20,
                                    background: 'linear-gradient(transparent, rgba(0,0,0,.75))', color: '#fff',
                                }}>
                                    <span style={{ fontSize: 12, opacity: .85 }}>{g.category}</span>
                                    <h4 style={{ color: '#fff', margin: 0, fontSize: 18 }}>{g.title}</h4>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="row">
                    <div className="col-12 text-center mt-20 wow fadeInUp">
                        <Link href="/gallery" className="fill-btn clip-btn">View More</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

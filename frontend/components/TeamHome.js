import React from 'react'
import Link from 'next/link'
import { getTeam } from '@/lib/api'

export default async function TeamHome() {
    const all = await getTeam()
    if (!all || all.length === 0) return null

    const members = all.slice(0, 4) // home par limited
    // console.log('TeamHome members:', members) // Debugging log

    return (
        <section className="team-home white-bg pt-120 pb-90">
            <div className="container">
                <div className="row align-items-center justify-content-center">
                    <div className="col-md-8 wow fadeInUp">
                        <div className="section__title mb-55 text-center">
                            <span className="sub-title">our team</span>
                            <h2 className="title">Meet The People Behind Onwayy Cargo</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {members.map((m) => (
                        <div className="col-xl-3 col-lg-4 col-md-6 mb-30 wow fadeInUp" key={m.id}>
                            <div className="team__item" style={{ textAlign: 'center', background: '#fff', borderRadius: 10, overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,.06)' }}>
                                <div className="team__img" style={{ position: 'relative' }}>
                                    <img src={m.image} alt={m.name} style={{ width: '100%', height: 300, objectFit: 'cover', display: 'block' }} />
                                </div>
                                <div className="team__content" style={{ padding: '22px 15px' }}>
                                    <h4 style={{ marginBottom: 4 }}>{m.name}</h4>
                                    <span style={{ color: '#e3232a', fontWeight: 500 }}>{m.role}</span>
                                    <div className="team__social" style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 12 }}>
                                        {m.facebook && <a href={m.facebook} target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>}
                                        {m.linkedin && <a href={m.linkedin} target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>}
                                        {m.twitter && <a href={m.twitter} target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>}
                                        {m.instagram && <a href={m.instagram} target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="row">
                    <div className="col-12 text-center mt-20 wow fadeInUp">
                        <Link href="/team" className="fill-btn clip-btn">View More</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

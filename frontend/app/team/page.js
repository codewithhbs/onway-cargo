import React from 'react'
import PageBanner from '@/components/PageBanner'
import { getTeam } from '@/lib/api'

export const metadata = {
  title: 'Our Team',
  description: 'Meet the experienced professionals behind Onwayy Cargo who deliver reliable air freight, ocean freight, custom clearance, transportation and warehousing solutions.',
  alternates: { canonical: '/team' },
}

export default async function Page() {
  const team = await getTeam()
  return (
    <>
      <PageBanner title="Our Team" crumb="Our Team" />
      <section className="team-area pt-120 pb-90 wow fadeInUp">
        <div className="container">
          {team.length === 0 ? (
            <div className="text-center py-5"><p>No team members yet. Add them from the admin panel.</p></div>
          ) : (
            <div className="row">
              {team.map((m) => (
                <div className="col-xl-3 col-lg-4 col-md-6 mb-30" key={m.id}>
                  <div className="team__item" style={{ textAlign: 'center', background: '#fff', borderRadius: 10, overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,.06)' }}>
                    <div className="team__img" style={{ position: 'relative' }}>
                      <img src={m.image} alt={m.name} style={{ width: '100%', height: 300, objectFit: 'cover', display: 'block' }} />
                    </div>
                    <div className="team__content" style={{ padding: '22px 15px' }}>
                      <h4 style={{ marginBottom: 4 }}>{m.name}</h4>
                      <span style={{ color: '#e3232a', fontWeight: 500 }}>{m.role}</span>
                      <div className="team__social mt-15" style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 12 }}>
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
          )}
        </div>
      </section>
    </>
  )
}

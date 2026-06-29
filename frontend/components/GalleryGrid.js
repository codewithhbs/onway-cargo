'use client'
import React, { useMemo, useState } from 'react'

export default function GalleryGrid({ items }) {
  const categories = useMemo(() => {
    const set = new Set(items.map((i) => i.category).filter(Boolean))
    return ['All', ...set]
  }, [items])
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? items : items.filter((i) => i.category === active)

  if (!items.length) {
    return <div className="text-center py-5"><p>No gallery items yet. Add them from the admin panel.</p></div>
  }

  return (
    <>
      <div className="gallery-filter text-center mb-50">
        <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', listStyle: 'none', padding: 0 }}>
          {categories.map((c) => (
            <li key={c}>
              <button
                onClick={() => setActive(c)}
                className={active === c ? 'fill-btn clip-sm-btn' : 'skew-btn'}
                style={{ cursor: 'pointer', border: 'none', color:'black' }}
              >
                {c}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="row">
        {filtered.map((g) => (
          <div className="col-lg-4 col-md-6 mb-30" key={g.id}>
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
    </>
  )
}

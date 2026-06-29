'use client'
import React, { useState } from 'react'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5556/api'

export default function QuotesHome() {
  const [formData, setFormData] = useState({
    name: '', email: '', freightType: '', incoterms: '', weight: '', dimension: '',
  })
  const [status, setStatus] = useState({ type: '', msg: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name.trim()) {
      setStatus({ type: 'error', msg: 'Please enter your name.' })
      return
    }
    setLoading(true)
    setStatus({ type: '', msg: '' })
    try {
      const res = await fetch(`${API_BASE}/quotes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok || data.success === false) throw new Error(data.message || 'Submission failed')
      setStatus({ type: 'success', msg: data.message || 'Quote request received!' })
      setFormData({ name: '', email: '', freightType: '', incoterms: '', weight: '', dimension: '' })
    } catch (err) {
      setStatus({ type: 'error', msg: err.message + ' (is the backend running?)' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="price__cta pt-120 bg-css" style={{ backgroundImage: `url('/assets/img/price-cta/price-cta-bg.png')` }}>
      <div className="container">
        <div className="row justify-content-end">
          <div className="col-xxl-7 col-xl-8">
            <div className="price__cta-content-shadow">
              <div className="price__cta-content">
                <div className="section__title mb-55 wow fadeInUp">
                  <span className="sub-title">request a quote</span>
                  <h2 className="title">price calculation</h2>
                </div>
                <div className="price__cta-form wow fadeInUp">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-xl-6 col-lg-6">
                        <div className="single-input-field">
                          <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} />
                          <i className="fas fa-user"></i>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6">
                        <div className="single-input-field">
                          <input type="email" name="email" placeholder="Email address" value={formData.email} onChange={handleChange} />
                          <i className="fas fa-envelope"></i>
                        </div>
                      </div>

                      {/* ✅ Freight Type Dropdown */}
                      <div className="col-xl-6 col-lg-6">
                        <div className="single-input-field z-index-3">
                          <div className="select-wrapper">
                            <select name="freightType" value={formData.freightType} onChange={handleChange}>
                              <option value="">Freight Type</option>
                              <option value="Ocean Freight">Ocean Freight</option>
                              <option value="Air Freight">Air Freight</option>
                              <option value="Land Freight">Land Freight</option>
                            </select>
                            {/* <span className="select-arrow">
                              <i className="fas fa-chevron-down"></i>
                            </span> */}
                          </div>
                        </div>
                      </div>

                      {/* ✅ Incoterms Dropdown */}
                      <div className="col-xl-6 col-lg-6">
                        <div className="single-input-field z-index-3">
                          <div className="select-wrapper">
                            <select name="incoterms" value={formData.incoterms} onChange={handleChange}>
                              <option value="">Incoterms</option>
                              <option value="EXW">EXW</option>
                              <option value="FOB">FOB</option>
                              <option value="CIF">CIF</option>
                              <option value="CPT">CPT</option>
                              <option value="DDP">DDP</option>
                            </select>
                            {/* <span className="select-arrow">
                              <i className="fas fa-chevron-down"></i>
                            </span> */}
                          </div>
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6">
                        <div className="single-input-field">
                          <input type="text" name="weight" placeholder="Total weight" value={formData.weight} onChange={handleChange} />
                          <i className="fad fa-weight"></i>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6">
                        <div className="single-input-field">
                          <input type="text" name="dimension" placeholder="Dimension" value={formData.dimension} onChange={handleChange} />
                          <i className="fas fa-cube"></i>
                        </div>
                      </div>
                    </div>

                    {status.msg && (
                      <div className={`alert ${status.type === 'success' ? 'alert-success' : 'alert-danger'} py-2`} style={{ marginBottom: 15 }}>
                        {status.msg}
                      </div>
                    )}
                    <div className="col-lx-12">
                      <div className="price__cta-btn">
                        <button type="submit" className="fill-btn clip-sm-btn d-block" disabled={loading}>
                          {loading ? 'Submitting…' : 'Submit Now'}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
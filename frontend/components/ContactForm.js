'use client'
import React, { useState } from 'react'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5556/api'

const SUBJECTS = ['Air Freight', 'Ocean Freight', 'Custom Clearance', 'Transportation', 'Warehousing', 'Other']

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [status, setStatus] = useState({ type: '', msg: '' })
  const [loading, setLoading] = useState(false)

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim()) { setStatus({ type: 'error', msg: 'Please enter your name.' }); return }
    setLoading(true); setStatus({ type: '', msg: '' })
    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok || data.success === false) throw new Error(data.message || 'Submission failed')
      setStatus({ type: 'success', msg: data.message || 'Message sent!' })
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch (err) {
      setStatus({ type: 'error', msg: err.message + ' (is the backend running?)' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="contact-form mb-60">
      <form onSubmit={onSubmit}>
        <div className="row">
          <div className="col-xxl-6 col-xl-6 col-lg-6">
            <div className="single-input-field">
              <input name="name" type="text" placeholder="Your Name" value={form.name} onChange={onChange} />
              <i className="fas fa-user"></i>
            </div>
          </div>
          <div className="col-xxl-6 col-xl-6 col-lg-6">
            <div className="single-input-field">
              <input name="email" type="email" placeholder="Email Address" value={form.email} onChange={onChange} />
              <i className="fas fa-envelope"></i>
            </div>
          </div>
          <div className="col-xxl-6 col-xl-6 col-lg-6">
            <div className="single-input-field">
              <input name="phone" type="text" placeholder="Phone Number" value={form.phone} onChange={onChange} />
              <i className="fas fa-phone"></i>
            </div>
          </div>
          <div className="col-xxl-6 col-xl-6 col-lg-6">
            <div className="single-input-field z-index-3">
              <select name="subject" value={form.subject} onChange={onChange}>
                <option value="">Select Subject</option>
                {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div className="col-12">
            <div className="single-input-field textarea">
              <textarea name="message" placeholder="Write your message..." value={form.message} onChange={onChange}></textarea>
            </div>
          </div>
        </div>
        {status.msg && (
          <div className={`alert ${status.type === 'success' ? 'alert-success' : 'alert-danger'} py-2`}>{status.msg}</div>
        )}
        <div className="contact-btn mt-10">
          <button type="submit" className="fill-btn clip-btn" disabled={loading}>
            {loading ? 'Sending…' : 'Submit Now'}
          </button>
        </div>
      </form>
    </div>
  )
}

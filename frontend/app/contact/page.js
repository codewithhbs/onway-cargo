import React from 'react'
import PageBanner from '@/components/PageBanner'
import ContactForm from '@/components/ContactForm'
import { COMPANY } from '@/lib/content'

export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Onwayy Cargo. Head office in Noida with branches in Maharashtra and Gujarat. Call +91-9711550985 or email info@onwayycargo.com.',
  alternates: { canonical: '/contact' },
}

export default function Page() {
  return (
    <>
      <PageBanner title="Contact Us" crumb="Contact Us" />

      <section className="contact-area contact--area pt-120 pb-90 wow fadeInUp">
        <div className="container">
          <div className="row">
            <div className="col-xxl-5 col-xl-6 col-lg-5">
              <div className="contact--wrapper mb-60">
                <div className="section__title mb-45">
                  <span className="sub-title">contact with us</span>
                  <h2 className="title">Get In Touch &amp; We&rsquo;ll Help Your Business</h2>
                </div>
                <div className="contact-info mr-20">
                  <div className="single-contact-info d-flex align-items-center">
                    <div className="contact-info-icon">
                      <a href={`tel:${COMPANY.phoneTel}`}><i className="flaticon-telephone-call"></i></a>
                    </div>
                    <div className="contact-info-text">
                      <span>Call us now</span>
                      <h5><a href={`tel:${COMPANY.phoneTel}`}>{COMPANY.phone}</a></h5>
                    </div>
                  </div>
                  <div className="single-contact-info d-flex align-items-center">
                    <div className="contact-info-icon">
                      <a href={`mailto:${COMPANY.email}`}><i className="flaticon-envelope"></i></a>
                    </div>
                    <div className="contact-info-text">
                      <span>Send email</span>
                      <h5><a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></h5>
                    </div>
                  </div>
                  <div className="single-contact-info d-flex align-items-center">
                    <div className="contact-info-icon">
                      <a href="#"><i className="flaticon-pin"></i></a>
                    </div>
                    <div className="contact-info-text">
                      <span>Head Office</span>
                      <h5>Sector-16 Noida, Uttar Pradesh - 201301</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-7 col-xl-6 col-lg-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="offices grey-bg-4 pt-100 pb-70 wow fadeInUp">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="section__title mb-55 text-center">
                <span className="sub-title">our offices</span>
                <h2 className="title">Reach Us Across India</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {COMPANY.offices.map((o, i) => (
              <div className="col-lg-3 col-md-6" key={i}>
                <div className="services__3-item mb-30" style={{ minHeight: 230 }}>
                  <div className="services__3-item-icon">
                    <i className="flaticon-pin"></i>
                  </div>
                  <h3 className="services__3-item-title">{o.label}</h3>
                  <p className="services__3-item-text">{o.address}</p>
                  <p className="mb-0"><a href={`tel:${COMPANY.phoneTel}`}>{COMPANY.phone}</a></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

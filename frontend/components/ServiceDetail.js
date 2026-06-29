import React from 'react';
import Link from 'next/link';
import PageBanner from '@/components/PageBanner';
import { COMPANY } from '@/lib/content';

export default function ServiceDetail({ data }) {
  return (
    <>
      <PageBanner title={data.title} crumb={data.title} />

      <section className="about__area about__area-padding pt-120 pb-90 wow fadeInUp">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-xl-6">
              <div className="about__img mb-50 p-relative">
                <img src={data.image} alt={data.title} style={{ width: '100%', borderRadius: 10 }} />
              </div>
            </div>
            <div className="col-lg-6 col-xl-6">
              <div className="about__content mb-50">
                <div className="section__title mb-30">
                  <span className="sub-title">{data.title}</span>
                  <h2 className="title">{data.title}</h2>
                </div>
                <div className="about__content-inner mb-30">
                  <p className="mb-15">{data.intro}</p>
                </div>
                <div className="about__call d-flex align-items-center" style={{ gap: 15 }}>
                  <div className="about__call-icon">
                    <i className="flaticon-telephone-call" style={{ fontSize: 30, color: '#e3232a' }}></i>
                  </div>
                  <div className="about__call-text">
                    <span>Make A Phone Call</span>
                    <h4><a href={`tel:${COMPANY.phoneTel}`}>{COMPANY.phone}</a></h4>
                  </div>
                </div>
                <div className="about__btn mt-35">
                  <Link className="fill-btn clip-btn" href="/contact">Get a Quote</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="services__3 grey-bg-4 pt-100 pb-70 wow fadeInUp">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="section__title mb-55 text-center">
                <span className="sub-title">what we offer</span>
                <h2 className="title">Services We Provide</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {data.services.map((s, i) => (
              <div className="col-xl-4 col-md-6" key={i}>
                <div className="services__3-item mb-30">
                  <div className="services__3-item-num">
                    <h3>{String(i + 1).padStart(2, '0')}</h3>
                  </div>
                  <div className="services__3-item-icon">
                    <i className="fal fa-check-circle"></i>
                  </div>
                  <h3 className="services__3-item-title">{s}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-mini red-bg pt-60 pb-60">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h2 className="title" style={{ color: '#fff', marginBottom: 5 }}>Ready to ship with Onwayy Cargo?</h2>
              <p style={{ color: '#ffe', margin: 0 }}>Talk to our logistics experts for a tailored, cost-effective solution.</p>
            </div>
            <div className="col-lg-4 text-lg-end mt-3 mt-lg-0">
              <a className="skew-btn" href={COMPANY.whatsapp} target="_blank" rel="noopener noreferrer">Book Now</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

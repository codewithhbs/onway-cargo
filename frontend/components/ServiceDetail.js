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

      <section className="sp-services grey-bg-4 pt-100 pb-70 wow fadeInUp">
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
                <div className="sp-card">
                  <span className="sp-num">{String(i + 1).padStart(2, '0')}</span>
                  <div className="sp-ic"><i className="fal fa-check"></i></div>
                  <h4 className="sp-title">{s}</h4>
                  <span className="sp-bar" />
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

      <style>{`
        .sp-card{
          position:relative;
          display:flex;
          align-items:center;
          gap:16px;
          background:#fff;
          border:1px solid #ececf1;
          border-radius:14px;
          padding:24px 24px;
          margin-bottom:30px;
          overflow:hidden;
          transition:transform .3s ease, box-shadow .3s ease, border-color .3s ease;
          z-index:1;
        }
        .sp-card:hover{
          transform:translateY(-6px);
          box-shadow:0 18px 40px rgba(227,35,42,.14);
          border-color:transparent;
        }
        .sp-card .sp-bar{
          position:absolute;
          left:0; top:0;
          width:5px; height:0;
          background:linear-gradient(180deg,#e3232a,#b81b21);
          transition:height .35s ease;
          border-radius:0 4px 4px 0;
        }
        .sp-card:hover .sp-bar{ height:100%; }
        .sp-ic{
          flex:none;
          width:54px; height:54px;
          display:grid; place-items:center;
          border-radius:50%;
          color:#fff; font-size:20px;
          background:linear-gradient(135deg,#e3232a,#b81b21);
          box-shadow:0 8px 18px rgba(227,35,42,.32);
          transition:transform .35s ease;
        }
        .sp-card:hover .sp-ic{ transform:scale(1.08) rotate(6deg); }
        .sp-title{
          margin:0;
          font-size:18px;
          font-weight:700;
          line-height:1.35;
          color:#1b1f2a;
        }
        .sp-num{
          position:absolute;
          right:14px; top:2px;
          font-size:60px;
          font-weight:800;
          line-height:1;
          color:rgba(227,35,42,.07);
          z-index:-1;
          letter-spacing:-2px;
        }
      `}</style>
    </>
  );
}
import React from 'react'
import Link from 'next/link'
import PageBanner from '@/components/PageBanner'

export const metadata = {
  title: 'About Us',
  description: 'Onwayy Cargo is an international ocean, air and integrated logistics services provider — a WCA Lognet member and MTO-certified company serving customers across all verticals.',
  alternates: { canonical: '/about' },
}

export default function Page() {
  return (
    <>
      <PageBanner title="About Us" crumb="About Us" />

      <section className="about__area about__area-padding pt-120 pb-90 wow fadeInUp">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-xl-6">
              <div className="about__img mb-50">
                <img src="/assets/img/about/about-page-1.jpg" alt="About Onwayy Cargo" style={{ width: '100%', borderRadius: 10 }} />
              </div>
            </div>
            <div className="col-lg-6 col-xl-6">
              <div className="about__content mb-50">
                <div className="section__title mb-30">
                  <span className="sub-title">About Onwayy Cargo</span>
                  <h2 className="title">Our Expertise Stands in Logistics Solutions</h2>
                </div>
                <div className="about__content-inner">
                  <p className="mb-15">Onwayy Cargo is an international ocean, air and integrated logistics services provider worldwide. Our services include consolidation and forwarding of air and ocean freight, customs brokerage, warehousing &amp; distribution, project cargo and local transportation. We have a team of trained professionals serving customers across all verticals, and we pride ourselves on being a solutions-based organization that understands each customer&rsquo;s individual business needs.</p>
                  <p className="mb-15">We have considerable flexibility when managing customers&rsquo; freight and supply chains. Our strong relationships with local suppliers and global air and ocean partners help us provide the best routing, transit time and cost-effective pricing options. Onwayy Cargo Pvt. Ltd. is a member of WCA Lognet and is MTO certified.</p>
                </div>
                <div className="about__btn mt-30">
                  <Link className="fill-btn clip-btn" href="/contact">Contact Us</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mission-vision grey-bg-4 pt-100 pb-70 wow fadeInUp">
        <div className="container">
          <div className="row">
            {[
              { icon: 'fal fa-bullseye-arrow', title: 'Mission', text: 'To become the world\u2019s preferred supply-chain logistics company \u2014 applying insight, service quality and innovation to create sustainable growth for business and society.' },
              { icon: 'fal fa-eye', title: 'Vision', text: 'Connecting people, businesses and communities to a better future \u2014 through logistics.' },
              { icon: 'fal fa-flag', title: 'Goal', text: 'Our values guide how we behave and how we communicate with each other and the world around us.' },
            ].map((b, i) => (
              <div className="col-lg-4 col-md-6" key={i}>
                <div className="services__3-item mb-30" style={{ minHeight: 230 }}>
                  <div className="services__3-item-icon">
                    <i className={b.icon}></i>
                  </div>
                  <h3 className="services__3-item-title">{b.title}</h3>
                  <p className="services__3-item-text">{b.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

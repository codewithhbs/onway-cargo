'use client'

import React from 'react'
import Link from 'next/link'

const services = [
  {
    icon: 'flaticon-plane',
    title: 'Air Freight',
    href: '/air-freight',
    content: 'At Onwayy Cargo, we have the capability to provide reliable and time-sensitive air freight solutions across domestic and international destinations.',
  },
  {
    icon: 'flaticon-boat',
    title: 'Ocean Freight',
    href: '/ocean-freight',
    content: 'Ocean freight is one of the most cost-effective shipping solutions, offering secure and efficient transportation for global cargo movement.',
  },
  {
    icon: 'flaticon-frontal-truck',
    title: 'Road Transportation',
    href: '/transportation',
    content: 'We provide dependable road transportation services with a strong network, ensuring safe and timely deliveries across regions.',
  },
  {
    icon: 'flaticon-van',
    title: 'Warehousing',
    href: '/warehousing',
    content: 'Onwayy Cargo offers dedicated and shared warehousing solutions with secure storage, inventory management, and distribution services.',
  },
]

export default function ServicesThree() {
  return (
    <section className="services__3 grey-bg-4 pt-120 pb-90">
      <div className="container">
        <div
          className="row justify-content-center wow fadeInUp"
          data-wow-duration="1.5s"
          data-wow-delay=".3s"
        >
          <div className="col-md-8">
            <div className="section__title mb-55 text-center">
              <span className="sub-title">services</span>
              <h2 className="title">what we do</h2>
            </div>
          </div>
        </div>

        <div
          className="row wow fadeInUp"
          data-wow-duration="1.5s"
          data-wow-delay=".5s"
        >
          {services.map((service, index) => (
            <div className="col-xl-4 col-md-6" key={index}>
              <div className="services__3-item mb-30">
                <div className="services__3-item-num">
                  <h3>{String(index + 1).padStart(2, '0')}</h3>
                </div>

                <div className="services__3-item-icon">
                  <i className={service.icon}></i>
                </div>

                <h3 className="services__3-item-title">
                  <Link href={service.href}>
                    {service.title}
                  </Link>
                </h3>

                <p className="services__3-item-text">
                  {service.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
// components/TestimonialHome.jsx
'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'

const testimonials = [
  { id: 1, text: "Reliable and efficient cargo shipping with punctual deliveries and excellent customer service. Their transparent tracking system makes logistics hassle-free.", name: "Arun Kendra", img: "/assets/img/testimonial/test.jpg" },
  { id: 2, text: "Onwayy Cargo stands out for timely deliveries and great communication. A dependable choice for businesses and individuals alike.", name: "Sunil Sahni", img: "/assets/img/testimonial/test.jpg" },
  { id: 3, text: "Needed urgent delivery Delhi to Dehradun in 2 days — got it in under 24 hours! Super fast and committed service. Highly recommended.", name: "Vishal Saxena", img: "/assets/img/testimonial/test.jpg" },
  { id: 4, text: "Amazing service and communication. Very professional and careful team. Will definitely use again and recommend to everyone!", name: "Rahul Singh", img: "/assets/img/testimonial/test.jpg" },
]

export default function TestimonialHome() {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && window.Swiper) {
        new window.Swiper('.testimonial-active', {
          slidesPerView: 2,
          spaceBetween: 30,
          loop: true,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          breakpoints: {
            0:   { slidesPerView: 1 },
            768: { slidesPerView: 2 },
          },
        })
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      className="testimonial-area testimonial-space pb-100 pt-120 bg-css"
      style={{ backgroundImage: `url('/assets/img/services/services-bg.png')` }}
    >
      <div className="container">
        <div className="row justify-content-center wow fadeInUp">
          <div className="col-xl-5">
            <div className="section__title text-center mb-35">
              <span className="sub-title">testimonials</span>
              <h2 className="title">user feedbacks</h2>
            </div>
          </div>
        </div>
        <div className="testimonial-box wow fadeInUp">
          <div className="swiper-container testimonial-active testimonial-one">
            <div className="swiper-wrapper">
              {testimonials.map((t) => (
                <div key={t.id} className="swiper-slide">
                  <div className="testimonial-shadow">
                    <div className="testimonial-items">
                      <div className="testimonial__icon rate">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className="fas fa-star"></i>
                        ))}
                      </div>
                      <div className="testimonial__text">
                        <p>"{t.text}"</p>
                      </div>
                      <div className="testimonial__auth">
                        <div className="testimonial__auth-img f-left mr-20">
                          <Image src={t.img} alt={t.name} width={50} height={50} />
                        </div>
                        <div className="testimonial__auth-text fix">
                          <h4>{t.name}</h4>
                        </div>
                      </div>
                      <div className="testimonial__quote-icon quote">
                        <i className="fas fa-quote-left"></i>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
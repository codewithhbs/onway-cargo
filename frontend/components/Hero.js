'use client'
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'

const slides = [
    { bg: '/assets/img/slider/slider.png' },
    { bg: '/assets/img/slider/slider-3.png' },
    { bg: '/assets/img/slider/slider-5.jpg' },
]

export default function Hero() {
    const containerRef = useRef(null)
    const nextRef = useRef(null)
    const prevRef = useRef(null)
    const swiperRef = useRef(null)

    useEffect(() => {
        let tries = 0
        let timer = null

        const init = () => {
            const el = containerRef.current
            if (!el) return

            // Swiper bundle is loaded via <Script> in layout — wait until it's ready
            if (typeof window === 'undefined' || !window.Swiper) {
                if (tries++ < 40) { timer = setTimeout(init, 100); }
                return
            }

            // If this element already has a Swiper (e.g. re-render), destroy it first
            // so we never stack two instances on the same node (that caused blank slides).
            if (el.swiper) {
                try { el.swiper.destroy(true, true) } catch (e) {}
            }

            swiperRef.current = new window.Swiper(el, {
                slidesPerView: 1,
                loop: true,
                speed: 1000,
                effect: 'fade',
                fadeEffect: { crossFade: true },
                autoplay: { delay: 5000, disableOnInteraction: false },
                navigation: {
                    nextEl: nextRef.current,
                    prevEl: prevRef.current,
                },
                a11y: false,
            })
        }

        init()

        return () => {
            if (timer) clearTimeout(timer)
            if (swiperRef.current) {
                try { swiperRef.current.destroy(true, true) } catch (e) {}
                swiperRef.current = null
            }
        }
    }, [])

    return (
        <section className="banner-area banner-area1 pos-rel">
            {/* class is `hero__active` (NOT slider__active) so the template's main.js
                and TemplateInit don't ALSO initialise it — this component owns its slider. */}
            <div className="swiper-container hero__active" ref={containerRef}>
                <div className="swiper-wrapper">
                    {slides.map((s, i) => (
                        <div className="swiper-slide" key={i}>
                            <div className="single-banner banner-overlay single-banner-1 banner-830">
                                <div
                                    className="banner-bg banner-bg1 banner-bg1-1"
                                    data-background={s.bg}
                                    style={{ backgroundImage: `url('${s.bg}')` }}
                                ></div>
                                <div className="container pos-rel">
                                    <div className="row align-items-center">
                                        <div className="col-lg-8">
                                            <div className="banner-content banner-content1 banner-content1-1">
                                                <div className="banner-meta-text" data-animation="fadeInUp" data-delay=".3s">
                                                    <span>Welcome to Onwayy Cargo</span>
                                                </div>
                                                <h1 className="banner-title" data-animation="fadeInUp" data-delay=".5s">
                                                    We Provide Global Logistic
                                                </h1>
                                                <div className="banner-btn" data-animation="fadeInUp" data-delay=".7s">
                                                    <Link href="/contact" className="fill-btn clip-btn">get estimation</Link>
                                                    <Link className="skew-btn" href="/air-freight">our services</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="slider-nav d-none d-md-block">
                <div ref={prevRef} className="dp-nav-btn slider-button-prev"><i className="far fa-angle-left"></i></div>
                <div ref={nextRef} className="dp-nav-btn slider-button-next"><i className="far fa-angle-right"></i></div>
            </div>
            <div className="slider-pagination slider1-pagination"></div>
        </section>
    )
}
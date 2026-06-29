import React from 'react'

export default function AboutHome() {
    return (

        <>
            <section className="about__3 about__gray-bg p-relative pt-120 pb-60">
                <div className="container">
                    <div
                        className="row align-items-center wow fadeInUp"
                        data-wow-duration="1.5s"
                        data-wow-delay=".3s"
                    >
                        <div className="col-xl-6 col-lg-6">
                            <div className="about__3-img-wrapper p-relative mb-60">
                                <div className="about__3-top w-img">
                                    <img src="/assets/img/about/about-img.png" alt="About Onwayy Cargo" />
                                </div>

                                {/* Agar second image nahi chahiye to is div ko remove kar sakte ho */}
                                <div className="about__3-main w-img">
                                    <img src="https://codeskdhaka.com/html/delport-prv/delport/assets/img/about/about-page-1.jpg" alt="About Onwayy Cargo" />
                                </div>

                                <div className="about__3-text clip-box-sm">
                                    <span>
                                        <i className="far fa-trophy-alt"></i>
                                    </span>
                                    <h4 className="about__3-title">Trusted Logistics Partner</h4>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-6 col-lg-6">
                            <div className="about__3-content mb-60">
                                <div className="section__title mb-30">
                                    <span className="sub-title">About Onwayy Cargo</span>
                                    <h2 className="title">
                                        Our Expertise Stands 
                                        in <br /> Logistics Solutions
                                    </h2>
                                </div>

                                <div className="about__3-content-inner p-relative">
                                    <div className="about__3-content-left">
                                        <p>
                                            Onwayy Cargo is an international Ocean, Air, and integrated
                                            logistics services provider worldwide. Our services include
                                            consolidation and forwarding of Air and Ocean Freight, Customs
                                            Brokerage, Warehousing & Distribution, Project Cargo, and Local
                                            Transportation.
                                        </p>

                                        <p>
                                            We have a team of trained professionals serving customers across
                                            multiple industries.
                                        </p>

                                        <div className="about__3-content-btn mt-35">
                                            <a href="/about" className="skew-btn">
                                                Learn More
                                            </a>
                                        </div>
                                    </div>

                                    <div className="about__3-content-right">
                                        <div className="about__3-shadow">
                                            <div className="about__3-content-num">
                                                <h2>100%</h2>
                                                <h6>Customer Focused</h6>
                                            </div>
                                        </div>

                                        <div className="about__3-shadow">
                                            <div className="about__3-content-num">
                                                <h2>24/7</h2>
                                                <h6>Logistics Support</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

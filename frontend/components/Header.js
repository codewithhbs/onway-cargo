import Link from 'next/link'
import React from 'react'

export default function Header() {
    return (
        <header>
            <div className="header__top-3">
                <div className="container-fluid">
                    <div className="row justify-content-end">
                        <div className="col-xxl-10 col-xl-9 col-lg-9 col-sm-9">
                            <div className="header__top-3-text theme-bg clip-box-xxs d-flex align-items-center justify-content-between">
                                <div className="header__text">
                                    <span className="uppercase">We&rsquo;re more than just transport. <b><Link href="/contact">Free Consultancy</Link></b> </span>
                                </div>
                                <div className="header__top-3-link t-right">
                                    <ul>
                                        <li><a href="https://www.facebook.com/onwayycargo" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a></li>
                                        <li><a href="https://www.instagram.com/onwayycargo/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a></li>
                                        <li><a href="https://www.linkedin.com/company/onwayy-cargo/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-2 col-xl-3 col-lg-3 col-sm-3">
                            <div className="header__top-3-btn t-right">
                                <a href="http://wa.me/+919873952371" target="_blank" rel="noopener noreferrer" className="fill-btn fill-lg-btn clip-md-btn">Book Now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="header-sticky" className="header__bottom-3 menu-sticky">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-xxl-2 col-xl-2 col-lg-2 col-6">
                            <div className="logo">
                                <Link href="/"><img src="/assets/img/logo/onway-web-logo.webp" alt="Onwayy Cargo" /></Link>
                            </div>
                        </div>
                        <div className="col-xxl-8 col-xl-8 col-lg-8 col-6">
                            <div className="main-menu main-menu-3">
                                <nav id="mobile-menu">
                                    <ul>
                                        <li><Link href="/">Home</Link></li>
                                        <li><Link href="/about">About Us</Link></li>
                                        <li className="menu-item-has-children">
                                            <a href="#">Services</a>
                                            <ul className="sub-menu">
                                                <li><Link href="/air-freight">Air Freight</Link></li>
                                                <li><Link href="/ocean-freight">Ocean Freight</Link></li>
                                                <li><Link href="/custom-clearance">Custom Clearance</Link></li>
                                                <li><Link href="/transportation">Transportation</Link></li>
                                                <li><Link href="/warehousing">Warehousing</Link></li>
                                            </ul>
                                        </li>
                                        <li className="menu-item-has-children">
                                            <a href="#">Industries</a>
                                            <ul className="sub-menu">
                                                <li><Link href="/food-industry">Food Industry</Link></li>
                                                <li><Link href="/automobiles">Automobiles</Link></li>
                                                <li><Link href="/tiles-industry">Tiles Industry</Link></li>
                                                <li><Link href="/manufacturing">Manufacturing</Link></li>
                                                <li><Link href="/pharmaceutical">Pharmaceuticals &amp; Healthcare</Link></li>
                                                <li><Link href="/other-industries">Other Industries</Link></li>
                                            </ul>
                                        </li>
                                        {/* <li><Link href="/gallery">Gallery</Link></li>
                                        <li><Link href="/team">Team</Link></li> */}
                                        <li className="menu-item-has-children">
                                            <a href="#">Insights</a>
                                            <ul className="sub-menu">
                                                <li><Link href="/incoterms">Incoterms</Link></li>
                                                <li><Link href="/blog">Blog</Link></li>
                                            </ul>
                                        </li>
                                        <li><Link href="/contact">Contact</Link></li>
                                    </ul>
                                </nav>
                            </div>
                            <div className="header__toggle-btn sidebar-toggle-btn text-end d-block d-lg-none">
                                <div className="header__bar">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-2 col-xl-2 col-lg-2 d-none d-lg-block">
                            <div className="header__bottom-3-wrapper">
                                <div className="header__bottom-3-info">
                                    <div className="header__bottom-3-item">
                                        <div className="header__bottom-3-icon mr-10">
                                            <i className="flaticon-telephone-call"></i>
                                        </div>
                                        <div className="header__bottom-3-text">
                                            <h5><a href="tel:+919873952371">+91-9873952371</a></h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Sidebar Area */}
            <div className="sidebar__area">
                <div className="sidebar__wrapper">
                    <div className="sidebar__close">
                        <button className="sidebar__close-btn" id="sidebar__close-btn">
                            <i className="fal fa-times"></i>
                        </button>
                    </div>
                    <div className="sidebar__content">
                        <div className="sidebar__logo mb-40">
                            <Link href="/">
                                <img className='mob-logo' src="/assets/img/logo/onway-web-logo.webp" alt="Onwayy Cargo" />
                            </Link>
                        </div>
                        <div className="mobile-menu fix mb-10 mean-container"></div>
                        <div className="sidebar__contact mt-30 mb-30">
                            <div className="sidebar__info fix">
                                <div className="sidebar__info-item">
                                    <div className="sidebar__info-icon">
                                        <i className="flaticon-telephone-call"></i>
                                    </div>
                                    <div className="sidebar__info-text">
                                        <span>Call us now</span>
                                        <h5><a href="tel:+919873952371">+91-9873952371</a></h5>
                                    </div>
                                </div>
                                <div className="sidebar__info-item">
                                    <div className="sidebar__info-icon">
                                        <i className="flaticon-envelope"></i>
                                    </div>
                                    <div className="sidebar__info-text">
                                        <span>Email now</span>
                                        <h5><a href="mailto:juhichopra@onwayycargo.com">juhichopra@onwayycargo.com</a></h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="sidebar__social">
                            <ul>
                                <li><a href="https://www.facebook.com/onwayycargo" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a></li>
                                <li><a href="https://www.instagram.com/onwayycargo/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a></li>
                                <li><a href="https://www.linkedin.com/company/onwayy-cargo/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="body-overlay"></div>
        </header>
    )
}

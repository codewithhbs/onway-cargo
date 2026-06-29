import Link from 'next/link'
import React from 'react'

export default function Footer() {
    return (
        <footer>
            <div className="footer-area footer__padd-1 p-relative footer-area1-bg pt-150 pb-50">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                            <div className="footer-widget footer2-widget footer2-widget1 mb-50 pr-20">
                                <div className="footer-widget-title">
                                    <h4>About Us</h4>
                                </div>
                                <p>Onwayy Cargo is an international ocean, air and integrated
                                    logistics services provider worldwide. Services include
                                    consolidation and forwarding of air and ocean freight,
                                    customs brokerage, warehousing and local transportation.
                                </p>
                                <div className="footer-social-link mt-40">
                                    <ul>
                                        <li><a href="https://www.facebook.com/onwayycargo" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a></li>
                                        <li><a href="https://www.instagram.com/onwayycargo/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a></li>
                                        <li><a href="https://www.linkedin.com/company/onwayy-cargo/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                            <div className="footer-widget footer2-widget footer2-widget2 mb-50 pl-30">
                                <div className="footer-widget-title">
                                    <h4>Quick Links</h4>
                                </div>
                                <div className="footer-widget-link">
                                    <ul>
                                        <li><Link href="/">Home</Link></li>
                                        <li><Link href="/about">About Us</Link></li>
                                        <li><Link href="/gallery">Gallery</Link></li>
                                        <li><Link href="/team">Our Team</Link></li>
                                        <li><Link href="/blog">Blog</Link></li>
                                        <li><Link href="/contact">Contact Us</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                            <div className="footer-widget footer2-widget footer2-widget3 mb-50 pl-55">
                                <div className="footer-widget-title">
                                    <h4>Our Services</h4>
                                </div>
                                <ul className="footer-widget-link-2">
                                    <li><i className="fas fa-plane"></i><Link href="/air-freight">Air Freight</Link></li>
                                    <li><i className="fas fa-ship"></i><Link href="/ocean-freight">Ocean Freight</Link></li>
                                    <li><i className="fas fa-file-alt"></i><Link href="/custom-clearance">Custom Clearance</Link></li>
                                    <li><i className="fas fa-truck"></i><Link href="/transportation">Transportation</Link></li>
                                    <li><i className="fas fa-warehouse"></i><Link href="/warehousing">Warehousing</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                            <div className="footer-widget footer2-widget footer2-widget4 mb-50 pl-10 pr-40">
                                <div className="footer-widget-title">
                                    <h4>Get In Touch</h4>
                                </div>
                                <div className="footer-contact-info">
                                    <p className="mb-15"><i className="flaticon-pin"></i> Office No.5, First Floor, A-12 &amp; A-13, Sector-16 Noida, Gautam Budh Nagar, Uttar Pradesh - 201301</p>
                                    <p className="mb-10"><i className="flaticon-envelope"></i> <a href="mailto:info@onwayycargo.com">info@onwayycargo.com</a></p>
                                    <p className="mb-0"><i className="flaticon-telephone-call"></i> <a href="tel:+919711550985">+91-9711550985</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{backgroundColor:'#2a2a2a'}} className="footer-menu-area">
                <div className="container">
                    <div className="footer-menu-box two">
                        <div className="row align-items-center">
                            <div className="col-xxl-7 col-lg-5">
                                <div className="footer-menu mb-15">
                                    <nav>
                                        <ul>
                                            <li><Link href="/about">About</Link></li>
                                            <li><Link href="/incoterms">Incoterms</Link></li>
                                            <li><Link href="/contact">Contact</Link></li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                            <div className="col-xxl-5 col-lg-7">
                                <div className="copy-right-text-2 mb-15">
                                    <p>Onwayy Cargo Private Limited &copy; Copyright {new Date().getFullYear()}. All Rights Reserved.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

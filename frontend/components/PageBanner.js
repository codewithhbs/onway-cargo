import Link from 'next/link';
import React from 'react';

export default function PageBanner({ title, crumb }) {
  return (
    <section
      className="page-title-area breadcrumb-spacing"
      data-background="/assets/img/slider/slider-3.png"
      style={{ backgroundImage: "url('/assets/img/slider/slider-3.png')" }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xxl-9">
            <div className="page-title-wrapper text-center">
              <h3 className="page-title mb-25">{title}</h3>
              <div className="breadcrumb-menu">
                <nav aria-label="Breadcrumbs" className="breadcrumb-trail breadcrumbs">
                  <ul className="trail-items">
                    <li className="trail-item trail-begin">
                      <Link href="/"><span>Home</span></Link>
                    </li>
                    <li className="trail-item trail-end"><span>{crumb || title}</span></li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

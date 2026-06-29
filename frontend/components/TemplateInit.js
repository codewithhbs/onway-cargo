'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * The Bootstrap template's main.js initialises jQuery plugins once on first load.
 * On Next.js client-side navigation the page content re-renders but those plugins
 * don't re-run, so this component re-applies the essentials on every route change:
 *  - data-background -> inline background-image
 *  - .wow elements -> reveal (so they never stay hidden)
 *  - re-init Swiper sliders present in the new page
 */
export default function TemplateInit() {
  const pathname = usePathname();

  useEffect(() => {
    const t = setTimeout(() => {
      if (typeof window === 'undefined') return;

      // 1) data-background images
      document.querySelectorAll('[data-background]').forEach((el) => {
        const bg = el.getAttribute('data-background');
        if (bg) el.style.backgroundImage = `url('${bg}')`;
      });

      // 2) reveal WOW animation elements
      document.querySelectorAll('.wow').forEach((el) => {
        el.style.visibility = 'visible';
        el.classList.add('animated');
      });

      // 3) re-init swiper sliders if any
      const W = window;
      if (W.Swiper) {
        if (document.querySelector('.slider__active')) {
          new W.Swiper('.slider__active', {
            loop: true,
            speed: 1200,
            pagination: { el: '.slider1-pagination', clickable: true },
            navigation: { nextEl: '.slider-button-next', prevEl: '.slider-button-prev' },
          });
        }
        if (document.querySelector('.brand-active-2')) {
          new W.Swiper('.brand-active-2', {
            loop: true,
            slidesPerView: 5,
            spaceBetween: 30,
            autoplay: { delay: 2500 },
            breakpoints: { 0: { slidesPerView: 2 }, 576: { slidesPerView: 3 }, 992: { slidesPerView: 5 } },
          });
        }
      }
    }, 350);

    return () => clearTimeout(t);
  }, [pathname]);

  return null;
}

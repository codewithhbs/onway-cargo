import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TemplateInit from "@/components/TemplateInit";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.onwayycargo.com";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Onwayy Cargo | Global Logistics, Air & Ocean Freight",
    template: "%s | Onwayy Cargo",
  },
  description:
    "Onwayy Cargo is an international ocean, air and integrated logistics services provider — air freight, ocean freight, custom clearance, transportation and warehousing across India and worldwide.",
  keywords: [
    "Onwayy Cargo", "logistics company India", "air freight", "ocean freight",
    "custom clearance", "transportation", "warehousing", "freight forwarder Noida",
  ],
  authors: [{ name: "Onwayy Cargo Pvt. Ltd." }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Onwayy Cargo",
    title: "Onwayy Cargo | Global Logistics, Air & Ocean Freight",
    description:
      "International ocean, air and integrated logistics services provider worldwide.",
    url: SITE_URL,
    images: ["/assets/img/about/about-page-1.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Onwayy Cargo | Global Logistics",
    description: "Air freight, ocean freight, custom clearance, transportation & warehousing.",
  },
  robots: { index: true, follow: true },
  // icons: { icon: "/assets/img/favicon.png" },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* CSS here */}
        <link rel="stylesheet" href="/assets/css/preloader.css" />
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/meanmenu.css" />
        <link rel="stylesheet" href="/assets/css/animate.min.css" />
        <link rel="stylesheet" href="/assets/css/owl.carousel.min.css" />
        <link rel="stylesheet" href="/assets/css/swiper-bundle.css" />
        <link rel="stylesheet" href="/assets/css/backToTop.css" />
        <link rel="stylesheet" href="/assets/css/magnific-popup.css" />
        <link rel="stylesheet" href="/assets/css/ui-range-slider.css" />
        <link rel="stylesheet" href="/assets/css/nice-select.css" />
        <link rel="stylesheet" href="/assets/css/fontAwesome5Pro.css" />
        <link rel="stylesheet" href="/assets/css/flaticon.css" />
        <link rel="stylesheet" href="/assets/css/default.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Onwayy Cargo Pvt. Ltd.",
              url: SITE_URL,
              logo: `${SITE_URL}/assets/img/logo/onway-web-logo.webp`,
              telephone: "+91-9711550985",
              email: "info@onwayycargo.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Office No.5, First Floor, A-12 & A-13, Sector-16",
                addressLocality: "Noida",
                addressRegion: "Uttar Pradesh",
                postalCode: "201301",
                addressCountry: "IN",
              },
              sameAs: [
                "https://www.facebook.com/onwayycargo",
                "https://www.instagram.com/onwayycargo/",
                "https://www.linkedin.com/company/onwayy-cargo/",
              ],
            }),
          }}
        />
        <Header />
        <main>
          {children}
        </main>
        <TemplateInit />
        <Footer />
        {/* jQuery sabse pehle - beforeInteractive taaki plugins ko mil jaye */}
        <Script
          src="/assets/js/vendor/jquery-3.6.0.min.js"
          strategy="beforeInteractive"
        />

        {/* Baaki plugins - order maintain rahega */}
        <Script src="/assets/js/vendor/waypoints.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/meanmenu.js" strategy="afterInteractive" />
        <Script src="/assets/js/swiper-bundle.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/owl.carousel.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/magnific-popup.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/parallax.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/backToTop.js" strategy="afterInteractive" />
        <Script src="/assets/js/jquery-ui-slider-range.js" strategy="afterInteractive" />
        <Script src="/assets/js/nice-select.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/counterup.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/ajax-form.js" strategy="afterInteractive" />
        <Script src="/assets/js/wow.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/isotope.pkgd.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/imagesloaded.pkgd.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/rangeslider-js.min.js" strategy="afterInteractive" />

        {/* main.js sabse last - sare plugins ke baad init hota hai */}
        <Script src="/assets/js/main.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
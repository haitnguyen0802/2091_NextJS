import type { Metadata } from "next";

import "./globals.css";
import Script from 'next/script';
export const metadata: Metadata = {
  title: "Shop App",
  description: "E-commerce application",
  openGraph: {
    type: "website",
    url: "https://cfdcircle.vn",
    title: "CFD Shop - ReactJs Master Courses",
    description: "ReactJs Master Courses by CFD Circle",
    images: ["/assets/images/og-image.jpg"],
    siteName: "CFD Circle",
  },
  twitter: {
    card: "summary_large_image",
    site: "@CFDCircle",
    title: "CFD Shop - ReactJs Master Courses",
    description: "ReactJs Master Courses by CFD Circle",
    images: ["/assets/images/twitter-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/assets/css/libs.min.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />
        <link rel="stylesheet" href="/assets/css/plugins/nouislider/nouislider.css" />
        <link rel="stylesheet" href="/assets/css/plugins/magnific-popup/magnific-popup.css" />
        <link rel="stylesheet" href="/assets/css/plugins/owl-carousel/owl.carousel.css" />
      </head>
      <body>
        {children}
        <Script src="/assets/js/jquery.min.js" />
        <Script src="/assets/js/bootstrap.bundle.min.js" />
        <Script src="/assets/js/jquery.hoverIntent.min.js" />
        <Script src="/assets/js/jquery.waypoints.min.js" />
        <Script src="/assets/js/superfish.min.js" />
        <Script src="/assets/js/owl.carousel.min.js" />
        <Script src="/assets/js/bootstrap-input-spinner.js" />
        <Script src="/assets/js/jquery.plugin.min.js" />
        <Script src="/assets/js/jquery.magnific-popup.min.js" />
        <Script src="/assets/js/jquery.countdown.min.js" />
        <Script src="/assets/js/nouislider.min.js" />
        <Script src="/assets/js/wNumb.js" />
        {/* <Script src="https://cdnjs.cloudflare.com/ajax/libs/noUiSlider/15.7.1/nouislider.min.js" /> */}
        {/* <Script src="https://cdnjs.cloudflare.com/ajax/libs/wnumb/1.2.0/wNumb.min.js" /> */}
      </body>
    </html>
  )
}

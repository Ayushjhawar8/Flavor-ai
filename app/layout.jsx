// app/layout.jsx

import Script from "next/script";
import "./globals.css";
import ScrollToTop from "../components/ScrollToTop";
import SnakeCursor from "@/components/SnakeCursor";

export const metadata = {
  title: "Flavor AI",
  description: "Your multilingual food assistant powered by AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🍱</text></svg>" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* THIS LINE NOW LOADS 'Roboto' instead of 'Lora' */}
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Roboto:wght@400;500&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

        <Script
          src="https://unpkg.com/@splinetool/viewer/build/spline-viewer.js"
          strategy="afterInteractive"
          type="module"
        />
      </head>
      {/* Set the body class to 'font-sans' to apply the default font */}
      <body className="font-sans">
        <SnakeCursor />
        {children}
        <ScrollToTop></ScrollToTop>
      </body>
    </html>
  );
}
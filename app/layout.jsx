import "./globals.css";
import GoogleTranslateWrapper from '@/components/GoogleTranslateWrapper';
import {Open_Sans, Pacifico} from "next/font/google";
const kalinaFont = Open_Sans({
  subsets: ["latin"],
  weight: ["400"],
});


export const metadata = {
  title: "Flavor AI",
  description: "Your multilingual food assistant powered by AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🍱</text></svg>"/>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />

      </head>
      <body className={kalinaFont.className}>
        <GoogleTranslateWrapper />
        {children}
      </body>
    </html>
  );
}

import { Inter, Patrick_Hand } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const patrickHand = Patrick_Hand({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Flavor AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🍱</text></svg>"
        />
      </head>
      <body className={`${inter.className} ${patrickHand.className}`}>
        {children}
      </body>
    </html>
  );
}

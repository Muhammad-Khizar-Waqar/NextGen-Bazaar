import "./globals.css";
import { Providers } from "../store/provider";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GemGlow Jewels | Luxury Jewelry E-Commerce",
  description: "Discover exquisite jewelry pieces at GemGlow Jewels - your destination for luxury accessories.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}

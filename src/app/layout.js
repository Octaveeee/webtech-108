import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Aurora Art Gallery",
  description: "Art Gallery - Discover curated collections and immersive 3D exhibitions",
};

// main layout for all pages
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* preload textures */}
        <link rel="preload" as="image" href="/textures/floor.jpg" />
        <link rel="preload" as="image" href="/textures/wall.jpg" />
        <link rel="preload" as="image" href="/textures/roof.jpg" />
        <link rel="preload" as="image" href="/textures/plinth.jpg" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="min-h-screen flex flex-col bg-[#1a1b1f] text-white">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

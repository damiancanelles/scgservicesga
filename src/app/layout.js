import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import WhiteNavbar from "@/components/navbar/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "SCG Services, Atlanta, GA",
    template: "%s - SCG Services, Atlanta, GA"
  },
  description: " SCG Services, Home Repairs, Painting, Plumbing & More in Atlanta, Georgia",
  openGraph: {
    title: "SCG Services, Atlanta, GA",
    description: "SCG Services, Home Repairs, Painting, Plumbing & More in Atlanta, Georgia",
    images: [
      {
        url: "https://scgservicesga.com/large_logo.svg", // Path to your image
        width: 1200,
        height: 630,
        alt: "SCG Services Logo",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WhiteNavbar></WhiteNavbar>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}

import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Cinzel, Cormorant_Garamond, Great_Vibes } from "next/font/google";
import "./globals.css";
import siteConfig from "@/site.config";
import SecurityShield from "@/components/SecurityShield";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cinzel",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-vibes",
  display: "swap",
});

const weddingTitle = "Aarav & Ananya — The Royal Wedding Celebration | Demo Invitation";
const weddingDescription =
  "Step into a luxury royal e-invite experience for Aarav & Ananya, " +
  "celebrating timeless traditions, palace festivities, and a beautiful new beginning.";

export const metadata = {
  title: weddingTitle,
  description: weddingDescription,
  openGraph: {
    title: weddingTitle,
    description: weddingDescription,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: weddingTitle,
    description: weddingDescription,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  // Match the top of the mobile browser chrome to the imperial navy background
  themeColor: "#0B1325",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cormorant.variable} ${greatVibes.variable}`}
    >
      <body className="relative min-h-screen antialiased overflow-x-hidden">
        <SecurityShield />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
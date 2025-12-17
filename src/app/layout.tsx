import type { Metadata } from "next";
import { Geist, Geist_Mono, Pridi } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import ThemeRegistry from "@/components/common/themeRegistry/ThemeRegistry";
import ReduxProvider from "@/components/common/ReduxProvider";
import { AlertProvider } from "@/components/alert";
import { ThemeProvider } from "@/contexts/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const pridi = Pridi({
  variable: "--font-pridi",
  subsets: ["latin"],
  weight: "300",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const pslKittithada = localFont({
  src: [
    {
      path: "../assets/fonts/psl-kittithada-font/PSL096pro.otf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-psl-kittithada",
});

export const metadata: Metadata = {
  title: {
    default: "วางเงินประกันต่อเติมบ้าน",
    template: "%s | วางเงินประกันต่อเติมบ้าน",
  },
  description: "ระบบวางเงินประกันต่อเติมบ้าน",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pridi.variable} ${pslKittithada.variable} antialiased`}
      >
        <ReduxProvider>
          <ThemeProvider>
            <ThemeRegistry>
              <AlertProvider>{children}</AlertProvider>
            </ThemeRegistry>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

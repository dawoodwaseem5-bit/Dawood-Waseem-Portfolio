import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "./components/theme-provider";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import ChatWidget from "./components/chat-widget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Dawood Waseem — Full Stack Developer",
  description:
    "Portfolio of Dawood Waseem, a full stack developer building web and mobile applications.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <div className="min-h-screen bg-white font-geist text-slate-900 transition-colors duration-300 dark:bg-neutral-950 dark:text-neutral-100">
            <Navbar />
            {children}
            <Footer />
            <ChatWidget />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

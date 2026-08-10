import "./globals.css";
import Link from "next/link";
import { Inter } from "next/font/google";
import ChatWidget from "./components/ChatWidget";

const inter = Inter({ subsets: ["latin"] });

export const metadata = { title: "Teddy Mbayaki — Frontend & AI Developer" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-white text-slate-900`}>
        <nav className="flex gap-6 px-6 py-4 border-b border-slate-200">
          <Link href="/" className="text-slate-900 hover:text-blue-700 font-medium">Home</Link>
          <Link href="/case-studies" className="text-slate-900 hover:text-blue-700">Work</Link>
          <Link href="/about" className="text-slate-900 hover:text-blue-700">About</Link>
          <Link href="/contact" className="text-slate-900 hover:text-blue-700">Contact</Link>
        </nav>
        <main>{children}</main>
        <ChatWidget />
      </body>
    </html>
  );
}
import { Inter } from "next/font/google";
import "./globals.css";
import ClientProvider from "@/components/ClientProvider/ClientProvider";
import { AuthProvider } from '@/context/AuthContext'; // Import the context provider
const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "react-hot-toast";
import Script from 'next/script'; 
import { Analytics } from "@vercel/analytics/react"
export const metadata = {
  title: "SUZAN",
  description: "Soochan For Gen-Z",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
      <AuthProvider>
        <ClientProvider>
          {children}
          <Toaster/>
          <Analytics/>
        </ClientProvider>
      </AuthProvider>
      <Script src="https://apis.google.com/js/api.js" strategy="beforeInteractive" />
       <Script src="https://apis.google.com/js/platform.js" strategy="beforeInteractive" />

      </body>
    </html>
  );
}

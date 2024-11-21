'use client'; // Add this line to indicate the component is a Client Component

import { Inter } from "next/font/google";
import "./globals.css";
import ClientProvider from "@/components/ClientProvider/ClientProvider";
import { AuthProvider } from "@/context/AuthContext"; // Import the context provider
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next"; // Import SpeedInsights
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { StyledEngineProvider } from "@mui/material/styles"; // Style registry wrapper for MUI
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

// Create Emotion Cache
const muiCache = createCache({
  key: "mui",
  prepend: true, // Ensures MUI styles load first
});

const inter = Inter({ subsets: ["latin"] });

const theme = createTheme({
  palette: {
    mode: "light", // Adjust based on your theme requirements
  },
});

// export const metadata = {
//   title: "SUZAN",
//   description: "Soochan For Gen-Z",
// };

export default function RootLayout({ children }) {
  console.log = () => {}; 
  return (
    <html lang="en" suppressHydrationWarning>
      <CacheProvider value={muiCache}>
        <StyledEngineProvider injectFirst> {/* MUI Style Registry */}
          <ThemeProvider theme={theme}>
            <CssBaseline /> {/* Material-UI CSS baseline */}
            <body className={inter.className} suppressHydrationWarning>
              <AuthProvider>
                <ClientProvider>
                  {children}
                  <Toaster />
                  <Analytics debug={false} />
                  <SpeedInsights /> {/* SpeedInsights Integration */}
                </ClientProvider>
              </AuthProvider>
            </body>
          </ThemeProvider>
        </StyledEngineProvider>
        <Script src="https://apis.google.com/js/api.js" strategy="beforeInteractive" />
        <Script src="https://apis.google.com/js/platform.js" strategy="beforeInteractive" />
      </CacheProvider>
    </html>
  );
}

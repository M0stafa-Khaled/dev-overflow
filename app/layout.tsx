import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/context/Theme";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "sonner";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "DevFlow",
  description: "A better version of StackOverflow for developers.",
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body
        className={`${inter.className} ${spaceGrotesk.variable} antialiased`}
      >
        <SessionProvider session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>

          <Toaster
            position="top-right"
            toastOptions={{
              closeButton: true,
            }}
            richColors
            icons={{
              success: <CheckCircle2 className="h-5 w-5" />,
              error: <X className="h-5 w-5" />,
              warning: <AlertCircle className="h-5 w-5" />,
              info: <Info className="h-5 w-5" />,
            }}
          />
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;

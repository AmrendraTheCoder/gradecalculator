import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  ClerkLoaded,
  ClerkLoading,
} from '@clerk/nextjs'
import { white } from '@clerk/themes'

// components
import Header from "../components/Header";
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrainsMono",
});

export const metadata = {
  title: "Learning-Project",
  description: "AuthViaClerk : Amrendra",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{ baseTheme: white }}>
      <html lang="en">
        <body
          className={jetbrainsMono.variable}
        >
          <ClerkLoading>
            <div className="flex items-center justify-center h-screen text-2xl">Loading...</div>
          </ClerkLoading>
          <ClerkLoaded>
            <Header />
              {children}
          </ClerkLoaded>
        </body>
      </html>
    </ClerkProvider>
  );
}

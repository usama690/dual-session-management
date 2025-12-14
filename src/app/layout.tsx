import type { Metadata } from "next";
import { SessionProvider } from "@/components/SessionProvider";
import UserSync from "@/components/UserSync";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dual Session Management",
  description: "Next.js application with dual session authentication using NextAuth.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <UserSync />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}

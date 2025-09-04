import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "./providers/AuthProvider";

export const metadata: Metadata = { title: "Template", description: "Public + Protected" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body><AuthProvider>{children}</AuthProvider></body>
    </html>
  );
}
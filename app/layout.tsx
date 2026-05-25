import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gafferly Prototype | You're the gaffer",
  description: "Prototype enquiry-to-deposit workflow for small trade businesses.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB">
      <body>{children}</body>
    </html>
  );
}

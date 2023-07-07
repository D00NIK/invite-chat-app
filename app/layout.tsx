import Navbar from "./Navbar";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "appCHAT",
  description: "A chat app where you can create chat groups and invite anyone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + " pt-12"}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

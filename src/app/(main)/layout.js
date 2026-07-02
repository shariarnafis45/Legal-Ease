import { Syne, Poppins } from "next/font/google";
import "@/app/globals.css";
import Navbar from "../components/shared/NavBar";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "LegalEase",
  description: "Your Legal Partner",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${poppins.variable}`}>
        <Navbar/>
        <main>{children}</main>
      </body>
    </html>
  );
}

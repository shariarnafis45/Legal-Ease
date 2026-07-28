import { Syne, Poppins } from "next/font/google";
import "@/app/globals.css";
import Navbar from "../components/shared/NavBar";
import { ThemeProvider } from "next-themes";
import Footer from "../components/shared/Footer";
import { Toaster } from "react-hot-toast";

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${syne.variable} ${poppins.variable} bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}

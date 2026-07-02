import { Syne, Poppins } from "next/font/google";
import "@/app/globals.css";
import Navbar from "../components/shared/NavBar";
import { ThemeProvider } from "next-themes";

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
    <html lang="en" class="light" data-theme="light">
      <body
        className={`${syne.variable} ${poppins.variable} bg-background text-foreground`}
      >
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}

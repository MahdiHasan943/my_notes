import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import toast, { Toaster } from "react-hot-toast";

const poppings = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});
export const metadata = {
  title: "My notes",
  description: "My exams note in 2024",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppings.className} max-w-[1200px] mx-auto scroll-smooth min-h-screen shadow-sm bg-white`}
      >
        <Header />
        {children}
        <Toaster />

        <Footer />
      </body>
    </html>
  );
}

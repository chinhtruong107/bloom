import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import ChatBox from "@/components/layout/ChatBox";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bloom - Kính Mắt Cao Cấp & Gọng Kính Chuyên Nghiệp",
  description:
    "Khám phá bộ sưu tập kính mắt, gọng kính, tròng kính cao cấp từ các thương hiệu hàng đầu. Chất lượng tuyệt vời, kiểu dáng hiện đại, giá cạnh tranh. Giao hàng nhanh & hỗ trợ sau bán hàng tuyệt vời!",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className}  antialiased flex flex-col min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <AuthProvider>
            <FavoritesProvider>
              <CartProvider>
                <Header />
                <main className="flex-grow">{children}</main>
                <Footer />
                <ChatBox />
              </CartProvider>
            </FavoritesProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

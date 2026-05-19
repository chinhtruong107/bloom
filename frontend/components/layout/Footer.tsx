"use client";

import {
  ArrowRight,
  Facebook,
  Github,
  Heart,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log("Newsletter subscription:", email);
      setEmail("");
    }
  };

  const footerSections = [
    {
      title: "Cửa hàng",
      links: [
        { href: "/shop", label: "Tất cả sản phẩm" },
        { href: "/shop", label: "Hàng mới về" },
        { href: "/shop", label: "Khuyến mãi" },
        { href: "/shop", label: "Nổi bật" },
      ],
    },
    {
      title: "Chăm sóc khách hàng",
      links: [
        { href: "/contact", label: "Liên hệ" },
        { href: "/", label: "Trung tâm trợ giúp" },
        { href: "/", label: "Thông tin giao hàng" },
        { href: "/", label: "Đổi trả" },
      ],
    },
    {
      title: "Công ty",
      links: [
        { href: "/about", label: "Về chúng tôi" },
        { href: "/", label: "Tuyển dụng" },
        { href: "/", label: "Blog" },
        { href: "/", label: "Báo chí" },
      ],
    },
    {
      title: "Pháp lý",
      links: [
        { href: "/", label: "Chính sách bảo mật" },
        { href: "/", label: "Điều khoản & Điều kiện" },
        { href: "/", label: "Chính sách Cookie" },
        { href: "/", label: "Trợ năng" },
      ],
    },
  ];

  const socialLinks = [
    { href: "#", icon: Facebook, label: "Facebook" },
    { href: "#", icon: Twitter, label: "Twitter" },
    { href: "#", icon: Instagram, label: "Instagram" },
    { href: "#", icon: Github, label: "GitHub" },
  ];

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 border-b border-border">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Nhận thông báo mới nhất
            </h3>
            <p className="text-muted-foreground mb-6">
              Đăng ký nhận bản tin của chúng tôi để nhận các ưu đãi độc quyền, hàng mới về và cảm hứng phong cách.
            </p>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex max-w-md mx-auto gap-2"
            >
              <Input
                type="email"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                required
              />
              <Button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <ArrowRight className="h-4 w-4" />
                <span className="sr-only">Đăng ký</span>
              </Button>
            </form>
          </div>
        </div>

        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            <div className="lg:col-span-2">
              <Link
                className="text-2xl tracking-tight text-gray-900 hover:text-gray-700 transition-colors"
                href="/"
                aria-label="BloomShop Home"
              >
                BLOOM<span className="text-primary">SHOP</span>
              </Link>
              <p className="text-muted-foreground mb-6 max-w-sm">
                Khám phá những sản phẩm độc đáo truyền cảm hứng cho phong cách sống của bạn. Sự khéo léo chất lượng kết hợp thiết kế hiện đại.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>123 Phố Thời Trang, Thành phố Phong cách, SC 12345</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>hello@bloomshop.com</span>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                {socialLinks.map(({ href, icon: Icon, label }) => (
                  <Button
                    key={label}
                    variant="ghost"
                    size="icon"
                    asChild
                    className="h-10 w-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Link href={href} aria-label={label}>
                      <Icon className="h-4 w-4" />
                    </Link>
                  </Button>
                ))}
              </div>
            </div>

            {footerSections.map((section, index) => (
              <div
                key={section.title}
                className={`${index >= 2 ? "lg:col-span-1" : ""}`}
              >
                <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-8" />

        <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>© 2025 BloomShop™. Được tạo bằng</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>Bảo lưu mọi quyền.</span>
              <br />
            </div>
            <p className="text-sm text-muted-foreground">Được phát triển bởi <a href="https://www.facebook.com/chinh.truong.100705" target="_blank" rel="noopener noreferrer" className="font-bold hover:text-primary transition-colors">Chính Trương</a> • Phân phối bởi <a href="https://www.facebook.com/chinh.truong.100705" target="_blank" rel="noopener noreferrer" className="font-bold hover:text-primary transition-colors">Chinh-Truong-Tech</a></p>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <Link
              href="/privacy"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Bảo mật
            </Link>
            <Link
              href="/terms"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Điều khoản
            </Link>
            <Link
              href="/cookies"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Cookie
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

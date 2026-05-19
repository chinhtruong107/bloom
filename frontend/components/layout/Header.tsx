"use client";

import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Menu, Search, ShoppingCart, X, Sun, Moon, LogOut, User as UserIcon } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import products from "@/data/products.json";
import type { Product } from "@/types/product";

export default function Header() {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const cartCount =
    cart?.reduce((total, item) => total + item.quantity, 0) || 0;
  const { theme, resolvedTheme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? resolvedTheme ?? "light" : theme;
  const [mounted, setMounted] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const categorySuggestions = useMemo(() => {
    if (!normalizedQuery) return [];
    const categories = Array.from(
      new Set(
        (products as Product[])
          .map((product) => product.category)
          .filter(Boolean)
      )
    ) as string[];
    return categories
      .filter((category) => category.toLowerCase().includes(normalizedQuery))
      .slice(0, 3);
  }, [normalizedQuery]);

  const productSuggestions = useMemo(() => {
    if (!normalizedQuery) return [];
    return (products as Product[])
      .filter((product) =>
        product.name.toLowerCase().includes(normalizedQuery) ||
        (product.description?.toLowerCase().includes(normalizedQuery) ?? false)
      )
      .slice(0, 4);
  }, [normalizedQuery]);

  const hasSearchSuggestions =
    normalizedQuery.length > 0 && (categorySuggestions.length > 0 || productSuggestions.length > 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setIsMobileOpen(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileOpen(false);
  }, []);

  const isActivePath = (path: string) => pathname === path;

  const navItems = [
    { href: "/category/mat-kinh", label: "Mắt kính" },
    { href: "/category/gong-kinh", label: "Gọng kính" },
    { href: "/category/phu-kien", label: "Phụ kiện" },
    { href: "/contact", label: "Liên hệ" }
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-lg"
        : "bg-background/80 backdrop-blur-md border-b border-border shadow-sm"
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8 lg:space-x-12">
            <Link
              className="text-2xl tracking-tight text-foreground hover:text-muted-foreground transition-colors"
              href="/"
              aria-label="BloomShop Home"
            >
              BLOOM<span className="text-primary">SHOP</span>
            </Link>

            <nav
              className="hidden md:flex items-center space-x-1"
              role="navigation"
              aria-label="Main navigation"
            >
              {navItems.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`relative py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${isActivePath(href)
                    ? "bg-primary/10 text-primary shadow-md"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  aria-current={isActivePath(href) ? "page" : undefined}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <form className="relative w-full" onSubmit={handleSearch}>
              <input
                type="search"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                aria-label="Tìm kiếm sản phẩm"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />

              {hasSearchSuggestions && (
                <div className="absolute left-0 right-0 top-full mt-2 rounded-3xl border border-border bg-card shadow-lg z-50 overflow-hidden">
                  <div className="p-4 space-y-4">
                    {categorySuggestions.length > 0 && (
                      <div>
                        <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground mb-3">
                          Có phải bạn muốn tìm
                        </div>
                        <div className="grid gap-2 sm:grid-cols-2">
                          {categorySuggestions.map((category) => (
                            <Link
                              key={category}
                              href={`/search?q=${encodeURIComponent(category)}`}
                              onClick={() => {
                                setSearchQuery("");
                                setIsSearchOpen(false);
                                setIsMobileOpen(false);
                              }}
                              className="block rounded-2xl border border-border/70 px-4 py-3 text-sm text-foreground hover:bg-muted/50 transition"
                            >
                              {category}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {productSuggestions.length > 0 && (
                      <div>
                        <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground mb-3">
                          Sản phẩm gợi ý
                        </div>
                        <div className="space-y-2">
                          {productSuggestions.map((product) => (
                            <Link
                              key={product.id}
                              href={`/product/${product.id}`}
                              onClick={() => {
                                setSearchQuery("");
                                setIsSearchOpen(false);
                                setIsMobileOpen(false);
                              }}
                              className="flex items-center justify-between rounded-2xl border border-border/70 px-4 py-3 hover:bg-muted/50 transition"
                            >
                              <div>
                                <p className="text-sm font-semibold text-foreground">
                                  {product.name}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {product.category}
                                </p>
                              </div>
                              <span className="text-sm font-semibold text-primary">
                                {product.price.toLocaleString("vi-VN")} ₫
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </form>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5 text-gray-700" />
            </button>

            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileOpen}
            >
              {isMobileOpen ? (
                <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              )}
            </button>

            {mounted && (
              <button
                onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
              >
                {currentTheme === "dark" ? (
                  <Sun className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                )}
              </button>
            )}

            <Link
              href="/cart"
              className="relative p-2 rounded-full hover:bg-gray-100 transition-all duration-200 group"
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <ShoppingCart className="h-6 w-6 text-gray-700 group-hover:text-gray-900 transition-colors" />
              {cartCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1"
                  aria-label={`${cartCount} items in cart`}
                >
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            <div className="hidden sm:flex items-center space-x-2">
              {user ? (
                <div className="flex items-center gap-3 bg-accent/50 py-1.5 px-3 rounded-full border border-border/50">
                  <Link href="/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    {user.avatar ? (
                      <img src={user.avatar} alt="Avatar" className="w-6 h-6 rounded-full bg-background" />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                        <UserIcon className="w-3 h-3 text-primary" />
                      </div>
                    )}
                    <span className="text-sm font-medium text-foreground">{user.name}</span>
                  </Link>
                  <button
                    onClick={logout}
                    className="p-1 hover:bg-destructive/10 text-muted-foreground hover:text-destructive rounded-full transition-colors"
                    title="Đăng xuất"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost" size="sm" className="text-sm">
                      Đăng nhập
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button size="sm" variant="default" className="text-sm">
                      Đăng ký
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {isSearchOpen && (
          <div className="lg:hidden mt-4 animate-in slide-in-from-top duration-200">
            <form className="relative" onSubmit={handleSearch}>
              <input
                type="search"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                aria-label="Tìm kiếm sản phẩm"
                autoFocus
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />

              {hasSearchSuggestions && (
                <div className="mt-3 rounded-3xl border border-border bg-card shadow-lg overflow-hidden">
                  <div className="p-4 space-y-4">
                    {categorySuggestions.length > 0 && (
                      <div>
                        <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground mb-3">
                          Có phải bạn muốn tìm
                        </div>
                        <div className="grid gap-2">
                          {categorySuggestions.map((category) => (
                            <Link
                              key={category}
                              href={`/search?q=${encodeURIComponent(category)}`}
                              onClick={() => {
                                setSearchQuery("");
                                setIsSearchOpen(false);
                                setIsMobileOpen(false);
                              }}
                              className="block rounded-2xl border border-border/70 px-4 py-3 text-sm text-foreground hover:bg-muted/50 transition"
                            >
                              {category}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {productSuggestions.length > 0 && (
                      <div>
                        <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground mb-3">
                          Sản phẩm gợi ý
                        </div>
                        <div className="space-y-2">
                          {productSuggestions.map((product) => (
                            <Link
                              key={product.id}
                              href={`/product/${product.id}`}
                              onClick={() => {
                                setSearchQuery("");
                                setIsSearchOpen(false);
                                setIsMobileOpen(false);
                              }}
                              className="flex items-center justify-between rounded-2xl border border-border/70 px-4 py-3 hover:bg-muted/50 transition"
                            >
                              <div>
                                <p className="text-sm font-semibold text-foreground">
                                  {product.name}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {product.category}
                                </p>
                              </div>
                              <span className="text-sm font-semibold text-primary">
                                {product.price.toLocaleString("vi-VN")} ₫
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </form>
          </div>
        )}

        {isMobileOpen && (
          <nav
            className="md:hidden mt-4 animate-in slide-in-from-top duration-200"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col space-y-3 pb-4 border-b border-gray-200">
              {navItems.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={closeMobileMenu}
                  className={`text-sm font-medium py-2 px-3 rounded-lg transition-all ${isActivePath(href)
                    ? "bg-orange-100"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  aria-current={isActivePath(href) ? "page" : undefined}
                >
                  {label}
                </Link>
              ))}
            </div>

            <div className="flex flex-col space-y-3 pt-4 sm:hidden">
              {user ? (
                <div className="flex flex-col gap-3">
                  <Link href="/profile" onClick={closeMobileMenu} className="flex items-center gap-3 px-3 py-2 bg-accent/50 rounded-lg hover:bg-accent/70 transition-colors">
                    {user.avatar ? (
                      <img src={user.avatar} alt="Avatar" className="w-8 h-8 rounded-full bg-background" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <UserIcon className="w-4 h-4 text-primary" />
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{user.name}</span>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                  </Link>
                  <Button variant="outline" className="w-full text-sm text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => { logout(); closeMobileMenu(); }}>
                    <LogOut className="w-4 h-4 mr-2" /> Đăng xuất
                  </Button>
                </div>
              ) : (
                <>
                  <Button variant="outline" className="w-full text-sm" asChild>
                    <Link href="/login" onClick={closeMobileMenu}>
                      Đăng nhập
                    </Link>
                  </Button>
                  <Button className="w-full text-sm" variant="default" asChild>
                    <Link href="/register" onClick={closeMobileMenu}>
                      Đăng ký
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

import Hero from "@/components/home/Hero";
import MarqueeTicker from "@/components/home/MarqueeTicker";
import ProductList from "@/components/home/ProductList";
import FadeIn from "@/components/ui/FadeIn";
import productsData from "@/data/products.json";
import Link from "next/link";

export default function Home() {
  const bestSellers = productsData.filter(p => p.isBestSeller).slice(0, 4);
  const lenses = productsData.filter(p => p.category === "Mắt kính").slice(0, 4);
  const frames = productsData.filter(p => p.category === "Gọng kính").slice(0, 4);
  const accessories = productsData.filter(p => p.category === "Phụ kiện").slice(0, 4);

  return (
    <div className="bg-background px-4 pt-4 pb-8 sm:pt-6 sm:pb-12 lg:pt-8 lg:pb-16 lg:px-8 min-h-screen">
      <Hero />
      <MarqueeTicker />

      <div className="space-y-12 mt-4">
        <FadeIn direction="up" delay={0.1}>
          <ProductList id="ban-chay" title="Sản Phẩm Bán Chạy Nhất" products={bestSellers} />
        </FadeIn>

        <FadeIn direction="up" delay={0.2}>
          <ProductList id="gong-kinh" title="Bộ Sưu Tập Gọng Kính" products={frames} viewMoreLink="/category/gong-kinh" />
        </FadeIn>

        <FadeIn direction="up" delay={0.3}>
          <ProductList id="mat-kinh" title="Tròng Kính Chất Lượng" products={lenses} viewMoreLink="/category/mat-kinh" />
        </FadeIn>

        <FadeIn direction="up" delay={0.4}>
          <ProductList id="phu-kien" title="Phụ Kiện" products={accessories} viewMoreLink="/category/phu-kien" />
        </FadeIn>
      </div>
    </div>
  );
}

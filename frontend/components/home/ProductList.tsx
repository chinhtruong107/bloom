import ProductCard from "./ProductCard";

import { Product } from "@/types/product";
import Link from "next/link";

interface ProductListProps {
  products: Product[];
  title?: string;
  id?: string;
  viewMoreLink?: string;
}

export default function ProductList({ products, title, id, viewMoreLink }: ProductListProps) {
  return (
    <div id={id} className="mb-16 scroll-mt-24 max-w-7xl mx-auto">
      {title && (
        <div className="flex flex-col sm:flex-row items-center justify-between mb-12 pb-6 border-b-2 border-gradient-to-r from-primary/30 via-primary/10 to-transparent">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="h-1 w-8 bg-gradient-to-r from-primary to-primary/50 rounded-full" />
            <h2 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/80 text-center sm:text-left">
              {title}
            </h2>
          </div>
          {viewMoreLink && (
            <Link
              href={viewMoreLink}
              className="text-primary hover:text-primary/80 font-semibold text-sm mt-6 sm:mt-0 transition-all flex items-center group px-4 py-2 rounded-full hover:bg-primary/5"
            >
              Xem thêm
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          )}
        </div>
      )}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Không tìm thấy sản phẩm nào
            </h3>
            <p className="text-muted-foreground mb-4">
              Hiện tại chưa có sản phẩm trong danh mục này
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

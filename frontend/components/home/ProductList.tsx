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
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-foreground text-center sm:text-left w-full sm:w-auto">
            {title}
          </h2>
          {viewMoreLink && (
            <Link 
              href={viewMoreLink}
              className="text-primary hover:text-primary/80 font-medium text-sm mt-4 sm:mt-0 transition-colors flex items-center group"
            >
              Xem thêm 
              <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
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

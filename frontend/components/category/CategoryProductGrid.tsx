"use client";

import { useState } from "react";
import ProductCard from "@/components/home/ProductCard";
import { Product } from "@/types/product";

interface CategoryProductGridProps {
  products: Product[];
}

export default function CategoryProductGrid({ products }: CategoryProductGridProps) {
  // Show 9 products initially (3 rows on desktop where grid-cols-3)
  const [visibleCount, setVisibleCount] = useState(9);

  const handleShowMore = () => {
    // Reveal 9 more products (3 more rows on desktop)
    setVisibleCount((prev) => prev + 9);
  };

  const visibleProducts = products.slice(0, visibleCount);
  const hasMore = visibleCount < products.length;

  return (
    <div className="flex flex-col items-center">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {hasMore && (
        <button 
          onClick={handleShowMore}
          className="mt-12 px-8 py-3 bg-background border border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-md font-medium transition-colors shadow-sm"
        >
          Xem thêm
        </button>
      )}
    </div>
  );
}

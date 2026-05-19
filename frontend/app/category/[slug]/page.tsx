import CategoryProductGrid from "@/components/category/CategoryProductGrid";
import ProductFilterSidebar from "@/components/category/ProductFilterSidebar";
import products from "@/data/products.json";
import { Product } from "@/types/product";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  const categoryMap: Record<string, string> = {
    "mat-kinh": "Mắt kính",
    "gong-kinh": "Gọng kính",
    "phu-kien": "Phụ kiện"
  };

  const categoryName = categoryMap[slug];

  if (!categoryName) {
    notFound();
  }

  const categoryProducts = (products as Product[]).filter(
    (product) => product.category === categoryName
  );

  return (
    <div className="bg-background min-h-[calc(100vh-160px)] py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="mb-8 border-b border-border pb-4 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-foreground capitalize">
              Danh mục: <span className="text-primary">{categoryName}</span>
            </h1>
            <p className="text-muted-foreground mt-2">
              Có {categoryProducts.length} sản phẩm
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4 flex-shrink-0">
            <ProductFilterSidebar />
          </div>

          {/* Product Grid or Empty State */}
          <div className="w-full lg:w-3/4">
            {categoryProducts.length > 0 ? (
              <CategoryProductGrid products={categoryProducts} />
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center bg-card rounded-xl border border-border shadow-sm">
                <div className="text-6xl mb-6">🔍</div>
                <h3 className="text-2xl font-semibold text-foreground mb-3">
                  Không tìm thấy sản phẩm nào
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Hiện tại chưa có sản phẩm nào trong danh mục {categoryName}.
                </p>
                <Link href="/" className="mt-6 px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                  Trở về trang chủ
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

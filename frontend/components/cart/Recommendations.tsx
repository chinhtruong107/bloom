import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Recommendations() {
  return (
    <div className="mt-16">
      <Card>
        <CardHeader>
          <CardTitle>Có thể bạn sẽ thích</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              Khám phá thêm các sản phẩm phù hợp với phong cách của bạn
            </p>
            <Button variant="outline" asChild>
              <Link href="/">Xem sản phẩm</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

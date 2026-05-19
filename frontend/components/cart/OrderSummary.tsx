"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatVND } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { CreditCard, Heart, Shield, Truck, Tag } from "lucide-react";
import Link from "next/link";

export default function OrderSummary() {
  const { cart } = useCart();
  const { user } = useAuth();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 500000 ? 0 : 30000;
  const tax = subtotal * 0.08;
  const discount = user ? subtotal * 0.05 : 0;
  const total = subtotal + shipping + tax - discount;
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Tóm tắt đơn hàng</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              Tạm tính ({itemCount} sản phẩm)
            </span>
            <span className="font-medium">{formatVND(subtotal)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Vận chuyển</span>
            <span className="font-medium">
              {shipping === 0 ? (
                <Badge variant="secondary" className="text-xs">
                  Miễn phí
                </Badge>
              ) : (
                formatVND(shipping)
              )}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Thuế</span>
            <span className="font-medium">{formatVND(tax)}</span>
          </div>

          {user ? (
            <div className="flex justify-between text-sm font-medium text-green-600 bg-green-50 p-2 rounded-md">
              <span className="flex items-center gap-1.5"><Tag className="w-3.5 h-3.5" /> Thành viên (Giảm 5%)</span>
              <span>-{formatVND(discount)}</span>
            </div>
          ) : (
            <div className="text-xs text-muted-foreground bg-accent/50 p-2 rounded-md flex items-start gap-2">
              <Tag className="w-3.5 h-3.5 mt-0.5 text-primary flex-shrink-0" />
              <span>Đăng nhập ngay để được <strong className="text-primary">giảm 5%</strong> tổng đơn hàng!</span>
            </div>
          )}

          <Separator />

          <div className="flex justify-between">
            <span className="text-lg font-semibold">Tổng cộng</span>
            <span className="text-xl font-bold text-primary">
              {formatVND(total)}
            </span>
          </div>
        </div>

        {shipping > 0 && (
          <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
            <div className="flex items-center gap-2 mb-2">
              <Truck className="h-4 w-4 text-accent-foreground" />
              <span className="text-sm font-medium text-accent-foreground">
                Miễn phí vận chuyển cho đơn hàng trên {formatVND(500000)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Thêm {formatVND(Math.max(0, 500000 - subtotal))} nữa để nhận ưu đãi!
            </p>
          </div>
        )}

        <Button
          size="lg"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          asChild
        >
          <Link href="/checkout" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Tiến hành thanh toán
          </Link>
        </Button>

        <div className="space-y-3 pt-4 border-t border-border">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Shield className="h-4 w-4 text-green-500" />
            <span>Thanh toán SSL an toàn</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Truck className="h-4 w-4 text-blue-500" />
            <span>Đổi trả miễn phí trong 30 ngày</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Heart className="h-4 w-4 text-red-500" />
            <span>Hỗ trợ khách hàng 24/7</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

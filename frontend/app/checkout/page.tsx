"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { formatVND } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Check, CreditCard, ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [isDifferentRecipient, setIsDifferentRecipient] = useState(false);
  const [recipientData, setRecipientData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  // Pre-fill user data if logged in
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      }));
    }
  }, [user]);

  // If cart is empty and not success, redirect back to cart
  useEffect(() => {
    if (cart.length === 0 && !isSuccess) {
      router.push("/cart");
    }
  }, [cart, isSuccess, router]);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 500000 ? 0 : 30000;
  const tax = subtotal * 0.08;
  const discount = user ? subtotal * 0.05 : 0; // 5% discount for members
  const total = subtotal + shipping + tax - discount;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRecipientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRecipientData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API request
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
    clearCart();

    // Redirect after showing success for a bit
    setTimeout(() => {
      router.push("/");
    }, 4000);
  };

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-24 min-h-[calc(100vh-160px)] flex items-center justify-center">
        <Card className="max-w-md w-full text-center p-8 border-primary/20 shadow-xl bg-gradient-to-b from-background to-primary/5 animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">Đặt hàng thành công!</h2>
          <p className="text-muted-foreground mb-8">
            Cảm ơn bạn đã mua sắm tại BloomShop. Đơn hàng của bạn đang được xử lý và sẽ sớm được giao. Hệ thống sẽ tự động quay về trang chủ.
          </p>
          <Button asChild className="w-full">
            <Link href="/">Tiếp tục mua sắm ngay</Link>
          </Button>
        </Card>
      </div>
    );
  }

  if (cart.length === 0) return null; // Avoid flashing empty cart before redirect

  return (
    <div className="container mx-auto px-4 py-10 min-h-[calc(100vh-160px)]">
      <div className="mb-8">
        <Button variant="ghost" asChild className="text-muted-foreground hover:text-foreground pl-0">
          <Link href="/cart" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Quay lại giỏ hàng
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-foreground mt-4">Thanh Toán</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cột trái: Form */}
        <div className="w-full lg:w-3/5">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Thông tin giao hàng</CardTitle>
            </CardHeader>
            <CardContent>
              {!user && (
                <div className="bg-muted/50 p-4 rounded-lg mb-6 flex justify-between items-center border border-border">
                  <div>
                    <p className="font-medium text-foreground">Bạn đã có tài khoản?</p>
                    <p className="text-sm text-muted-foreground">Đăng nhập để nhận ưu đãi giảm 5%</p>
                  </div>
                  <Button variant="outline" asChild size="sm">
                    <Link href="/login">Đăng nhập ngay</Link>
                  </Button>
                </div>
              )}

              <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Họ và Tên</label>
                    <Input required name="name" value={formData.name} onChange={handleInputChange} placeholder="Nguyễn Văn A" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Số điện thoại</label>
                    <Input required name="phone" value={formData.phone} onChange={handleInputChange} placeholder="0901234567" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <Input required type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="nguyenvana@example.com" />
                </div>

                {!isDifferentRecipient && (
                  <div className="space-y-2 animate-in fade-in duration-200">
                    <label className="text-sm font-medium text-foreground">Địa chỉ cá nhân</label>
                    <Input required={!isDifferentRecipient} name="address" value={formData.address} onChange={handleInputChange} placeholder="Số nhà, Tên đường, Phường/Xã, Quận/Huyện, Tỉnh/TP" />
                  </div>
                )}

                <div className="pt-4 border-t border-border mt-6">
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-foreground mb-4">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                      checked={isDifferentRecipient}
                      onChange={(e) => setIsDifferentRecipient(e.target.checked)}
                    />
                    Giao hàng cho người nhận khác
                  </label>

                  {isDifferentRecipient && (
                    <div className="space-y-4 bg-muted/30 p-4 rounded-lg animate-in slide-in-from-top-2 duration-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">Tên người nhận</label>
                          <Input required={isDifferentRecipient} name="name" value={recipientData.name} onChange={handleRecipientChange} placeholder="Tên người nhận" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">SĐT người nhận</label>
                          <Input required={isDifferentRecipient} name="phone" value={recipientData.phone} onChange={handleRecipientChange} placeholder="Số điện thoại" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Địa chỉ giao hàng</label>
                        <Input required={isDifferentRecipient} name="address" value={recipientData.address} onChange={handleRecipientChange} placeholder="Địa chỉ người nhận" />
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Cột phải: Tổng kết đơn hàng */}
        <div className="w-full lg:w-2/5">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" /> Tóm tắt đơn hàng
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Danh sách SP */}
              <div className="max-h-60 overflow-y-auto space-y-4 pr-2 scrollbar-thin">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0 border border-border">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-foreground truncate">{item.name}</h4>
                      <p className="text-xs text-muted-foreground">SL: {item.quantity}</p>
                    </div>
                    <div className="font-medium text-sm text-foreground">
                      {formatVND(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tạm tính</span>
                  <span className="font-medium text-foreground">{formatVND(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Phí vận chuyển</span>
                  <span className="font-medium text-foreground">{shipping === 0 ? "Miễn phí" : formatVND(shipping)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Thuế (8%)</span>
                  <span className="font-medium text-foreground">{formatVND(tax)}</span>
                </div>

                {user && (
                  <div className="flex justify-between text-sm font-medium text-green-700 bg-green-100 p-3 rounded-lg border border-green-200 shadow-sm animate-in fade-in slide-in-from-left-2 duration-300">
                    <span className="flex items-center gap-1.5"><Check className="w-4 h-4" /> Ưu đãi thành viên (Giảm 5%)</span>
                    <span>-{formatVND(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between pt-4 border-t border-border items-center">
                  <span className="text-lg font-bold text-foreground">Tổng cộng</span>
                  <span className="text-2xl font-bold text-primary">{formatVND(total)}</span>
                </div>
              </div>

              <Button
                type="submit"
                form="checkout-form"
                disabled={isSubmitting}
                className="w-full py-6 text-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-md hover:shadow-lg"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Đang xử lý thanh toán...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" /> Xác nhận đặt hàng
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useAuth } from "@/context/AuthContext";
import { useFavorites } from "@/context/FavoritesContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProductCard from "@/components/home/ProductCard";
import { Package, Heart, Clock, CheckCircle, UserCircle, Save } from "lucide-react";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const MOCK_ORDERS = [
  { id: "DH84920", date: "19/05/2026", total: 1250000, status: "Đang giao", items: 2 },
  { id: "DH84815", date: "10/04/2026", total: 850000, status: "Đã giao", items: 1 },
  { id: "DH84702", date: "02/03/2026", total: 2100000, status: "Đã giao", items: 3 },
];

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const { favorites } = useFavorites();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"info" | "orders" | "favorites">("info");
  const [orderFilter, setOrderFilter] = useState<"Tất cả" | "Đang giao" | "Đã giao">("Tất cả");
  const [isMounted, setIsMounted] = useState(false);
  const [infoForm, setInfoForm] = useState({ phone: "", address: "" });

  useEffect(() => {
    if (user) {
      setInfoForm({ phone: user.phone || "", address: user.address || "" });
    }
  }, [user]);

  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(infoForm);
    alert("Cập nhật thông tin thành công!");
  };

  const filteredOrders = MOCK_ORDERS.filter(o => orderFilter === "Tất cả" || o.status === orderFilter);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Use a separate effect for redirection to avoid hydration mismatch
  useEffect(() => {
    if (isMounted && !user) {
      router.push("/login");
    }
  }, [user, router, isMounted]);

  if (!isMounted || !user) return null;

  return (
    <div className="container mx-auto px-4 py-12 min-h-[calc(100vh-160px)]">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="w-full md:w-1/4">
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm sticky top-24">
            <div className="flex flex-col items-center text-center pb-6 border-b border-border">
              {user.avatar ? (
                <img src={user.avatar} alt="Avatar" className="w-24 h-24 rounded-full bg-accent mb-4 shadow-md" />
              ) : (
                <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <span className="text-3xl font-bold text-primary">{user.name.charAt(0)}</span>
                </div>
              )}
              <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            
            <div className="flex flex-col gap-2 mt-6">
              <button 
                onClick={() => setActiveTab("info")}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === "info" ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:bg-accent hover:text-foreground"}`}
              >
                <UserCircle className="w-5 h-5" />
                Thông tin cá nhân
              </button>
              <button 
                onClick={() => setActiveTab("orders")}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === "orders" ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:bg-accent hover:text-foreground"}`}
              >
                <Package className="w-5 h-5" />
                Đơn hàng của tôi
              </button>
              <button 
                onClick={() => setActiveTab("favorites")}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === "favorites" ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:bg-accent hover:text-foreground"}`}
              >
                <Heart className="w-5 h-5" />
                Sản phẩm yêu thích
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="w-full md:w-3/4">
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm min-h-[500px]">
            
            {activeTab === "info" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                <h3 className="text-2xl font-bold text-foreground mb-6">Thông Tin Cá Nhân</h3>
                <form onSubmit={handleSaveInfo} className="space-y-4 max-w-lg">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Họ và tên</label>
                    <Input disabled value={user.name} className="bg-muted" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Email</label>
                    <Input disabled value={user.email} className="bg-muted" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Số điện thoại</label>
                    <Input 
                      placeholder="Nhập số điện thoại" 
                      value={infoForm.phone} 
                      onChange={(e) => setInfoForm({...infoForm, phone: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Địa chỉ giao hàng</label>
                    <Input 
                      placeholder="Số nhà, đường, phường/xã..." 
                      value={infoForm.address} 
                      onChange={(e) => setInfoForm({...infoForm, address: e.target.value})} 
                    />
                  </div>
                  <Button type="submit" className="mt-4">
                    <Save className="w-4 h-4 mr-2" /> Lưu thay đổi
                  </Button>
                </form>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                  <h3 className="text-2xl font-bold text-foreground">Đơn Hàng Của Tôi</h3>
                  <div className="flex bg-muted p-1 rounded-xl w-fit">
                    {["Tất cả", "Đang giao", "Đã giao"].map((status) => (
                      <button
                        key={status}
                        onClick={() => setOrderFilter(status as any)}
                        className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${orderFilter === status ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                {filteredOrders.length === 0 ? (
                  <div className="text-center py-12 bg-muted/30 rounded-2xl border border-dashed border-border">
                    <Package className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
                    <p className="text-muted-foreground">Không có đơn hàng nào.</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {filteredOrders.map((order) => (
                      <div key={order.id} className="border border-border rounded-xl p-5 hover:shadow-md transition-shadow">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-border/50">
                          <div>
                            <p className="font-semibold text-lg text-foreground">Mã đơn: {order.id}</p>
                            <p className="text-sm text-muted-foreground">Ngày đặt: {order.date} • {order.items} sản phẩm</p>
                          </div>
                          <div className={`px-3 py-1.5 rounded-full flex items-center gap-2 w-fit ${order.status === "Đang giao" ? "bg-orange-100 text-orange-700 border border-orange-200" : "bg-green-100 text-green-700 border border-green-200"}`}>
                            {order.status === "Đang giao" ? <Clock className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                            <span className="text-sm font-medium">{order.status}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Tổng tiền:</span>
                          <span className="text-xl font-bold text-primary">{order.total.toLocaleString("vi-VN")}đ</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "favorites" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                <h3 className="text-2xl font-bold text-foreground mb-6">Sản Phẩm Yêu Thích</h3>
                {favorites.length === 0 ? (
                  <div className="text-center py-12 bg-muted/30 rounded-2xl border border-dashed border-border">
                    <Heart className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
                    <p className="text-muted-foreground">Bạn chưa có sản phẩm yêu thích nào.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
        
      </div>
    </div>
  );
}

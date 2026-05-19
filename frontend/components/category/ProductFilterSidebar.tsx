"use client";

import { useState } from "react";
import { Filter, ChevronDown, ChevronUp, Check } from "lucide-react";

const PRICES = ["Dưới 500.000đ", "500.000đ - 1.000.000đ", "1.000.000đ - 2.000.000đ", "Trên 2.000.000đ"];
const COLORS = [
  { name: "Đen", class: "bg-black" },
  { name: "Trắng", class: "bg-white border border-gray-200" },
  { name: "Nâu", class: "bg-amber-800" },
  { name: "Xanh dương", class: "bg-blue-600" },
  { name: "Đỏ", class: "bg-red-500" },
  { name: "Vàng", class: "bg-yellow-400" },
];
const FEATURES = [
  "Chống tia UV (UV400)",
  "Phân cực (Polarized)",
  "Chống trầy xước",
  "Gọng dẻo (Titanium/TR90)",
  "Chống ánh sáng xanh",
  "Bản lề lò xo"
];

export default function ProductFilterSidebar() {
  // Collapse/Expand state
  const [openSections, setOpenSections] = useState({
    price: true,
    color: true,
    feature: true
  });

  // Selected filters state
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleFilter = (
    item: string, 
    selectedList: string[], 
    setFunction: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (selectedList.includes(item)) {
      setFunction(selectedList.filter(i => i !== item));
    } else {
      setFunction([...selectedList, item]);
    }
  };

  const clearFilters = () => {
    setSelectedPrices([]);
    setSelectedColors([]);
    setSelectedFeatures([]);
  };

  return (
    <div className="w-full bg-card rounded-xl border border-border p-5 shadow-sm sticky top-24">
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
        <Filter className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Bộ Lọc Sản Phẩm</h2>
      </div>

      {/* Khoảng Giá */}
      <div className="mb-6 border-b border-border pb-6">
        <div 
          className="flex items-center justify-between mb-3 cursor-pointer group"
          onClick={() => toggleSection('price')}
        >
          <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">Khoảng Giá</h3>
          {openSections.price ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
        </div>
        
        {openSections.price && (
          <div className="space-y-2.5 animate-in slide-in-from-top-2 fade-in duration-200">
            {PRICES.map((price, idx) => {
              const isSelected = selectedPrices.includes(price);
              return (
                <label key={idx} className="flex items-center gap-3 cursor-pointer group" onClick={() => toggleFilter(price, selectedPrices, setSelectedPrices)}>
                  <div className={`relative flex items-center justify-center w-4 h-4 border rounded-sm transition-colors ${isSelected ? 'border-primary bg-primary' : 'border-input group-hover:border-primary'}`}>
                    {isSelected && <Check className="w-3 h-3 text-primary-foreground absolute" />}
                  </div>
                  <span className={`text-sm transition-colors ${isSelected ? 'text-foreground font-medium' : 'text-muted-foreground group-hover:text-foreground'}`}>
                    {price}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Màu Sắc */}
      <div className="mb-6 border-b border-border pb-6">
        <div 
          className="flex items-center justify-between mb-3 cursor-pointer group"
          onClick={() => toggleSection('color')}
        >
          <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">Màu Sắc</h3>
          {openSections.color ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
        </div>
        
        {openSections.color && (
          <div className="flex flex-wrap gap-2 animate-in slide-in-from-top-2 fade-in duration-200">
            {COLORS.map((color, idx) => {
              const isSelected = selectedColors.includes(color.name);
              return (
                <button
                  key={idx}
                  onClick={() => toggleFilter(color.name, selectedColors, setSelectedColors)}
                  className={`w-8 h-8 rounded-full ${color.class} flex items-center justify-center shadow-sm hover:scale-110 transition-all ring-2 focus:outline-none ${isSelected ? 'ring-primary ring-offset-1' : 'ring-transparent hover:ring-primary/50'}`}
                  title={color.name}
                >
                  {isSelected && <Check className={`w-4 h-4 ${color.name === "Trắng" || color.name === "Vàng" ? "text-black" : "text-white"}`} />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Đặc Điểm */}
      <div className="mb-6">
        <div 
          className="flex items-center justify-between mb-3 cursor-pointer group"
          onClick={() => toggleSection('feature')}
        >
          <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">Đặc Điểm</h3>
          {openSections.feature ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
        </div>
        
        {openSections.feature && (
          <div className="space-y-2.5 animate-in slide-in-from-top-2 fade-in duration-200">
            {FEATURES.map((feature, idx) => {
              const isSelected = selectedFeatures.includes(feature);
              return (
                <label key={idx} className="flex items-center gap-3 cursor-pointer group" onClick={() => toggleFilter(feature, selectedFeatures, setSelectedFeatures)}>
                  <div className={`relative flex items-center justify-center w-4 h-4 border rounded-sm transition-colors ${isSelected ? 'border-primary bg-primary' : 'border-input group-hover:border-primary'}`}>
                    {isSelected && <Check className="w-3 h-3 text-primary-foreground absolute" />}
                  </div>
                  <span className={`text-sm transition-colors ${isSelected ? 'text-foreground font-medium' : 'text-muted-foreground group-hover:text-foreground'}`}>
                    {feature}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      <button className="w-full py-2.5 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors mt-2">
        Áp Dụng
      </button>
      <button 
        onClick={clearFilters}
        className="w-full py-2 mt-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        Xóa bộ lọc
      </button>
    </div>
  );
}

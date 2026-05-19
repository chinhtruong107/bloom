"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=2070&auto=format&fit=crop",
    badge: "Bộ Sưu Tập Mùa Mới Đã Cập Bến",
    title: "Định Hình Phong Cách,",
    highlight: "Nâng Tầm Ánh Nhìn",
    description: "Khám phá thế giới qua lăng kính thời thượng. Từ gọng kính tinh tế đến tròng kính bảo vệ tối ưu — hãy để chúng tôi giúp bạn tự tin tỏa sáng theo cách riêng biệt nhất.",
    gradient: "from-primary to-blue-400"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=2080&auto=format&fit=crop",
    badge: "Bảo Vệ Tối Ưu, Cá Tính Nổi Bật",
    title: "Kính Râm Thời Trang,",
    highlight: "Đón Nắng Rực Rỡ",
    description: "Bảo vệ đôi mắt tuyệt đối khỏi tia UV. Thể hiện chất riêng trong từng chuyến đi với bộ sưu tập kính mát cực chất của mùa hè này.",
    gradient: "from-amber-400 to-orange-500"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?q=80&w=2070&auto=format&fit=crop",
    badge: "Vật Liệu Cao Cấp",
    title: "Thiết Kế Tinh Xảo,",
    highlight: "Đẳng Cấp Vượt Trội",
    description: "Mọi chi tiết gọng kính được chế tác tỉ mỉ từ vật liệu cao cấp, mang lại sự thoải mái tuyệt đối và vẻ đẹp sang trọng bất ngờ.",
    gradient: "from-emerald-400 to-teal-500"
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  const handlePrev = () => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto mb-12 lg:mb-16 rounded-3xl overflow-hidden h-[calc(100vh-140px)] min-h-[400px] max-h-[600px] flex items-center shadow-2xl group">
      
      {/* Slides */}
      {SLIDES.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          {/* Background Image */}
          <div 
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[7000ms] ease-out ${index === currentSlide ? 'scale-105' : 'scale-100'}`}
            style={{ backgroundImage: `url('${slide.image}')` }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center z-20 w-full px-6 md:px-12 lg:px-20 py-12 md:py-0 text-white">
            <div className={`max-w-2xl transition-all duration-1000 delay-300 ${index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 text-sm font-medium text-white/90">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
                <span>{slide.badge}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6 text-balance">
                {slide.title}<br className="hidden md:block" /> 
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${slide.gradient}`}>
                  {slide.highlight}
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl text-balance leading-relaxed">
                {slide.description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="#ban-chay" 
                  onClick={(e) => handleScrollTo(e, 'ban-chay')}
                  className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full font-semibold transition-all shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] hover:-translate-y-1 cursor-pointer"
                >
                  Khám Phá Ngay
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
                
                <a 
                  href="#gong-kinh" 
                  onClick={(e) => handleScrollTo(e, 'gong-kinh')}
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-full font-semibold transition-all hover:-translate-y-1 cursor-pointer"
                >
                  Xem Gọng Kính
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Controls */}
      <div className="absolute z-30 bottom-8 right-8 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button 
          onClick={handlePrev}
          className="p-3 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white border border-white/10 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button 
          onClick={handleNext}
          className="p-3 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white border border-white/10 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute z-30 bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
              index === currentSlide ? 'w-8 bg-primary' : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

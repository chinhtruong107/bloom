import { Phone } from "lucide-react";

export default function MarqueeTicker() {
  return (
    <div className="relative w-full max-w-full bg-background border-y border-border overflow-hidden py-3 hover-pause cursor-pointer mb-8 shadow-sm sticky top-[72px] z-40">
      <div className="flex whitespace-nowrap animate-marquee min-w-full">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center space-x-16 px-8">
            <span className="text-[13px] font-bold tracking-[0.1em] text-foreground uppercase">
              KÍNH MẮT THỜI TRANG CAO CẤP
            </span>
            <span className="text-[13px] font-bold tracking-[0.1em] text-foreground flex items-center uppercase">
              ĐO KHÁM MẮT MIỄN PHÍ GỌI
              <a
                href="tel:0389794445"
                className="ml-2 flex items-center text-primary hover:text-primary/80 transition-colors"
                aria-label="Gọi 038 979 4445"
              >
                <Phone className="w-3.5 h-3.5 mr-2 fill-current" />
                038 979 4445
              </a>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

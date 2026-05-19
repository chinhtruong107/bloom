"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Share2,
  Copy,
  Check,
  Facebook,
  Loader,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface ShareProductProps {
  productId: number;
  productName: string;
  productImage?: string;
}

export default function ShareProduct({
  productId,
  productName,
  productImage,
}: ShareProductProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const shareUrl = `${baseUrl}/product/${productId}`;
  const shareText = `${productName} - Hãy xem sản phẩm tuyệt vời này từ Bloom kính mắt!`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const shareOptions = [
    {
      name: "Facebook",
      icon: Facebook,
      action: () => {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareUrl
        )}&quote=${encodeURIComponent(shareText)}`;
        window.open(facebookUrl, "_blank", "width=600,height=400");
      },
    },
    {
      name: "WhatsApp",
      icon: () => (
        <svg
          className="h-4 w-4"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.255.949c-1.238.503-2.37 1.237-3.285 2.152-1.91 1.91-2.963 4.465-2.963 7.18 0 2.713 1.054 5.269 2.963 7.18 1.915 1.909 4.465 2.963 7.18 2.963 2.713 0 5.268-1.054 7.178-2.963 1.91-1.911 2.963-4.465 2.963-7.18s-1.054-5.27-2.963-7.18c-1.91-1.915-4.465-2.963-7.178-2.963zm10.926 19.615c-1.395.635-2.893.982-4.438.982-3.59 0-6.984-1.432-9.525-4.032-2.54-2.599-3.954-6.038-3.954-9.525s1.414-6.926 3.954-9.525C4.016 2.432 7.41 1 10.999 1c3.589 0 6.983 1.432 9.525 4.032 2.54 2.599 3.954 6.038 3.954 9.525s-1.414 6.926-3.954 9.525z" />
        </svg>
      ),
      action: () => {
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
          shareText + " " + shareUrl
        )}`;
        window.open(whatsappUrl, "_blank");
      },
    },
    {
      name: "Twitter",
      icon: () => (
        <svg
          className="h-4 w-4"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.45 9 0 11-4s1-6.2 1-6.2a4.1 4.1 0 00.78-2.07z" />
        </svg>
      ),
      action: () => {
        const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          shareUrl
        )}&text=${encodeURIComponent(shareText)}`;
        window.open(twitterUrl, "_blank", "width=600,height=400");
      },
    },
    {
      name: "Sao chép liên kết",
      icon: copied ? Check : Copy,
      action: handleCopyLink,
      color: copied ? "text-green-600" : "text-muted-foreground",
    },
  ];

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="text-muted-foreground hover:text-foreground"
      >
        <Share2 className="h-4 w-4 mr-2" />
        Chia sẻ
      </Button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white dark:bg-slate-950 border border-border rounded-lg shadow-lg z-50 min-w-[200px] p-2">
          {shareOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.name}
                onClick={() => {
                  option.action();
                  if (option.name !== "Sao chép liên kết") {
                    setIsOpen(false);
                  }
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-foreground ${option.color || ""
                  }`}
              >
                <Icon className={`h-4 w-4 ${option.color || ""}`} />
                <span>{option.name}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

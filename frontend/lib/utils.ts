import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0,
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatVND(value: number) {
  return formatter.format(value)
}

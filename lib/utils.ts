import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(amount: number) {
  try {
    // Use Indian locale for grouping separators
    return `₹${Number(amount).toLocaleString("en-IN")}`
  } catch (e) {
    return `₹${amount}`
  }
}

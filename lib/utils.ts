import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export function capitalizeFirst(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function formatTaskStatus(status: string) {
  return status.split('-').map(word => capitalizeFirst(word)).join(' ')
}

// Add a helper function to get avatar URLs
export function getAvatarUrl(name: string) {
  // Use UI Avatars as a fallback service
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
}

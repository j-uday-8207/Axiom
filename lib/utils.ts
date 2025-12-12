import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format large numbers with K, M, B suffixes
 */
export function formatNumber(num: number): string {
  if (num >= 1_000_000_000) {
    return `$${(num / 1_000_000_000).toFixed(2)}B`;
  }
  if (num >= 1_000_000) {
    return `$${(num / 1_000_000).toFixed(2)}M`;
  }
  if (num >= 1_000) {
    return `$${(num / 1_000).toFixed(2)}K`;
  }
  return `$${num.toFixed(2)}`;
}

/**
 * Format compact numbers without $ sign
 */
export function formatCompactNumber(num: number): string {
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`;
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1)}K`;
  }
  return num.toString();
}

/**
 * Format percentage with + or - sign
 */
export function formatPercentage(pct: number): string {
  const sign = pct >= 0 ? '+' : '';
  return `${sign}${pct.toFixed(1)}%`;
}

/**
 * Get color class based on percentage change
 */
export function getPercentageColor(pct: number): string {
  if (pct > 0) return 'text-success';
  if (pct < 0) return 'text-danger';
  return 'text-gray-400';
}

/**
 * Generate random age string
 */
export function generateRandomAge(): string {
  const types = ['s', 'm', 'h', 'd'];
  const type = types[Math.floor(Math.random() * types.length)];
  
  let value: number;
  switch (type) {
    case 's':
      value = Math.floor(Math.random() * 59) + 1;
      break;
    case 'm':
      value = Math.floor(Math.random() * 59) + 1;
      break;
    case 'h':
      value = Math.floor(Math.random() * 23) + 1;
      break;
    case 'd':
      value = Math.floor(Math.random() * 30) + 1;
      break;
    default:
      value = 1;
  }
  
  return `${value}${type}`;
}

/**
 * Generate random percentage change
 */
export function generateRandomPercentage(min: number = -50, max: number = 50): number {
  return Math.random() * (max - min) + min;
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function for performance optimization
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

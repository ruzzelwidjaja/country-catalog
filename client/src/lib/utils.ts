// Reusable logic and helper functions

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const checkIfMobile = () => {
  return !!(/Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
            window.matchMedia("only screen and (max-width: 760px)").matches ||
            ('ontouchstart' in document.documentElement && navigator.userAgent.match(/Mobi/)));
};

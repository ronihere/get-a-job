import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {formatDistanceToNowStrict} from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatMoney(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: 'currency',
    currency:'USD',
  }).format(amount)
}

export function relativeDate(from: Date) {
  return formatDistanceToNowStrict(from, {addSuffix: true})
}

export const jobTypes = [
  "Full-time",
  "Part-time",
  "Contract",
  "Temporary",
  "Internship",
  "Volunteer",
];

export const locationTypes = ["Remote", "On-site", "Hybrid"];

export function toSlug(str: string) {
  return str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

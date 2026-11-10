export { cn } from "cn"

/**
 * Converts an ISO date string to MM/DD/YYYY format
 * @param isoString - ISO date string (e.g., "2026-10-15T13:41:43.963816Z")
 * @returns Formatted date string (e.g., "10/15/2026")
 */
export function formatToShortDate(isoString: string): string {
  const date = new Date(isoString);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();
  
  return `${month}/${day}/${year}`;
}

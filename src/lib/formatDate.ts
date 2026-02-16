/**
 * Format dates and numbers consistently between server and client
 * to avoid React hydration mismatches (Error #418).
 *
 * Uses UTC-based manual formatting instead of toLocaleDateString()
 * which produces different output on server vs. client due to
 * timezone/locale differences.
 */

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const MONTHS_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

const WEEKDAYS = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
]

const WEEKDAYS_SHORT = [
  'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
]

/**
 * Format: "January 15, 2025"
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`
}

/**
 * Format: "Sun, Jan 15, 2025"
 */
export function formatDateShort(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return `${WEEKDAYS_SHORT[d.getUTCDay()]}, ${MONTHS_SHORT[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`
}

/**
 * Format: "Monday, January 15, 2025"
 */
export function formatDateLong(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return `${WEEKDAYS[d.getUTCDay()]}, ${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`
}

/**
 * Format: "2:30 PM"
 */
export function formatTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  let hours = d.getUTCHours()
  const minutes = d.getUTCMinutes()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12
  if (hours === 0) hours = 12
  return `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`
}

/**
 * Format: "Monday, January 15, 2025 at 2:30 PM"
 */
export function formatDateTimeLong(date: string | Date): string {
  return `${formatDateLong(date)} at ${formatTime(date)}`
}

/**
 * Kept for backward compatibility. Uses short weekday + date + time.
 * Format: "Sun, Jan 15, 2025 at 2:30 PM"
 */
export function formatEventDate(date: string | Date): string {
  return `${formatDateShort(date)} at ${formatTime(date)}`
}

/**
 * Format a number with commas, e.g. 1234567 -> "1,234,567"
 * Deterministic (no locale dependency).
 */
export function formatNumber(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

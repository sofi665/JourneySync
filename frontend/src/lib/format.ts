//

/** Formats an ISO date string (YYYY-MM-DD) as DD/MM/YYYY. */
export function formatDate(iso: string): string {
  if (!iso) return ""
  const [year, month, day] = iso.split("-")
  if (!year || !month || !day) return iso
  return `${day}/${month}/${year}`
}

/** Returns initials from a full name, e.g. "Lucía Fernández" -> "LF". */
export function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}

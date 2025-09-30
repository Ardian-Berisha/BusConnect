// src/components/dateFormat.js
export function formatDate(dateString) {
  if (!dateString) return '';
  const d = new Date(dateString);
  // Example: 2025-09-28 16:01 → 28 Sep 2025 16:01
  return d.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}

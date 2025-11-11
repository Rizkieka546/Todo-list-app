/**
 * Basic HTML escape to prevent XSS when rendering user input as text.
 * Note: Prefer DOMPurify if you ever need to allow HTML.
 */
export function escapeHtml(str = "") {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

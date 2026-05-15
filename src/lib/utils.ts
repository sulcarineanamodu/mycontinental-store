export function proxyImg(src: string): string {
  if (!src) return '';
  // Route WooCommerce images through our server-side proxy to bypass Cloudflare
  if (src.includes('mycontinentalfoodstore.co.uk')) {
    return `/api/img?url=${encodeURIComponent(src)}`;
  }
  return src;
}

export function decodeHtmlEntities(text: string): string {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}

export function stripHtml(html: string): string {
  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

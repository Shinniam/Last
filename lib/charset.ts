// lib/charset.ts
export function detectCharset(contentType: string | null, body: string): string {
  // Content-Typeから判定
  const fromHeader = contentType?.match(/charset=([^\s;]+)/i);
  if (fromHeader) return fromHeader[1].toLowerCase();

  // HTML内 <meta> から判定
  const meta = body.match(/<meta.*?charset=["']?([\w\-]+)["']?/i);
  if (meta) return meta[1].toLowerCase();

  // fallback
  return 'utf-8';
}

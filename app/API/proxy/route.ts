import { NextRequest } from 'next/server';
import { detectCharset } from '@/lib/charset';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const target = searchParams.get('url');
  if (!target) return new Response('Missing URL', { status: 400 });

  try {
    const res = await fetch(target, {
      headers: {
        'User-Agent': 'Mozilla/5.0 Kimutichan/1.0',
      },
    });

    const contentType = res.headers.get('content-type') || 'text/html';
    const arrayBuffer = await res.arrayBuffer();
    const decoder = new TextDecoder('utf-8'); // fallbackはUTF-8
    const rawText = decoder.decode(arrayBuffer);

    const charset = detectCharset(contentType, rawText);
    let finalText = rawText;

    // UTF-8以外ならmetaタグ内のcharsetをUTF-8に書き換え
    if (charset !== 'utf-8') {
      finalText = rawText.replace(
        /<meta[^>]*charset=["']?[\w\-]+["']?/i,
        '<meta charset="utf-8"'
      );
    }

    return new Response(finalText, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 's-maxage=300, stale-while-revalidate=60',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (e) {
    return new Response('Fetch error: ' + (e as Error).message, { status: 500 });
  }
}

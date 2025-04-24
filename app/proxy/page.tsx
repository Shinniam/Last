// app/proxy/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProxyPage() {
  const searchParams = useSearchParams();
  const url = searchParams.get('url') || '';
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;
    fetch(`/api/proxy?url=${encodeURIComponent(url)}`)
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return await res.text();
      })
      .then(setContent)
      .catch((e) => setError(e.message));
  }, [url]);

  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!content) return <div className="p-4">読み込み中...</div>;

  return (
    <iframe
      srcDoc={content}
      className="w-full h-screen border-none"
      sandbox="allow-scripts allow-same-origin"
    />
  );
}

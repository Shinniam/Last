// app/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      router.push(`/proxy?url=${encodeURIComponent(url)}`);
    }
  };

  return (
    <main className="min-h-screen bg-white text-black flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold mb-6">Kimutichan Proxy</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-4">
        <input
          type="text"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl"
        >
          プロキシ

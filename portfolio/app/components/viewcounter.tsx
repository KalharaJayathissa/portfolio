'use client';

import { useEffect, useState } from 'react';

export default function ViewCounter({ pageName }: { pageName: string }) {
  const [viewCount, setViewCount] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const incrementViewCount = async () => {
      try {
        const response = await fetch(
          `https://countapi.mileshilliard.com/api/v1/hit/kalhara.me-${encodeURIComponent(pageName)}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error(`CountAPI request failed with status ${response.status}`);
        }

        const data = (await response.json()) as { value?: string | number };
        const count = Number(data.value);

        if (Number.isFinite(count)) {
          setViewCount(count);
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        console.error(error);
      }
    };

    void incrementViewCount();

    return () => controller.abort();
  }, [pageName]);

  if (viewCount === null) return <span>Loading views...</span>;

  return (
    <span className="font-mono text-sm text-gray-500">
      page views: {viewCount.toLocaleString()}
    </span>
  );
}

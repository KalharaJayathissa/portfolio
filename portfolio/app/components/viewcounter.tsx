'use client';

import { useEffect, useState } from 'react';

export default function ViewCounter({ pageName }: { pageName: string }) {
  const [viewCount, setViewCount] = useState<number | null>(null);
  const workspace = process.env.NEXT_PUBLIC_COUNTERAPI_WORKSPACE;

  useEffect(() => {
    if (!workspace) return;

    const controller = new AbortController();

    const incrementViewCount = async () => {
      try {
        const response = await fetch(
          `https://api.counterapi.dev/v2/${encodeURIComponent(workspace)}/${encodeURIComponent(pageName)}/up`,
          { signal: controller.signal },
        );

        if (!response.ok) return;

        const data = (await response.json()) as {
          value?: number;
          count?: number;
          data?: { value?: number };
        };
        const count = data.value ?? data.count ?? data.data?.value;

        if (typeof count === "number") {
          setViewCount(count);
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    };

    void incrementViewCount();

    return () => controller.abort();
  }, [pageName, workspace]);

  if (!workspace) return null;

  if (viewCount === null) return <span>Loading views...</span>;

  return (
    <span className="font-mono text-sm text-gray-500">
      page views: {viewCount.toLocaleString()}
    </span>
  );
}

'use client';

import { useEffect, useState } from 'react';

export default function ViewCounter({ pageName }: { pageName: string }) {
  const [viewCount, setViewCount] = useState<number | null>(null);
  const namespace = "Kalhara_jayathissa"; 

  useEffect(() => {
    // 1. Increment and get the count
    fetch(`https://api.counterapi.dev/v1/${namespace}/${pageName}/up`)
      .then((res) => res.json())
      .then((data) => {
        if (data.count) setViewCount(data.count);
      })
      .catch((err) => console.error("CounterAPI Error:", err));
  }, [pageName]);

  if (viewCount === null) return <span>Loading views...</span>;

  return (
    <span className="font-mono text-sm text-gray-500">
      page views: {viewCount.toLocaleString()}
    </span>
  );
}
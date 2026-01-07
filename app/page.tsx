'use client';

import { useState, useEffect } from 'react';

function BuggyComponent() {
  throw new Error('Test error to trigger error boundary');
}

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only throw after mounting (client-side)
    setMounted(true);
  }, []);

  if (mounted) {
    return <BuggyComponent />;
  }

  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>Next.js 16 DevTools Bug Reproduction</h1>
      <p>Loading...</p>
    </main>
  );
}

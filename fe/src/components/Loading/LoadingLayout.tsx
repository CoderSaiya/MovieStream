'use client';

import { useEffect, useState } from 'react';
import { LoadingScreen } from './LoadingScreen';

interface LoadingLayoutProps {
  children: React.ReactNode;
}

export function LoadingLayout({ children }: LoadingLayoutProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  // Render the children after loading
  return <>{children}</>;
}

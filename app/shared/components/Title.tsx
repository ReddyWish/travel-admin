import type React from 'react';
import { cn } from '../../lib/cn';

interface TitleProps {
  type: 'h2' | 'h3';
  children: React.ReactNode;
  className?: string;
}

export function Title({ type = 'h2', children, className }: TitleProps) {
  const Heading = type as keyof React.JSX.IntrinsicElements;

  const headingStyles = {
    h2: 'text-[24px] font-semibold',
    h3: 'text-[30px] font-semibold',
  };

  return (
    <Heading className={cn(className, headingStyles[type], 'dark:text-white')}>
      {children}
    </Heading>
  );
}

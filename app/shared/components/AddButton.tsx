import type React from 'react';
import { Plus } from 'lucide-react';
import { Check } from 'lucide-react';
import { cn } from '~/lib/cn';
import { Link } from 'react-router';
import { Button } from '~/shared/components/ui/button';

interface AddButtonProps {
  type?: 'button' | 'submit';
  link?: string;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function AddButton({
  type = 'button',
  link,
  disabled = false,
  children,
  className,
}: AddButtonProps) {
  if (link) {
    return (
      <Button asChild className={cn('', className)} disabled={disabled}>
        <Link to={link} className={cn('flex items-center gap-2', className)}>
          <Plus className="w-[16px] h-[16px]" />
          <span>{children}</span>
        </Link>
      </Button>
    );
  }

  return (
    <Button
      className={cn('flex gap-2', className)}
      type={type}
      disabled={disabled}
    >
      <Check className="w-[16px] h-[16px]" />
      {children}
    </Button>
  );
}

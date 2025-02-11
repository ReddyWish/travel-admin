import { Loader } from 'lucide-react';
import { clsx } from 'clsx';

export const Spinner = ({ className }: { className?: string }) => {
  return <Loader className={clsx(className, 'animate-spin dark:text-white')} />;
};

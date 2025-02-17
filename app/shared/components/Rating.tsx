import { Star } from 'lucide-react';
import { cn } from '~/lib/cn';

type RatingProps = {
  className?: string;
  rating?: number;
};

export default function Rating({ className, rating = 1 }: RatingProps) {
  return (
    <div className={cn(className)}>
      <div className="flex">
        {Array.from({ length: rating }, (_, index) => index + 1).map(
          (item, index) => (
            <Star key={index} className="fill-yellow-400" />
          ),
        )}
      </div>
    </div>
  );
}

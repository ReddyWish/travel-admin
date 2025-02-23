import { useFormContext } from 'react-hook-form';
import type { Inputs } from '~/features/tours/types/FormInputs';
import { useEffect } from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/shared/components/ui/form';
import { Input } from '~/shared/components/ui/input';
import Rating from '~/shared/components/Rating';
import type { AccommodationRating } from '~/features/tours/types/AccommodationRating';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/shared/components/ui/dropdown-menu';
import { cn } from '~/lib/cn';

const HOTEL_RATINGS: Record<AccommodationRating, number> = {
  THREE_STAR: 3,
  FOUR_STAR: 4,
  FIVE_STAR: 5,
} as const;

interface RatingOption {
  label: React.ReactNode;
  value: AccommodationRating;
}

const hotelRatingOptions: RatingOption[] = Object.entries(HOTEL_RATINGS).map(
  ([name, rating]) => ({
    label: <Rating rating={rating} className="text-sky-300" />,
    value: name as AccommodationRating,
  }),
);

export default function AccommodationFields() {
  const { control, setValue, watch } = useFormContext<Inputs>();
  const accommodations = watch('accommodations');
  const currentRating = watch('accommodations.0.stars');

  useEffect(() => {
    if (!accommodations || accommodations.length === 0) {
      setValue('accommodations', [{ stars: 'THREE_STAR', hotelName: '' }]);
    }
  }, [setValue, accommodations]);

  const handleRatingChange = (value: AccommodationRating) => {
    setValue('accommodations.0.stars', value, { shouldValidate: true });
  };

  const selectedOption = hotelRatingOptions.find(
    (option) => option.value === currentRating,
  );

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <FormField
        control={control}
        name="accommodations.0.hotelName"
        render={({ field }) => (
          <FormItem className="relative flex-1">
            <FormLabel>Accommodation</FormLabel>
            <FormControl>
              <Input placeholder="Enter hotel name" {...field} />
            </FormControl>
            <FormMessage className="absolute bottom-[-12px]" />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="accommodations.0.stars"
        render={({ field }) => (
          <FormItem className="relative w-full lg:w-64">
            <FormLabel>Rating</FormLabel>
            <FormControl>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex justify-center items-center border border-slate-200 text-slate-400 rounded-md text-sm shadow-sm h-9 w-full outline-none">
                  {selectedOption ? selectedOption.label : 'Select rating'}
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-[8rem] bg-white"
                  side="bottom"
                  align="start"
                >
                  {hotelRatingOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => handleRatingChange(option.value)}
                      className={cn(
                        'cursor-pointer hover:bg-slate-100',
                        currentRating === option.value && 'bg-slate-100',
                      )}
                    >
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </FormControl>
            <FormMessage className="absolute bottom-[-12px]" />
          </FormItem>
        )}
      />
    </div>
  );
}

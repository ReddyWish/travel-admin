import { UploadIcon } from '~/shared/icons/UploadIcon';
import { Input } from '~/shared/components/ui/input';
import { Textarea } from '~/shared/components/ui/textarea';
import { MultiSelect } from '~/shared/components/MultiSelect';
import { useState } from 'react';
import { useGetCategoriesQuery } from '~/features/tours/TourForm/__generated__/GetCategories';
import { HOTEL_RATINGS } from '~/features/tours/constants/hotelRating';
import Rating from '~/shared/components/Rating';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/shared/components/ui/form';
import { Switch } from '~/shared/components/ui/switch';
import { useFormContext } from 'react-hook-form';
import type { Inputs } from '~/features/tours/types/FormInputs';
import AccommodationFields from '~/features/tours/components/AccommodationFields';

export default function StepOne() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<string>();
  const { data, loading } = useGetCategoriesQuery();

  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<Inputs>();

  const categoryOptions =
    data?.categories.map((category) => ({
      label: category.name,
      value: category.id,
    })) || [];

  const handleCategoriesChange = (values: string[]) => {
    setSelectedCategories(values);
    // setValue('categoryIds', values);
  };

  return (
    <div className="flex flex-col gap-7 max-w-none">
      <div className="flex gap-7 flex-col lg:flex-row">
        <label
          htmlFor="uploadFile1"
          className="bg-white dark:bg-gray-300 font-semibold rounded-md lg:min-w-[332px] min-w-full flex flex-col items-center justify-center cursor-pointer border border-slate-200 shadow-md lg:p-3 p-5"
        >
          <UploadIcon className="w-15 fill-color-black pb-5" />
          Upload Tour Cover
          <input type="file" id="uploadFile1" className="hidden" />
          <p className="text-xs font-medium text-gray-400 mt-2">
            PNG, JPG, SVG and WEBP are allowed
          </p>
        </label>

        <div className="flex flex-col w-full gap-7">
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem className="relative grid w-full items-center">
                <FormLabel htmlFor="title">Tour Name</FormLabel>
                <FormControl>
                  <Input
                    id="title"
                    placeholder="Enter tour name"
                    className="margin-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="absolute bottom-[-12px]" />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="location"
            render={({ field }) => (
              <FormItem className="relative grid w-full items-center">
                <FormLabel htmlFor="location">Tour Location</FormLabel>
                <FormControl>
                  <Input
                    id="location"
                    placeholder="Enter tour location"
                    className="margin-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="absolute bottom-[-12px]" />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="durationDays"
            render={({ field }) => (
              <FormItem className="relative grid w-full items-center">
                <FormLabel htmlFor="durationDays">Duration</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    id="durationDays"
                    placeholder="Enter tour location"
                    className="margin-0"
                    {...field}
                    onChange={(e) => {
                      const value =
                        e.target.value === '' ? '' : Number(e.target.value);
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage className="absolute bottom-[-12px]" />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="shortDescription"
            render={({ field }) => (
              <FormItem className="relative grid w-full">
                <FormLabel htmlFor="shortDescription">
                  Short Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter tours short description"
                    id="shortDescription"
                    className="resize-none h-21"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="absolute bottom-[-12px]" />
              </FormItem>
            )}
          />
        </div>
      </div>

      <FormField
        control={control}
        name="categoryIds"
        render={({ field }) => (
          <FormItem className="relative grid w-full">
            <FormLabel htmlFor="categoryIds">Categories</FormLabel>
            <FormControl>
              <MultiSelect
                id="categoryIds"
                options={categoryOptions}
                onValueChange={field.onChange}
                placeholder="Select categories"
                defaultValue={[]}
                maxCount={5}
              />
            </FormControl>
            <FormMessage className="absolute bottom-[-12px]" />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem className="relative grid w-full">
            <FormLabel htmlFor="description">Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Enter tours description"
                id="description"
                className="resize-none h-21"
                {...field}
              />
            </FormControl>
            <FormMessage className="absolute bottom-[-12px]" />
          </FormItem>
        )}
      />

      <AccommodationFields />

      <div>
        <FormField
          control={control}
          name="isBestSeller"
          render={({ field }) => (
            <FormItem className="relative flex flex-row items-center justify-between rounded-md border border-slate-200 p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Mark current tour as a bestseller</FormLabel>
                <FormDescription className="text-slate-400">
                  By marking current tour as a bestseller you'll put the tour in
                  a priority view
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  id="isBestSeller"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage className="absolute bottom-[-12px]" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

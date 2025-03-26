import { Input } from '~/shared/components/ui/input';
import { Textarea } from '~/shared/components/ui/textarea';
import { MultiSelect } from '~/shared/components/MultiSelect';
import { useGetCategoriesQuery } from '~/features/tours/TourForm/__generated__/GetCategories';
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
import ImagesUpload from '~/features/tours/components/TourImagesUpload';
import type { Category } from '~/__generated__/types';

type StepOneProps = {
  categories?: Category[];
};

export default function StepOne({ categories }: StepOneProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<Inputs>();

  const categoryOptions =
    categories?.map((category) => ({
      label: category.name,
      value: category.id,
    })) || [];

  return (
    <div className="flex flex-col gap-7 max-w-none h-full">
      <div className="flex gap-7 flex-col lg:flex-row">
        <ImagesUpload cover={true} />

        <div className="flex flex-col w-full gap-7">
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem className="relative grid w-full items-center">
                <FormLabel htmlFor="title">Tour Name</FormLabel>
                <FormControl className="m-0">
                  <Input
                    id="title"
                    placeholder="Enter tour name"
                    className="margin-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="absolute bottom-[-20px]" />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="location"
            render={({ field }) => (
              <FormItem className="relative grid w-full items-center">
                <FormLabel htmlFor="location">Tour Location</FormLabel>
                <FormControl className="m-0">
                  <Input
                    id="location"
                    placeholder="Enter tour location"
                    className="margin-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="absolute bottom-[-20px]" />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="durationDays"
            render={({ field }) => (
              <FormItem className="relative grid w-full items-center">
                <FormLabel htmlFor="durationDays">Duration</FormLabel>
                <FormControl className="m-0">
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
                <FormMessage className="absolute bottom-[-20px]" />
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
                <FormControl className="m-0">
                  <Textarea
                    placeholder="Enter tours short description"
                    id="shortDescription"
                    className="resize-none h-21"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="absolute bottom-[-20px]" />
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
            <FormControl className="m-0">
              <MultiSelect
                id="categoryIds"
                options={categoryOptions}
                value={field.value}
                onValueChange={(newValue) => {
                  field.onChange(newValue);
                }}
                placeholder="Select categories"
                defaultValue={[]}
                maxCount={5}
              />
            </FormControl>
            <FormMessage className="absolute bottom-[-20px]" />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem className="relative grid w-full">
            <FormLabel htmlFor="description">Description</FormLabel>
            <FormControl className="m-0">
              <Textarea
                placeholder="Enter tours description"
                id="description"
                className="resize-none h-30"
                {...field}
              />
            </FormControl>
            <FormMessage className="absolute bottom-[-20px]" />
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
              <FormMessage className="absolute bottom-[-20px]" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

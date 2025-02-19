import { useState } from 'react';
import { useGetCategoriesQuery } from '~/features/tours/TourForm/__generated__/GetCategories';
import { HOTEL_RATINGS } from '~/features/tours/constants/hotelRating';
import Rating from '~/shared/components/Rating';
import { UploadIcon } from '~/shared/icons/UploadIcon';
import { Label } from '~/shared/components/ui/label';
import { Input } from '~/shared/components/ui/input';
import { Textarea } from '~/shared/components/ui/textarea';
import { MultiSelect } from '~/shared/components/MultiSelect';
import CustomDropdown from '~/shared/components/CustomDropdown';
import { Star } from 'lucide-react';

export default function ToDelete() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<string>();
  const { data, loading } = useGetCategoriesQuery();

  const categoryOptions =
    data?.categories.map((category) => ({
      label: category.name,
      value: category.id,
    })) || [];

  const handleCategoriesChange = (values: string[]) => {
    setSelectedCategories(values);
    // setValue('categoryIds', values);
  };

  const hotelRatingOptions = Object.entries(HOTEL_RATINGS).map(
    ([name, rating]) => ({
      label: <Rating rating={rating} className="text-yellow-400" />,
      value: name,
    }),
  );

  return (
    <div className="flex flex-col gap-5 max-w-none">
      <div className="flex gap-5 flex-col lg:flex-row">
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

        <div className="flex flex-col w-full gap-5">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="title">Tour Name</Label>
            <Input id="title" placeholder="Enter tour name" />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="location">Tour Location</Label>
            <Input id="location" placeholder="Enter tour location" />
          </div>

          <div className="grid w-full gap-1.5">
            <Label htmlFor="duration">Duration</Label>
            <Input
              type="number"
              placeholder="Enter tour duration"
              id="duration"
            />
          </div>

          <div className="grid w-full gap-1.5">
            <Label htmlFor="shortDescription">Short Description</Label>
            <Textarea
              placeholder="Enter tours short description"
              id="shortDescription"
              className="resize-none h-21"
            />
          </div>
        </div>
      </div>

      <div className="grid w-full gap-1.5">
        <Label htmlFor="categories">Categories</Label>
        <MultiSelect
          options={categoryOptions}
          onValueChange={handleCategoriesChange}
          placeholder="Select categories"
          defaultValue={[]}
          maxCount={5}
        />
      </div>

      <div className="grid w-full gap-1.5">
        <Label htmlFor="description">Full Description</Label>
        <Textarea
          placeholder="Enter tours description"
          id="description"
          className="resize-none h-32"
        />
      </div>

      <div className="flex flex-col items-end lg:flex-row gap-5">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="accommodation">Accommodation</Label>
          <Input id="accommodation" placeholder="Enter Accommodation Name" />
        </div>

        <CustomDropdown
          options={hotelRatingOptions}
          placeholder={<Star />}
          value={selectedRating}
          onChange={setSelectedRating}
        />
      </div>
    </div>
  );
}

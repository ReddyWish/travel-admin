import { UploadIcon } from '~/shared/icons/UploadIcon';
import { Label } from '~/shared/components/ui/label';
import { Input } from '~/shared/components/ui/input';
import { Textarea } from '~/shared/components/ui/textarea';
import { useGetCategoriesQuery } from '~/features/tours/TourForm/__generated__/GetCategories';
import { useState } from 'react';
import { MultiSelect } from '~/shared/components/MultiSelect';
import Rating from '~/shared/components/Rating';
import { Star } from 'lucide-react';
import { HOTEL_RATINGS } from '~/features/tours/constants/hotelRating';
import CustomDropdown from '~/shared/components/CustomDropdown';
import invariant from 'ts-invariant';

export default function TourForm() {
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
    <div className="flex flex-col gap-5 max-w-none lg:max-w-3/4">
      <div className="flex gap-5 flex-col lg:flex-row">
        <label
          htmlFor="uploadFile1"
          className="bg-white font-semibold rounded-md w-full lg:w-1/2 flex flex-col items-center justify-center cursor-pointer border border-slate-200 shadow-md lg:px-3 px-5 py-12"
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
            <Input id="locatio" placeholder="Enter tour location" />
          </div>

          <div className="grid w-full gap-1.5">
            <Label htmlFor="shortDescription">Short Description</Label>
            <Textarea
              placeholder="Enter tours short description"
              id="shortDescription"
              className="resize-none"
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

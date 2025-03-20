import { useFormContext } from 'react-hook-form';
import {
  Clock,
  Hotel,
  Info,
  MapPin,
  Star,
  Tag,
  Route,
  HandCoins,
  ListCollapse,
  Check,
} from 'lucide-react';
import type {
  TourImageInput,
  TourProgramFragment,
} from '~/__generated__/types';
import { HOTEL_RATINGS } from '~/features/tours/constants/hotelRatings';
import type { AccommodationStars } from '~/features/tours/types/AccommodationStars';
import { Badge } from '~/shared/components/ui/badge';
import { Card, CardContent } from '~/shared/components/ui/card';
import { Separator } from '~/shared/components/ui/separator';
import { Button } from '~/shared/components/ui/button';
import Rating from '~/shared/components/Rating';
import { useGetTourCategoriesQuery } from '~/features/tours/TourForm/__generated__/GetTourCategories';
import { useParams } from 'react-router';
import { Spinner } from '~/shared/components/Spinner';

type StepSixProps = {
  isLoading: boolean;
};

export default function StepSix({ isLoading }: StepSixProps) {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const { data: tourCategoriesData, loading: tourCategoriesDataLoading } =
    useGetTourCategoriesQuery({
      variables: { id: id || '' },
      skip: !isEditMode || !id,
    });
  const { getValues } = useFormContext();
  const formData = getValues();
  const {
    formState: { isValid },
  } = useFormContext();

  console.log(tourCategoriesData);

  const getCurrencySymbol = (currencyId: string): string => {
    const currencies: Record<string, string> = {
      '1': '$',
      '2': '€',
    };
    return currencies[currencyId] || '';
  };

  const coverImage = formData?.images.find(
    (image: TourImageInput) => image.isPrimary,
  );

  const mediaGallery = formData?.images.filter(
    (image: TourImageInput) => image.isPrimary !== true,
  );

  return (
    <div
      className={`relative flex flex-col gap-5 w-full ${isLoading && 'opacity-50'}`}
    >
      {coverImage && (
        <div className="relative w-full rounded-xl overflow-hidden h-64 sm:h-72 md:h-80">
          <img
            className="w-full h-full object-cover"
            src={coverImage.url}
            alt="Tour cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
            <Badge className="absolute top-4 right-4 px-3 py-1 bg-white text-black rounded-full shadow-md">
              Cover Image
            </Badge>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {formData.title}
            </h1>
            <div className="flex items-center gap-2 text-white">
              <MapPin size={16} />
              <span>{formData.location}</span>
              <span className="mx-2">•</span>
              <Clock size={16} />
              <span>{formData.durationDays} days</span>
              {formData.isBestSeller && (
                <>
                  <span className="mx-2">•</span>
                  <Check size={18} />
                  <span>Bestseller</span>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card>
          <CardContent>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-black dark:text-white">
              <Info size={18} />
              Tour Details
            </h3>

            <div className="space-y-5">
              <div>
                <h4 className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mb-1">
                  <Tag size={14} /> Categories
                </h4>
                <div className="flex flex-wrap gap-2 mt-1">
                  {tourCategoriesData?.tour?.categories.map(({ name, id }) => (
                    <Badge
                      key={id}
                      className="px-2 py-1 text-xs text-black dark:text-white"
                    >
                      {name}
                    </Badge>
                  )) || (
                    <span className="text-gray-400">
                      No categories specified
                    </span>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mb-1">
                  <Hotel size={14} /> Accommodation
                </h4>
                <div className="flex items-center">
                  <p className="font-medium text-black dark:text-white">
                    {formData.accommodations[0]?.hotelName}
                  </p>
                  <div className="ml-2 flex items-center">
                    <Rating
                      rating={
                        HOTEL_RATINGS[
                          formData.accommodations[0]
                            ?.stars as AccommodationStars
                        ]
                      }
                      className="w-20 text-yellow-400 fill-yellow-400"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mb-2">
                  <HandCoins size={16} /> Prices
                </h4>
                <div className="grid lg:grid-cols-2 gap-2 mt-1 grid-cols-1 text-black dark:text-white">
                  {formData.price?.map(
                    (
                      {
                        amount,
                        comment,
                        currencyId,
                      }: {
                        amount: number;
                        comment: string;
                        currencyId: string;
                      },
                      index: number,
                    ) => (
                      <Badge key={index} className="px-2 py-1 text-xs">
                        {getCurrencySymbol(currencyId)} {amount}{' '}
                        {comment && comment}
                      </Badge>
                    ),
                  ) || (
                    <span className="text-gray-400">
                      No categories specified
                    </span>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mb-2">
                  <ListCollapse size={16} /> Inclusions & Exclusions
                </h4>
                {formData.inclusions?.length > 0 ||
                formData.exclusions?.length > 0 ? (
                  <div className="grid lg:grid-cols-2 gap-2 mt-1 grid-cols-1">
                    <div className="flex flex-col gap-1">
                      {formData.inclusions.length > 0 ? (
                        formData.inclusions?.map(
                          (
                            {
                              description,
                            }: {
                              description: string;
                            },
                            index: number,
                          ) => (
                            <Badge
                              key={index}
                              className="font-medium px-2 py-1 text-xs bg-green-50"
                            >
                              {description}
                            </Badge>
                          ),
                        )
                      ) : (
                        <span className="text-gray-400">
                          No Inclusions specified
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      {formData.exclusions?.length > 0 ? (
                        formData.exclusions?.map(
                          (
                            {
                              description,
                            }: {
                              description: string;
                            },
                            index: number,
                          ) => (
                            <Badge
                              key={index}
                              className="font-medium px-2 py-1 text-xs bg-red-50"
                            >
                              {description}
                            </Badge>
                          ),
                        )
                      ) : (
                        <span className="text-gray-400">
                          No Exclusions specified
                        </span>
                      )}
                    </div>
                  </div>
                ) : (
                  <span className="text-gray-400">
                    No Inclusions & Exclusions specified
                  </span>
                )}
              </div>

              <div>
                <h4 className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mb-2">
                  <Route size={16} /> Itinerary
                </h4>
                <div className="mt-2">
                  {formData.program && formData.program.length > 0 ? (
                    formData.program
                      .sort(
                        (a: TourProgramFragment, b: TourProgramFragment) =>
                          a.order - b.order,
                      )
                      .map((item: TourProgramFragment, index: number) => (
                        <div
                          key={index}
                          className="relative ml-1 pl-5 pb-3 border-l-2 border-slate-200 last:border-l-0 last:pb-0"
                        >
                          <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-slate-300 border-2 border-white"></div>

                          {item.startTime && (
                            <div className="text-xs font-medium text-blue-400 mb-1">
                              {item.startTime}
                            </div>
                          )}

                          <h5 className="text-base font-semibold mb-1 text-black dark:text-white">
                            {item.title}
                          </h5>

                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {item.description}
                          </p>
                        </div>
                      ))
                  ) : (
                    <span className="text-gray-400">
                      No itinerary specified
                    </span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-black dark:text-white">
              <Info size={18} />
              Description
            </h3>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Short Description
                </h4>
                <p className="text-sm text-black dark:text-white">
                  {formData.shortDescription}
                </p>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Full Description
                </h4>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <p className="text-sm whitespace-pre-line text-black dark:text-white">
                    {formData.description}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {mediaGallery && mediaGallery.length > 0 && (
        <Card>
          <CardContent>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-black dark:text-white">
              <Info size={18} />
              Tour Gallery
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-3">
              {mediaGallery.map((image: TourImageInput, index: number) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
                >
                  <img
                    className="h-full w-full object-cover"
                    src={image.url}
                    alt={`Tour image ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      <Button type="submit" disabled={!isValid || isLoading}>
        {isLoading ? <Spinner /> : isEditMode ? 'Update Tour' : 'Create Tour'}
      </Button>
    </div>
  );
}

import { AccommodationStars } from '~/features/tours/types/AccommodationStars';

export const HOTEL_RATINGS: Record<AccommodationStars, number> = {
  [AccommodationStars.ThreeStar]: 3,
  [AccommodationStars.FourStar]: 4,
  [AccommodationStars.FiveStar]: 5,
};

import type { TourImage } from '~/__generated__/types';

export interface ExtendedTourImage extends TourImage {
  file?: File;
}

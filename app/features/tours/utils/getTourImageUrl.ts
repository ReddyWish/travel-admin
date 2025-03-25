import type { ExtendedTourImage } from '~/features/tours/types/ExtendedTourImage';

const API_URL = import.meta.env?.VITE_API_URL || 'http://localhost:4000';

export const getTourImageUrl = (image: ExtendedTourImage) => {
  if (image.file) {
    return URL.createObjectURL(image.file);
  }
  return `${API_URL}${image.url}` || '';
};

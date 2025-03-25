import type { CategoryImageInput } from '~/__generated__/types';

const API_URL = import.meta.env?.VITE_API_URL || 'http://localhost:4000';

export const getCategoryImageUrl = (image: CategoryImageInput) => {
  if (image.file) {
    return URL.createObjectURL(image.file);
  }
  return `${API_URL}${image.imageUrl}` || '';
};

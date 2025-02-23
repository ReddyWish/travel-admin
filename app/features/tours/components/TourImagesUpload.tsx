import { useFormContext } from 'react-hook-form';
import { X } from 'lucide-react';
import { useState } from 'react';
import type { ChangeEvent } from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '~/shared/components/ui/form';
import { cn } from '~/lib/cn';
import { UploadIcon } from '~/shared/icons/UploadIcon';
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE,
  MAX_IMAGES_LENGTH,
} from '~/features/tours/constants/tourImagesParams';
import type { TourImage } from '~/__generated__/types';

type TourImageUploadProps = {
  cover?: boolean;
};

export default function TourImagesUpload({
  cover = true,
}: TourImageUploadProps) {
  const { control, setValue, watch, getFieldState, trigger } = useFormContext();

  const images: TourImage[] = watch('images') || [];

  const [error, setError] = useState<string>('');

  const { error: formError } = getFieldState('images');

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setError('');
    await trigger('images');

    if (!files.length) return;

    if (!cover && images.length + files.length > MAX_IMAGES_LENGTH) {
      setError(`Maximum ${MAX_IMAGES_LENGTH} images allowed`);
      return;
    }

    for (const file of files) {
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        setError(
          'File type not supported, please upload PNG, JPG, SVG or WEBP',
        );
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        setError('File is too large. Maximum size is 5MB');
        return;
      }
    }

    try {
      const newImages = files.map((file) => ({
        url: URL.createObjectURL(file),
        isPrimary: cover,
      }));

      if (cover) {
        setValue('images', [newImages[0]], { shouldValidate: true });
      } else {
        setValue('images', [...images, ...newImages], { shouldValidate: true });
      }
    } catch (error) {
      setError('Failed to upload image(s)');
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i: number) => i !== index);
    setValue('images', newImages, { shouldValidate: true });
  };

  return (
    <FormField
      control={control}
      name="images"
      render={() => (
        <FormItem className="w-full">
          <FormControl>
            <div className="w-full space-y-4">
              {cover ? (
                images.length === 0 ? (
                  <label
                    htmlFor="tourImage"
                    className={cn(
                      'bg-white dark:bg-gray-300 font-semibold rounded-md lg:min-w-[332px] min-w-full min-h-[285px] lg:min-h-[364px]',
                      'flex flex-col items-center justify-center cursor-pointer h-',
                      'border border-slate-200 shadow-md lg:p-3 p-5 relative',
                      (error || formError) && 'border-red-500',
                    )}
                  >
                    <UploadIcon className="w-15 fill-color-black" />
                    <span>Upload tour cover</span>
                    <input
                      type="file"
                      id="tourImage"
                      className="hidden"
                      accept={ACCEPTED_IMAGE_TYPES.join(',')}
                      onChange={handleImageUpload}
                    />
                    <p className="text-xs font-medium text-gray-400 mt-2">
                      PNG, JPG, SVG and WEBP are allowed (max 5MB)
                    </p>
                  </label>
                ) : (
                  <div className="relative lg:min-w-[332px] min-w-full h-[285px] lg:h-[364px]">
                    <img
                      src={images[0].url}
                      alt="Tour cover"
                      className="w-full h-full object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(0)}
                      className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )
              ) : (
                <div className="space-y-4">
                  <label
                    htmlFor="tourImage"
                    className={cn(
                      'bg-white dark:bg-gray-300 font-semibold rounded-md w-full',
                      'flex flex-col items-center justify-center cursor-pointer',
                      'border border-slate-200 shadow-md p-5 relative',
                      error && 'border-red-500',
                    )}
                  >
                    <UploadIcon className="w-15 fill-color-black pb-5" />
                    <span>Add Tour Image</span>
                    <input
                      type="file"
                      id="tourImage"
                      className="hidden"
                      accept={ACCEPTED_IMAGE_TYPES.join(',')}
                      onChange={handleImageUpload}
                      multiple
                      disabled={images.length >= MAX_IMAGES_LENGTH}
                    />
                    <p className="text-xs font-medium text-gray-400 mt-2">
                      PNG, JPG, SVG and WEBP are allowed (max 5MB) •{' '}
                      {MAX_IMAGES_LENGTH - images.length} remaining
                    </p>
                  </label>

                  {images.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {images.map((image, index) => (
                        <div key={image.url} className="relative aspect-video">
                          <img
                            src={image.url}
                            alt={`Tour image ${index + 1}`}
                            className="w-full h-full object-cover rounded-md"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </FormControl>
          {error && (
            <p className="text-[0.8rem] font-medium text-destructive mt-2">
              {error}
            </p>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

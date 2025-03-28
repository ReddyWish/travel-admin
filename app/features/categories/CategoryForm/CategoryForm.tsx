import { useNavigate } from 'react-router';
import { useGetCategoryQuery } from '~/features/categories/CategoryForm/__generated__/GetCategory';
import { useCreateCategoryMutation } from '~/features/categories/CategoryForm/__generated__/CreateCategory';
import { toast } from '~/hooks/use-toast';
import { z } from 'zod';
import { tourCategorySchema } from '~/features/categories/schemas/tour-category-schema';
import { useUpdateCategoryMutation } from '~/features/categories/CategoryForm/__generated__/UpdateCategory';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import { Spinner } from '~/shared/components/Spinner';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/shared/components/ui/form';
import { cn } from '~/lib/cn';
import { type ChangeEvent, useEffect, useState } from 'react';
import { UploadIcon } from '~/shared/icons/UploadIcon';
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE,
} from '~/shared/constants/imagesParams';
import { Input } from '~/shared/components/ui/input';
import { Textarea } from '~/shared/components/ui/textarea';
import { X } from 'lucide-react';
import { getCategoryImageUrl } from '~/features/categories/utils/getCategoryImageUrl';
import { Button } from '~/shared/components/ui/button';

export default function CategoryForm({ id }: { id?: string }) {
  const [error, setError] = useState<string>('');
  const isEditMode = Boolean(id);

  const navigate = useNavigate();

  const { data: categoryData, loading: categoryDataLoading } =
    useGetCategoryQuery({
      variables: { id: id || '' },
      skip: !isEditMode,
    });

  const category = categoryData?.category;

  console.log(category);

  type Inputs = z.infer<typeof tourCategorySchema>;

  const methods = useForm<Inputs>({
    resolver: zodResolver(tourCategorySchema),
  });

  const {
    handleSubmit,
    reset,
    trigger,
    setValue,
    control,
    getFieldState,
    getValues,
    setError: setFormError,
    watch,
    formState: { isValid },
  } = methods;

  const { error: formImageError } = getFieldState('image');

  const image = watch('image');

  // console.log(getCategoryImageUrl(image));

  const submitForm = handleSubmit((data) => {
    processForm(data);
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    if (isEditMode && id) {
      await updateCategory({
        variables: {
          id,
          input: data,
        },
      });
    } else {
      await createCategory({
        variables: {
          input: data,
        },
      });
    }
  };

  const [createCategory, { loading: createCategoryLoading }] =
    useCreateCategoryMutation({
      onCompleted: (data) => {
        toast({
          title: 'Success',
          description: `Category ${data.createCategory.name} successfully created.`,
        });
        reset();
        navigate('/categories');
      },
      onError: (error) => {
        console.log(error);
        toast({
          title: 'Error',
          description: `Error while creating the category`,
        });
      },
    });

  const [updateCategory, { loading: updateCategoryLoading }] =
    useUpdateCategoryMutation({
      onCompleted: (data) => {
        toast({
          title: 'Success',
          description: `Category ${data.updateCategory.name} successfully created.`,
        });
        reset();
        navigate('/categories');
      },
      onError: (error) => {
        console.log(error);
        toast({
          title: 'Error',
          description: `Error while updating the category`,
        });
      },
    });

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    setError('');
    await trigger('image');

    const file = e.target.files?.[0];

    if (!file) return;

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setFormError('image', {
        message: 'File type not supported, please upload PNG, JPG, SVG or WEBP',
      });
      e.target.value = '';
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setFormError('image', {
        message: 'File is too large. Maximum size is 5MB',
      });
      e.target.value = '';
      return;
    }

    try {
      setValue('image', { file }, { shouldValidate: true });
      e.target.value = '';
    } catch (error) {
      setError('Failed to upload image(s)');
    }
  };

  const removeImage = () => {
    setValue('image', {}, { shouldValidate: true });
  };

  useEffect(() => {
    if (isEditMode && category) {
      reset({
        name: category?.name || '',
        description: category.description || '',
        image: category.imageUrl ? { imageUrl: category.imageUrl } : {},
      });
    }
  }, [isEditMode, category]);

  return (
    <div className="pb-5">
      {categoryDataLoading ? (
        <div className="flex items-center justify-center h-[70dvh]">
          <Spinner />
        </div>
      ) : (
        <FormProvider {...methods}>
          <form onSubmit={submitForm} encType="multipart/form-data">
            <div className="flex flex-col lg:flex-row gap-7">
              <FormField
                control={control}
                name="image"
                render={() => (
                  <div className="relative flex-1">
                    {image && (image.file || image.imageUrl) ? (
                      <div className="relative lg:min-w-[332px] min-w-full h-[285px] lg:h-[364px]">
                        <img
                          src={getCategoryImageUrl(image)}
                          alt="Tour cover"
                          className="w-full h-full object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <FormItem>
                        <FormControl>
                          <div>
                            <label
                              htmlFor="image"
                              className={cn(
                                'bg-white dark:bg-gray-300 font-semibold rounded-md min-h-[285px] lg:min-h-[364px]',
                                'flex flex-col items-center justify-center cursor-pointer h-',
                                'border border-slate-200 shadow-md lg:p-3 p-5 relative',
                                (error || formImageError) && 'border-red-500',
                              )}
                            >
                              <UploadIcon className="w-15 fill-color-black" />
                              <span>Upload tour cover</span>
                              <input
                                type="file"
                                id="image"
                                className="hidden"
                                multiple={false}
                                accept={ACCEPTED_IMAGE_TYPES.join(',')}
                                onChange={handleImageUpload}
                              />
                              <p className="text-xs font-medium text-gray-400 mt-2">
                                PNG, JPG, SVG and WEBP are allowed (max 5MB)
                              </p>
                            </label>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                    <FormMessage className="absolute left-0 bottom-[-20px] " />
                  </div>
                )}
              />
              <div className="flex flex-col flex-1 gap-7">
                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category Name</FormLabel>
                      <FormControl>
                        <Input
                          id="name"
                          placeholder="Enter category name"
                          className="margin-0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="absolute buttom-[20px]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="relative w-full flex flex-col flex-grow">
                      <FormLabel htmlFor="description">Description</FormLabel>
                      <FormControl className="m-0">
                        <Textarea
                          placeholder="Enter tours description"
                          id="description"
                          className="resize-none h-30 lg:h-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="absolute bottom-[-20px]" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={
                !isValid || createCategoryLoading || updateCategoryLoading
              }
              className="w-full mt-7"
            >
              {createCategoryLoading || updateCategoryLoading ? (
                <Spinner />
              ) : isEditMode ? (
                'Update Category'
              ) : (
                'Create Category'
              )}
            </Button>
          </form>
        </FormProvider>
      )}
    </div>
  );
}

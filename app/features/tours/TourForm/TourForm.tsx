import { useEffect, useState } from 'react';
import { z } from 'zod';
import { useNavigate } from 'react-router';
import { FORM_STEPS } from '~/features/tours/constants/formSteps';
import StepOne from '~/features/tours/TourForm/StepOne';
import StepThree from '~/features/tours/TourForm/StepThree';
import StepTwo from '~/features/tours/TourForm/StepTwo';
import StepFour from '~/features/tours/TourForm/StepFour';
import StepFive from '~/features/tours/TourForm/StepFive';
import StepSix from '~/features/tours/TourForm/StepSix';
import FormStep from '~/features/tours/components/FormStep';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import { useGetCurrenciesQuery } from '~/features/currencies/CurrenciesTable/__generated__/GetCurrencies';
import { createTourFormSchema } from '~/features/tours/schemas/tour-form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateTourMutation } from '~/features/tours/TourForm/__generated__/CreateTour';
import { toast } from '~/hooks/use-toast';
import { useGetTourQuery } from '~/features/tours/TourForm/__generated__/GetTour';
import { useUpdateTourMutation } from '~/features/tours/TourForm/__generated__/UpdateTour';
import { Spinner } from '~/shared/components/Spinner';
import { useGetCategoriesQuery } from '~/features/tours/TourForm/__generated__/GetCategories';
import {
  AccommodationStars,
  type Category,
  type TourAccommodationCreateInput,
} from '~/__generated__/types';

export default function TourForm({ id }: { id?: string }) {
  const [currentStep, setCurrentStep] = useState(0);

  const isEditMode = Boolean(id);

  const navigate = useNavigate();

  const { data } = useGetCurrenciesQuery();

  const { data: tourData, loading: tourLoading } = useGetTourQuery({
    variables: { id: id || '' },
    skip: !isEditMode,
  });

  const { data: categoriesData, loading: categoriesDataLoading } =
    useGetCategoriesQuery();

  const tour = tourData?.tour;

  const [createTour, { loading: createTourLoading }] = useCreateTourMutation({
    onCompleted: (data) => {
      toast({
        title: 'Success',
        description: `Tour ${data.createTour.title} successfully created.`,
      });
      setCurrentStep(0);
      reset();
      navigate('/tours');
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Error while creating the tour`,
      });
    },
  });

  const [updateTour, { loading: updateTourLoading }] = useUpdateTourMutation({
    onCompleted: (data) => {
      toast({
        title: 'Success',
        description: `Tour ${data.updateTour.title} successfully updated.`,
      });
      setCurrentStep(0);
      reset();
      navigate('/tours');
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Error while updating the tour`,
      });
    },
  });

  const currencyIds = data?.currencies.map((currency) => currency.id);

  const tourFormSchema = createTourFormSchema(currencyIds || []);

  type Inputs = z.infer<typeof tourFormSchema>;

  const methods = useForm<Inputs>({
    resolver: zodResolver(tourFormSchema),
    defaultValues: {
      categoryIds: [],
      price: [],
      title: '',
      shortDescription: '',
      description: '',
      location: '',
      isBestSeller: false,
      durationDays: 0,
      program: [],
      images: [],
      inclusions: [],
      exclusions: [],
      accommodations: [{ hotelName: '', stars: undefined }],
    },
  });

  const { handleSubmit, reset, trigger, clearErrors, getValues } = methods;

  const submitForm = handleSubmit((data) => {
    processForm(data);
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    if (isEditMode && id) {
      await updateTour({
        variables: {
          id,
          input: {
            ...data,
            accommodations:
              data?.accommodations[0]?.hotelName === undefined ||
              data?.accommodations[0]?.hotelName === ''
                ? undefined
                : data.accommodations.filter(
                    (
                      acc,
                    ): acc is {
                      hotelName: string;
                      stars?: AccommodationStars;
                    } => acc.hotelName !== undefined && acc.hotelName !== '',
                  ),
          },
        },
      });
    } else {
      await createTour({
        variables: {
          input: {
            ...data,
            accommodations:
              data?.accommodations[0]?.hotelName === undefined ||
              data?.accommodations[0]?.hotelName === ''
                ? undefined
                : data.accommodations.filter(
                    (
                      acc,
                    ): acc is {
                      hotelName: string;
                      stars?: AccommodationStars;
                    } => acc.hotelName !== undefined && acc.hotelName !== '',
                  ),
          },
        },
      });
    }
  };

  type FieldName = keyof Inputs;

  const navigateToStep = async (stepIndex: number) => {
    if (stepIndex === currentStep) return;

    if (stepIndex > currentStep) {
      for (let i = currentStep; i < stepIndex; i++) {
        const fields = FORM_STEPS[i].fields;
        const isValid = await trigger(fields as FieldName[], {
          shouldFocus: true,
        });

        if (!isValid) {
          toast({
            title: 'Information is not Complete',
            description: `Please complete Step ${i + 1} before proceeding.`,
            variant: 'default',
          });
          return;
        }
      }
    } else {
      clearErrors();
    }

    setCurrentStep(stepIndex);
  };

  const goToNextStep = async () => {
    if (currentStep >= FORM_STEPS.length - 1) return;
    const fields = FORM_STEPS[currentStep].fields;
    const output = await trigger(fields as FieldName[], { shouldFocus: false });
    if (!output) return;
    setCurrentStep((step) => step + 1);
  };

  const goToPrevStep = () => {
    if (currentStep <= 0) return;
    clearErrors();
    setCurrentStep((step) => step - 1);
  };

  const stepProps = {
    title: FORM_STEPS[currentStep].title,
    description: FORM_STEPS[currentStep].description,
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <StepOne categories={categoriesData?.categories as Category[]} />
        );
      case 1:
        return <StepTwo />;
      case 2:
        return <StepThree />;
      case 3:
        return <StepFour />;
      case 4:
        return <StepFive />;
      case 5:
        return (
          <StepSix
            isLoading={createTourLoading || updateTourLoading}
            categories={categoriesData?.categories as Category[]}
          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    if (isEditMode && tour) {
      reset({
        title: tour?.title || '',
        shortDescription: tour?.shortDescription || '',
        description: tour?.description || '',
        location: tour?.location || '',
        isBestSeller: tour?.isBestSeller,
        categoryIds: tour.categories.map((cat) => cat.id),
        durationDays: tour?.durationDays,
        price: tour?.price.map((p) => ({
          currencyId: p.currencyId,
          amount: p.amount,
          comment: p.comment || '',
        })),
        program: tour?.program.map((p) => ({
          order: p.order,
          title: p.title,
          description: p.description || '',
          startTime: p.startTime || '',
        })),
        images: tour?.images.map((img) => ({
          url: img.url,
          optimizedUrl: img.optimizedUrl,
          thumbnailUrl: img.thumbnailUrl,
          isPrimary: img.isPrimary,
        })),
        inclusions: tour?.inclusions.map((item) => ({
          description: item.description,
        })),
        exclusions: tour?.exclusions.map((item) => ({
          description: item.description,
        })),
        accommodations: tour?.accommodations?.map((acc) => ({
          hotelName: acc.hotelName,
          stars: acc.stars as AccommodationStars,
        })),
      });
    }
  }, [isEditMode, tour]);

  return (
    <div className="pb-5">
      {/*PROGRESS*/}
      <nav aria-label="Progress">
        <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
          {FORM_STEPS.map((step, index) => (
            <li key={step.name} className="md:flex-1">
              <button
                type="button"
                onClick={() => navigateToStep(index)}
                className="w-full text-left focus:outline-none"
                disabled={createTourLoading}
              >
                {currentStep >= index ? (
                  <div className="group flex w-full flex-col border-l-4 border-sky-300 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4 transition-colors delay-100">
                    <span className="text-sm font-medium text-sky-300 transition-all delay-150">
                      {step.id}
                    </span>
                    <span className="text-sm font-medium text-black dark:text-white">
                      {step.name}
                    </span>
                  </div>
                ) : (
                  <div className="group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4 transition-colors delay-100">
                    <span className="text-sm font-medium text-gray-500 transition-colors delay-100">
                      {step.id}
                    </span>
                    <span className="text-sm font-medium text-gray-500">
                      {step.name}
                    </span>
                  </div>
                )}
              </button>
            </li>
          ))}
        </ol>
      </nav>

      {/*FORM*/}
      {tourLoading ? (
        <div className="flex items-center justify-center h-[70dvh]">
          <Spinner />
        </div>
      ) : (
        <FormProvider {...methods}>
          <form onSubmit={submitForm} encType="multipart/form-data">
            <FormStep {...stepProps}>{renderStep()}</FormStep>
          </form>
        </FormProvider>
      )}

      {/*NAVIGATION*/}
      <div className="mt-8 py-5">
        <div className="flex justify-between">
          <button
            type="button"
            onClick={goToPrevStep}
            disabled={currentStep === 0}
            className="rounded bg-white px-4 py-2 text-md text-black shadow-md hover:text-sky-400 hover:shadow-l disabled:cursor-not-allowed disabled:opacity-50 transition-all delay-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={goToNextStep}
            disabled={currentStep === FORM_STEPS.length - 1}
            className="rounded bg-white px-4 py-2 text-md text-black shadow-md hover:text-sky-400 disabled:cursor-not-allowed disabled:opacity-50 transition-all delay-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

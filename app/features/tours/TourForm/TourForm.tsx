import { createContext, type ReactNode, useContext, useState } from 'react';
import { z } from 'zod';
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
import { TourFormContextProvider } from '~/features/tours/TourForm/TourFormContext';

export default function TourForm() {
  const [currentStep, setCurrentStep] = useState(0);

  const { data, loading } = useGetCurrenciesQuery();

  const [createTour, { loading: createTourLoading }] = useCreateTourMutation({
    onCompleted: (data) => {
      toast({
        title: 'Success',
        description: `Tour ${data.createTour.title} successfully created.`,
      });
      setCurrentStep(0);
      reset();
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Error while creating the tour`,
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
    },
  });

  const { handleSubmit, reset, trigger, control, clearErrors, getValues } =
    methods;

  console.log(getValues());

  const submitForm = handleSubmit((data) => {
    processForm(data);
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    try {
      await createTour({
        variables: {
          input: data,
        },
      });
    } catch (error) {
      console.error(error);
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
        return <StepOne />;
      case 1:
        return <StepTwo />;
      case 2:
        return <StepThree />;
      case 3:
        return <StepFour />;
      case 4:
        return <StepFive />;
      case 5:
        return <StepSix />;
      default:
        return null;
    }
  };

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
      <TourFormContextProvider>
        <FormProvider {...methods}>
          <form onSubmit={submitForm}>
            <FormStep {...stepProps}>{renderStep()}</FormStep>
          </form>
        </FormProvider>
      </TourFormContextProvider>

      {/*NAVIGATION*/}
      <div className="mt-8 pt-5">
        <div className="flex justify-between">
          <button
            type="button"
            onClick={goToPrevStep}
            disabled={currentStep === 0}
            className="rounded bg-white px-2 py-1 text-md font-semibold text-black shadow-md hover:text-sky-300 disabled:cursor-not-allowed disabled:opacity-50 transition-all delay-100"
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
            className="rounded bg-white px-2 py-1 text-md font-semibold text-black shadow-md hover:text-sky-300 disabled:cursor-not-allowed disabled:opacity-50 transition-all delay-100"
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

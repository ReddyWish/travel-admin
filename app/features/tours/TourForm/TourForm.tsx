import { useEffect, useState } from 'react';
import { FORM_STEPS } from '~/features/tours/constants/formSteps';
import StepOne from '~/features/tours/TourForm/StepOne';
import StepThree from '~/features/tours/TourForm/StepThree';
import StepTwo from '~/features/tours/TourForm/StepTwo';
import StepFour from '~/features/tours/TourForm/StepFour';
import StepFive from '~/features/tours/TourForm/StepFive';
import StepSix from '~/features/tours/TourForm/StepSix';
import { useSearchParams } from 'react-router';
import FormStep from '~/features/tours/components/FormStep';
import { FormProvider, useForm } from 'react-hook-form';
import { useGetCurrenciesQuery } from '~/features/currencies/CurrenciesTable/__generated__/GetCurrencies';
import { createTourFormSchema } from '~/features/tours/schemas/tour-form-schema';
import { z } from 'zod';

export default function TourForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(0);

  const { data, loading } = useGetCurrenciesQuery();

  const currencyIds = data?.currencies.map((currency) => currency.id);

  const TourFormSchema = createTourFormSchema(currencyIds || []);

  type Inputs = z.infer<typeof TourFormSchema>;

  const methods = useForm();

  const { handleSubmit, reset, trigger, control, clearErrors } = methods;

  const goToNextStep = async () => {
    if (currentStep >= FORM_STEPS.length - 1) return;

    setCurrentStep((step) => step + 1);
  };

  const goToPrevStep = () => {
    if (currentStep <= 0) return;
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
            </li>
          ))}
        </ol>
      </nav>

      {/*FORM*/}
      <FormProvider {...methods}>
        <form>
          <FormStep {...stepProps}>{renderStep()}</FormStep>
        </form>
      </FormProvider>

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

import { Input } from '~/shared/components/ui/input';
import { Textarea } from '~/shared/components/ui/textarea';
import { X, Plus, Loader } from 'lucide-react';
import { Button } from '~/shared/components/ui/button';
import { useFieldArray, useFormContext } from 'react-hook-form';
import type { Inputs } from '~/features/tours/types/FormInputs';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/shared/components/ui/form';
import { useGetCurrenciesQuery } from '~/features/currencies/CurrenciesTable/__generated__/GetCurrencies';
import { useEffect, useState } from 'react';

interface PeopleCountErrors {
  [key: number]: string;
}

export default function StepTwo() {
  const [peopleCountErrors, setPeopleCountErrors] = useState<PeopleCountErrors>(
    {},
  );
  const { data, loading } = useGetCurrenciesQuery();
  const {
    control,
    watch,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useFormContext<Inputs>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tourPackages',
  });

  console.log(getValues('peopleCount'));

  const totalCapacity = watch('peopleCount');

  useEffect(() => {
    if (totalCapacity && fields.length > 0) {
      validateAllPackages();
    }
  }, [totalCapacity]);

  const validatePackagePeopleCount = (packageIndex: number, value: number) => {
    const tourCapacity = getValues('peopleCount');

    const newErrors = { ...peopleCountErrors };

    if (value > tourCapacity) {
      newErrors[packageIndex] =
        `People number cannot exceed tour capacity (${tourCapacity})`;
    } else {
      delete newErrors[packageIndex];
    }

    setPeopleCountErrors(newErrors);
    return value <= tourCapacity;
  };

  const validateAllPackages = () => {
    const tourCapacity = getValues('peopleCount');
    const newErrors = {} as PeopleCountErrors;

    fields.forEach((field, index) => {
      const packagePeopleCount = getValues(`tourPackages.${index}.peopleCount`);
      if (packagePeopleCount > tourCapacity) {
        newErrors[index] =
          `People number cannot exceed tour capacity (${tourCapacity})`;
      }
    });

    setPeopleCountErrors(newErrors);
  };

  const createTourPackage = () => {
    if (!data?.currencies?.length) return [];

    const prices = data.currencies.map((currency) => ({
      currencyId: currency.id,
      amount: 0,
    }));

    return {
      peopleCount: 0,
      comment: '',
      prices,
    };
  };

  const handleAddTourPackage = () => {
    if (fields.length < 10) {
      append(createTourPackage());
    }
  };

  useEffect(() => {
    if (
      fields.length === 0 &&
      data?.currencies?.length &&
      (!watch('tourPackages') || watch('tourPackages')?.length === 0)
    ) {
      append(createTourPackage());
    }
  }, [data?.currencies, fields.length, append, watch]);

  if (!data?.currencies?.length) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col gap-4">
      {fields.map((field, packageIndex) => (
        <div
          key={field.id}
          className="border border-slate-200 rounded-md shadow-sm p-5 relative"
        >
          <div className="flex flex-col gap-4">
            <FormField
              control={control}
              name={`tourPackages.${packageIndex}.peopleCount`}
              render={({ field, fieldState }) => (
                <FormItem className="relative grid w-full items-center">
                  <FormLabel>People Number</FormLabel>
                  <FormControl className="m-0">
                    <Input
                      type="number"
                      placeholder="Enter people number"
                      {...field}
                      onChange={(e) => {
                        const value =
                          e.target.value === '' ? '' : Number(e.target.value);
                        field.onChange(value);
                        validatePackagePeopleCount(
                          packageIndex,
                          e.target.valueAsNumber,
                        );
                      }}
                    />
                  </FormControl>
                  {fieldState.error ? (
                    <FormMessage className="absolute bottom-[-20px]" />
                  ) : (
                    peopleCountErrors[packageIndex] && (
                      <p className="text-[0.8rem] font-medium text-destructive absolute bottom-[-20px]">
                        {peopleCountErrors[packageIndex]}
                      </p>
                    )
                  )}
                </FormItem>
              )}
            />

            <div className="flex flex-col md:flex-row gap-5">
              {data?.currencies.map((currency, currencyIndex) => (
                <FormField
                  key={currency.id}
                  control={control}
                  name={`tourPackages.${packageIndex}.prices.${currencyIndex}.amount`}
                  render={({ field }) => (
                    <FormItem className="relative flex-1">
                      <FormLabel>{currency.code}</FormLabel>
                      <FormControl className="m-0">
                        <Input
                          type="number"
                          placeholder={`Price in ${currency.code}`}
                          {...field}
                          value={field.value || ''}
                          onChange={(e) => {
                            field.onChange(Number(e.target.value));
                            // Ensure the currencyId is set
                            setValue(
                              `tourPackages.${packageIndex}.prices.${currencyIndex}.currencyId`,
                              currency.id,
                            );
                          }}
                        />
                      </FormControl>
                      <FormMessage className="absolute bottom-[-20px]" />
                    </FormItem>
                  )}
                />
              ))}
            </div>

            <FormField
              control={control}
              name={`tourPackages.${packageIndex}.comment`}
              render={({ field }) => (
                <FormItem className="relative flex-1">
                  <FormLabel>Tour Package Description</FormLabel>
                  <FormControl className="m-0">
                    <Textarea
                      placeholder="Tour Package Description"
                      className="resize-none h-21"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage className="absolute bottom-[-20px]" />
                </FormItem>
              )}
            />

            {packageIndex > 0 && (
              <Button
                size="icon"
                className="absolute top-1 right-1 hover:text-sky-300 border-none shadow-none hover:shadow-none"
                onClick={() => remove(packageIndex)}
                type="button"
              >
                <X />
              </Button>
            )}
          </div>
        </div>
      ))}

      {fields.length < 10 && (
        <Button
          className="mt-5 w-1/5 cursor-pointer"
          onClick={handleAddTourPackage}
          disabled={loading}
          type="button"
        >
          Add Package <Plus className="ml-2" />
        </Button>
      )}
    </div>
  );
}

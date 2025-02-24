import { Input } from '~/shared/components/ui/input';
import { Textarea } from '~/shared/components/ui/textarea';
import { X, Plus } from 'lucide-react';
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
import { useEffect } from 'react';

export default function StepTwo() {
  const { data, loading } = useGetCurrenciesQuery();
  console.log(data);
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<Inputs>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'price',
  });
  console.log(fields);

  const createPriceGroup = () => {
    if (!data?.currencies?.length) return [];

    return data.currencies.map((currency) => ({
      currencyId: currency.id,
      amount: 0,
      comment: '',
    }));
  };

  const handleAddPriceGroup = () => {
    if (fields.length < 10) {
      append(createPriceGroup());
    }
    return;
  };

  const handleRemovePriceGroup = (groupIndex: number) => {
    const currencyCount = data?.currencies?.length || 0;
    const startIndex = groupIndex * currencyCount;
    remove(Array.from({ length: currencyCount }, (_, i) => startIndex + i));
  };

  const handleCommentChange = (groupIndex: number, newComment: string) => {
    const currencyCount = data?.currencies?.length || 0;
    const startIndex = groupIndex * currencyCount;

    Array.from({ length: currencyCount }).forEach((_, i) => {
      setValue(`price.${startIndex + i}.comment`, newComment);
    });
  };

  const priceGroups = data?.currencies?.length
    ? fields.length / data.currencies.length
    : 0;

  useEffect(() => {
    if (
      fields.length === 0 &&
      data?.currencies?.length &&
      watch('price')?.length === 0
    ) {
      append(createPriceGroup());
    }
  }, [data?.currencies, fields.length, append]);

  return (
    <div className="flex flex-col gap-4">
      <div className="border border-slate-200 rounded-md shadow-sm p-5 relative">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-5">
            {data?.currencies.map((currency, currencyIndex) => (
              <FormField
                key={currency.id}
                control={control}
                name={`price.${currencyIndex}.amount`}
                render={({ field }) => (
                  <FormItem className="relative flex-1">
                    <FormLabel>{currency.code}</FormLabel>
                    <FormControl className="m-0">
                      <Input
                        type="number"
                        placeholder={`Price in ${currency.code}`}
                        {...field}
                        onChange={(e) => {
                          field.onChange(Number(e.target.value));
                          setValue(
                            `price.${currencyIndex}.currencyId`,
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
            name="price.0.comment"
            render={({ field }) => (
              <FormItem className="relative flex-1">
                <FormLabel>Comment</FormLabel>
                <FormControl className="m-0">
                  <Textarea
                    placeholder="Describe the price"
                    className="resize-none h-21"
                    {...field}
                    onChange={(e) => handleCommentChange(0, e.target.value)}
                  />
                </FormControl>
                <FormMessage className="absolute bottom-[-20px]" />
              </FormItem>
            )}
          />
        </div>
      </div>

      {data?.currencies &&
        fields.length > data?.currencies?.length &&
        Array.from({ length: priceGroups - 1 }).map((_, index) => {
          const groupIndex = index + 1;
          return (
            <div
              key={groupIndex}
              className="border border-slate-200 rounded-md shadow-sm p-5 relative"
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-5">
                  {data?.currencies.map((currency, currencyIndex) => (
                    <FormField
                      key={currency.id}
                      control={control}
                      name={`price.${groupIndex * data.currencies.length + currencyIndex}.amount`}
                      render={({ field }) => (
                        <FormItem className="relative flex-1">
                          <FormLabel>{currency.code}</FormLabel>
                          <FormControl className="m-0">
                            <Input
                              type="number"
                              placeholder={`Price in ${currency.code}`}
                              {...field}
                              onChange={(e) => {
                                field.onChange(Number(e.target.value));
                                setValue(
                                  `price.${groupIndex * data.currencies.length + currencyIndex}.currencyId`,
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
                  name={`price.${groupIndex * 2}.comment`}
                  render={({ field }) => (
                    <FormItem className="relative flex-1">
                      <FormLabel>Comment</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the price"
                          className="resize-none h-21"
                          {...field}
                          onChange={(e) =>
                            handleCommentChange(groupIndex, e.target.value)
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button
                  size="icon"
                  className="absolute top-1 right-1 hover:text-sky-300 border-none shadow-none hover:shadow-none"
                  onClick={() => handleRemovePriceGroup(groupIndex)}
                >
                  <X />
                </Button>
              </div>
            </div>
          );
        })}

      {fields.length < 10 && (
        <Button
          className="mt-5 w-1/5 cursor-pointer"
          onClick={handleAddPriceGroup}
          disabled={loading || !data?.currencies?.length}
          type="button"
        >
          Add Price <Plus className="ml-2" />
        </Button>
      )}
    </div>
  );
}

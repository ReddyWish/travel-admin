import { Title } from '~/shared/components/Title';
import { Input } from '~/shared/components/ui/input';
import { Separator } from '~/shared/components/ui/separator';
import { Button } from '~/shared/components/ui/button';
import { Plus, X } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import type { Inputs } from '~/features/tours/types/FormInputs';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '~/shared/components/ui/form';

export default function StepFive() {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<Inputs>();
  const {
    fields: inclusionsFields,
    append: appendInclusion,
    remove: removeInclusion,
  } = useFieldArray({
    control,
    name: 'inclusions',
  });
  const {
    fields: exclusionsFields,
    append: appendExclusion,
    remove: removeExclusion,
  } = useFieldArray({
    control,
    name: 'exclusions',
  });

  const handleAddInclusion = () => {
    if (inclusionsFields.length < 15) {
      appendInclusion({
        description: '',
      });
    }
  };

  const handleAddExclusion = () => {
    if (exclusionsFields.length < 15) {
      appendExclusion({
        description: '',
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-bold">
        This step is optional - you can skip it if you prefer
      </h3>
      <div className="flex gap-4">
        <div className="w-1/2">
          <div className="flex gap-2 pb-4">
            <Title type="h2">Inclusions</Title>
            {inclusionsFields.length < 15 && (
              <Button onClick={handleAddInclusion} type="button">
                <Plus />
              </Button>
            )}
          </div>
          <div className="flex flex-col gap-4 w-full">
            {inclusionsFields.length === 0 && (
              <Input
                placeholder="Enter what's included"
                className="w-full opacity-0.5"
                disabled={true}
              />
            )}
            {inclusionsFields.map((field, index) => (
              <div className="flex gap-1">
                <FormField
                  control={control}
                  name={`inclusions.${index}.description`}
                  render={({ field }) => (
                    <FormItem className="relative w-full">
                      <FormControl>
                        <Input
                          {...field}
                          id={`inclusions-${index}`}
                          placeholder="Enter what's included"
                        />
                      </FormControl>
                      <FormMessage className="absolute bottom-[-15px]" />
                    </FormItem>
                  )}
                />
                <Button
                  size="icon"
                  className=" top-1 right-1 hover:text-sky-300"
                  type="button"
                  onClick={() => removeInclusion(index)}
                >
                  <X />
                </Button>
              </div>
            ))}
          </div>
        </div>
        <Separator orientation="vertical" />
        <div className="w-1/2">
          <div className="flex gap-2 pb-4">
            <Title type="h2">Exclusions</Title>
            {exclusionsFields.length < 15 && (
              <Button onClick={handleAddExclusion} type="button">
                <Plus />
              </Button>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full">
            {exclusionsFields.length === 0 && (
              <Input
                placeholder="Enter what's excluded"
                className="w-full opacity-0.5"
                disabled={true}
              />
            )}
            {exclusionsFields.map((field, index) => (
              <div className="flex gap-1">
                <FormField
                  control={control}
                  name={`exclusions.${index}.description`}
                  render={({ field }) => (
                    <FormItem className="relative w-full">
                      <FormControl>
                        <Input
                          {...field}
                          id={`exclusions-${index}`}
                          placeholder="Enter what's excluded"
                        />
                      </FormControl>
                      <FormMessage className="absolute bottom-[-20px]" />
                    </FormItem>
                  )}
                />
                <Button
                  size="icon"
                  className=" top-1 right-1 hover:text-sky-300"
                  type="button"
                  onClick={() => removeExclusion(index)}
                >
                  <X />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

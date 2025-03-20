import { Input } from '~/shared/components/ui/input';
import { Textarea } from '~/shared/components/ui/textarea';
import { Plus, X } from 'lucide-react';
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

export default function StepThree() {
  const {
    control,
    formState: { errors },
  } = useFormContext<Inputs>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'program',
  });

  const handleAddProgram = () => {
    if (fields.length < 10) {
      append({
        order: fields.length,
        startTime: '',
        title: '',
        description: '',
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {fields.length === 0 && (
        <h3 className="font-bold">
          This step is optional - you can skip it if you prefer
        </h3>
      )}
      {fields.map((field, index) => (
        <div key={field.id}>
          <div
            key={index}
            className="border-1 border-slate-200 rounded-md shadow-sm p-5 relative"
          >
            <div className="flex flex-col gap-5 pb-5 md:flex-row">
              <h3 className="text-lg font-medium self-center dark:text-white">
                {index + 1}.
              </h3>
              <div className="flex flex-col flex-1 gap-4">
                <div className="flex w-full gap-5">
                  <FormField
                    control={control}
                    name={`program.${index}.startTime`}
                    render={({ field }) => (
                      <FormItem className="relative w-full md:w-1/4">
                        <FormLabel htmlFor={`program.${index}.startTime`}>
                          Start Time
                        </FormLabel>
                        <FormControl className="m-0">
                          <Input
                            id={`program.${index}.startTime`}
                            type="text"
                            placeholder="9:00 AM or Day 1"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="absolute bottom-[-20px]" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name={`program.${index}.title`}
                    render={({ field }) => (
                      <FormItem className="relative w-full md:w-3/4">
                        <FormLabel htmlFor={`program.${index}.title`}>
                          Activity
                        </FormLabel>
                        <FormControl className="m-0">
                          <Input
                            id={`program.${index}.title`}
                            type="text"
                            placeholder="Enter activity title"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="absolute bottom-[-20px]" />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={control}
                  name={`program.${index}.description`}
                  render={({ field }) => (
                    <FormItem className="relative w-full">
                      <FormLabel htmlFor={`program.${index}.description`}>
                        Activity Description
                      </FormLabel>
                      <FormControl className="m-0">
                        <Textarea
                          id={`program.${index}.description`}
                          placeholder="Enter activity description"
                          {...field}
                          className="resize-none"
                        />
                      </FormControl>
                      <FormMessage className="absolute bottom-[-20px]" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button
              size="icon"
              className=" absolute top-1 right-1 hover:text-sky-300 border-none shadow-none hover:shadow-none"
              onClick={() => remove(index)}
            >
              <X />
            </Button>
          </div>
        </div>
      ))}

      {fields.length === 0 && (
        <Button
          className="mt-4 w-full"
          onClick={handleAddProgram}
          type="button"
        >
          Create Program
        </Button>
      )}

      {fields.length < 10 && fields.length !== 0 && (
        <Button
          className="mt-4 w-full"
          onClick={handleAddProgram}
          type="button"
        >
          Add Program Item <Plus className="ml-2" />
        </Button>
      )}
    </div>
  );
}

import { Title } from '~/shared/components/Title';
import { Input } from '~/shared/components/ui/input';
import { Label } from '~/shared/components/ui/label';
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
    register,
    control,
    watch,
    setValue,
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
      {fields.map((field, index) => (
        <div>
          <div
            key={index}
            className="border-1 border-slate-200 rounded-md shadow-sm p-5 relative"
          >
            <div className="flex flex-col gap-4 pb-5 md:flex-row">
              <h3 className="text-lg font-medium">Activity {index + 1}</h3>
              <FormField
                control={control}
                name={`program.${index}.startTime`}
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/4">
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
                  <FormItem className="w-full md:w-3/4">
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
              <FormField
                control={control}
                name={`program.${index}.description`}
                render={({ field }) => (
                  <FormItem className="w-full md:w-3/4">
                    <FormLabel htmlFor={`program.${index}.description`}>
                      Activity Description
                    </FormLabel>
                    <FormControl className="m-0">
                      <Input
                        id={`program.${index}.description`}
                        type="text"
                        placeholder="Enter activity description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="absolute bottom-[-20px]" />
                  </FormItem>
                )}
              />
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

      {fields.length < 10 && (
        <Button
          className="mt-4 w-full md:w-1/3"
          onClick={handleAddProgram}
          type="button"
        >
          Add Program <Plus className="ml-2" />
        </Button>
      )}
    </div>
  );
}

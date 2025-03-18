import { useFormContext } from 'react-hook-form';
import { z } from 'zod';
import { createTourFormSchema } from '~/features/tours/schemas/tour-form-schema';
import { Button } from '~/shared/components/ui/button';

export default function StepSix() {
  const {
    formState: { isValid, isDirty },
  } = useFormContext();
  return (
    <Button type="submit" disabled={!isValid}>
      Create Tour
    </Button>
  );
}

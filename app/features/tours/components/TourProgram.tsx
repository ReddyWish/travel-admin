import { useState } from 'react';

type TourFragment = {
  id: number;
  value: string;
};

export default function TourProgram() {
  const [tourProgram, setTourProgram] = useState<TourFragment[] | []>([]);

  const addTourFragment = () => {
    const newId =
      tourProgram.length > 0
        ? Math.max(
            ...tourProgram.map((tourProgramFragment) => tourProgramFragment.id),
          ) + 1
        : 1;
    setTourProgram([...tourProgram, { id: newId, value: '' }]);
  };

  const removeTourFragment = (id: number) => {
    if (tourProgram.length === 1) return;
  };
}

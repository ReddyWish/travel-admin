import { createContext, type ReactNode, useContext, useState } from 'react';

type TourFormContextData = {
  categoryNames: string[];
  setCategoryNames: (names: string[]) => void;
};

const TourFormContext = createContext<TourFormContextData | undefined>(
  undefined,
);

export function TourFormContextProvider({ children }: { children: ReactNode }) {
  const [categoryNames, setCategoryNames] = useState<string[]>([]);

  return (
    <TourFormContext.Provider value={{ categoryNames, setCategoryNames }}>
      {children}
    </TourFormContext.Provider>
  );
}

export function useTourFormContextData() {
  const context = useContext(TourFormContext);
  if (!context) {
    throw new Error(
      'useTourFormContextData must be used within a TourFormContextProvider',
    );
  }
  return context;
}

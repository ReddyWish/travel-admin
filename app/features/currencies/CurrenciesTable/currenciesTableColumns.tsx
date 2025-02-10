import type { GetCurrenciesQuery } from '~/features/currencies/CurrenciesTable/__generated__/GetCurrencies';
import type { ColumnDef } from '@tanstack/react-table';

export type CurrencyFragment = GetCurrenciesQuery['currencies'][0];

export const currenciesTableColumns = (): ColumnDef<CurrencyFragment>[] => [
  {
    accessorKey: 'code',
    header: 'Currency Name',
  },
];

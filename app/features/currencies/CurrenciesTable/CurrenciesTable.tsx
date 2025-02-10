import { useGetCurrenciesQuery } from '~/features/currencies/CurrenciesTable/__generated__/GetCurrencies';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { currenciesTableColumns } from '~/features/currencies/CurrenciesTable/currenciesTableColumns';
import { Spinner } from '~/shared/components/Spinner';
import CustomTable from '~/shared/components/CustomTable';

export default function CurrenciesTable() {
  const { data, loading } = useGetCurrenciesQuery();

  const columns = currenciesTableColumns();

  const table = useReactTable({
    data: data?.currencies ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return loading ? (
    <div className="flex items-center justify-center min-h-[150px]">
      <Spinner />
    </div>
  ) : (
    <CustomTable table={table} columnCount={columns.length} />
  );
}

import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Spinner } from '~/shared/components/Spinner';
import { toursTableColumns } from '~/features/tours/ToursTable/toursTableColumns';
import { useNavigate } from 'react-router';
import {
  useGetToursQuery,
  GetToursDocument,
} from '~/features/tours/ToursTable/__generated__/GetTours';
import { useDeleteTourMutation } from '~/features/tours/ToursTable/__generated__/DeleteTour';
import CustomTable from '~/shared/components/CustomTable';
import { useToast } from '~/hooks/use-toast';
import { useGetCurrenciesQuery } from '~/features/currencies/CurrenciesTable/__generated__/GetCurrencies';
import { useState } from 'react';

export default function ToursTable() {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: toursData, loading: toursDataLoading } = useGetToursQuery();
  const { data: currenciesData } = useGetCurrenciesQuery();
  const [deleteTour, { loading: deleteTourLoading }] = useDeleteTourMutation({
    onCompleted: (data) => {
      toast({
        title: 'Success',
        description: `Tour ${data?.deleteTour.title} deleted`,
      });
    },
    refetchQueries: [GetToursDocument],
  });
  const columns = toursTableColumns({
    navigate,
    deleteTour,
    currenciesData,
    selectedCurrency,
    setSelectedCurrency,
  });

  const table = useReactTable({
    data: toursData?.tours ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return toursDataLoading ? (
    <div className="flex items-center justify-center min-h-[150px]">
      <Spinner />
    </div>
  ) : (
    <CustomTable table={table} columnCount={columns.length} />
  );
}

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

export default function ToursTable() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data, loading, error } = useGetToursQuery();
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
  });

  const table = useReactTable({
    data: data?.tours ?? [],
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

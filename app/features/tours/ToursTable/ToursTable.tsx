import {
  type ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHeader,
  TableHead,
} from '~/shared/components/ui/table';
import { Spinner } from '~/shared/components/Spinner';
import { toursTableColumns } from '~/features/tours/ToursTable/toursTableColumns';
import { useNavigate } from 'react-router';
import { useGetToursQuery } from '~/features/tours/ToursTable/__generated__/GetTours';
import { useDeleteTourMutation } from '~/features/tours/ToursTable/__generated__/DeleteTour';
import CustomTable from '~/shared/components/CustomTable';

export default function ToursTable() {
  const navigate = useNavigate();
  const { data, loading, error } = useGetToursQuery();
  const [deleteTour, { loading: deleteTourLoading }] = useDeleteTourMutation();
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

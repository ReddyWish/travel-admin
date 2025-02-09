import {
  type GetToursQuery,
  useGetToursQuery,
} from '~/features/tours/ToursTable/__generated__/ToursTable';
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
import type { GetToursQueryResult } from '~/features/tours/ToursTable/__generated__/ToursTable';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHeader,
  TableHead,
} from '~/shared/components/ui/table';
import { Spinner } from '~/shared/components/Spinner';
import { toursTableColumns } from '~/features/tours/ToursTable/ToursTableColumns';
import { useNavigate } from 'react-router';
import { useTourDeleteMutationMutation } from '~/features/tours/ToursTable/__generated__/TourDeleteMutation';

export default function ToursTable() {
  const navigate = useNavigate();
  const { data, loading, error } = useGetToursQuery();
  const [deleteTourMutation, { loading: deleteTourLoading }] =
    useTourDeleteMutationMutation();
  const columns = toursTableColumns({
    navigate,
    deleteTour: deleteTourMutation,
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
    <Table className="dark:text-white">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && 'selected'}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

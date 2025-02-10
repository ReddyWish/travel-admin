import { useGetCategoriesQuery } from '~/features/categories/CategoriesTable/__generated__/GetCategories';
import { useDeleteCategoryMutation } from '~/features/categories/CategoriesTable/__generated__/DeleteCategory';
import { categoriesTableColumns } from '~/features/categories/CategoriesTable/categoriesTableColumns';
import { useNavigate } from 'react-router';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Spinner } from '~/shared/components/Spinner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/shared/components/ui/table';
import CustomTable from '~/shared/components/CustomTable';

export default function CategoriesTable() {
  const navigate = useNavigate();
  const { data, loading, error } = useGetCategoriesQuery();
  const [deleteCategory, { loading: deleteCategoryLoading }] =
    useDeleteCategoryMutation();

  const columns = categoriesTableColumns({
    navigate,
    deleteCategory,
  });

  const table = useReactTable({
    data: data?.categories ?? [],
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

import {
  useGetCategoriesQuery,
  GetCategoriesDocument,
} from '~/features/categories/CategoriesTable/__generated__/GetCategories';
import { useDeleteCategoryMutation } from '~/features/categories/CategoriesTable/__generated__/DeleteCategory';
import { categoriesTableColumns } from '~/features/categories/CategoriesTable/categoriesTableColumns';
import { useNavigate } from 'react-router';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Spinner } from '~/shared/components/Spinner';
import CustomTable from '~/shared/components/CustomTable';
import { useToast } from '~/hooks/use-toast';

export default function CategoriesTable() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data, loading } = useGetCategoriesQuery();
  const [deleteCategory, { loading: deleteCategoryLoading }] =
    useDeleteCategoryMutation({
      onCompleted: (data) => {
        toast({
          title: 'Success',
          description: `Category ${data?.deleteCategory.name} deleted`,
        });
      },
      refetchQueries: [GetCategoriesDocument],
    });

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

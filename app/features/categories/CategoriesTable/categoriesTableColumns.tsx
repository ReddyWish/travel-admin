import type { GetCategoriesQuery } from '~/features/categories/CategoriesTable/__generated__/GetCategories';
import type { NavigateFunction } from 'react-router';
import { EditDeleteDropDown } from '~/shared/components/EditDeleteDropDown';
import type { ColumnDef } from '@tanstack/react-table';
import type { DeleteCategoryMutationFn } from '~/features/categories/CategoriesTable/__generated__/DeleteCategory';

interface CategoriesColumnsProps {
  navigate: NavigateFunction;
  deleteCategory: DeleteCategoryMutationFn;
}

export type CategoryFragment = GetCategoriesQuery['categories'][0];

export const categoriesTableColumns = ({
  navigate,
  deleteCategory,
}: CategoriesColumnsProps): ColumnDef<CategoryFragment>[] => [
  {
    accessorKey: 'name',
    header: 'Category Name',
  },
  {
    accessorKey: 'actions',
    header: '',
    cell: ({ row }) => {
      const goToEditReviewPage = () => {
        navigate(`edit/${row.original.id}`);
      };
      return (
        <EditDeleteDropDown
          className="flex justify-center items-center"
          onEdit={goToEditReviewPage}
          onDelete={() =>
            deleteCategory({
              variables: {
                id: row.original.id,
              },
            })
          }
        />
      );
    },
  },
];

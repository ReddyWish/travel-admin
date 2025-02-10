import { Title } from '~/shared/components/Title';
import { Input } from '~/shared/components/ui/input';
import { AddButton } from '~/shared/components/AddButton';
import CategoriesTable from '~/features/categories/CategoriesTable/CategoriesTable';

export default function Categories() {
  return (
    <>
      <Title type="h2" className="pb-[12px]">
        Categories
      </Title>
      <div className="flex flex-col gap-2 justify-between pb-[31px] sm:flex-row sm:gap-0">
        <Input
          className="mr-0 w-full sm:mr-4 sm:max-w-[376px]"
          placeholder="Search..."
        />
        <AddButton link="add">Create Category</AddButton>
      </div>
      <CategoriesTable />
    </>
  );
}

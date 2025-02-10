import { Title } from '~/shared/components/Title';
import { Input } from '~/shared/components/ui/input';
import { AddButton } from '~/shared/components/AddButton';
import CategoriesTable from '~/features/categories/CategoriesTable/CategoriesTable';
import CurrenciesTable from '~/features/currencies/CurrenciesTable/CurrenciesTable';

export default function Currencies() {
  return (
    <>
      <Title type="h2" className="pb-[12px]">
        Currencies
      </Title>
      <div className="flex flex-col gap-2 justify-between pb-[31px] sm:flex-row sm:gap-0">
        <Input
          className="mr-0 w-full sm:mr-4 sm:max-w-[376px]"
          placeholder="Search..."
        />
        <AddButton
          link="add"
          disabled
          className="opacity-50 cursor-auto hover:shadow-sm"
        >
          Create Currency
        </AddButton>
      </div>
      <CurrenciesTable />
    </>
  );
}

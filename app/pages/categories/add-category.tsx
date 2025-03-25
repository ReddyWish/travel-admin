import { useLocation } from 'react-router';
import CustomBreadCrumbs from '~/shared/components/CustomBreadCrumbs';
import { BREADCRUMBS_CONFIG } from '~/shared/constants/breadcrumbs';
import { Title } from '~/shared/components/Title';
import CategoryForm from '~/features/categories/CategoryForm/CategoryForm';

export default function AddCategory() {
  const location = useLocation();

  return (
    <>
      <CustomBreadCrumbs
        className="pb-4"
        paths={BREADCRUMBS_CONFIG.CATEGORIES.ADD}
      />
      <Title type="h2" className="pb-[12px]">
        Create New Category
      </Title>
      <CategoryForm />
    </>
  );
}

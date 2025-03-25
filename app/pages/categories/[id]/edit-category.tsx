import { useParams } from 'react-router';
import CustomBreadCrumbs from '~/shared/components/CustomBreadCrumbs';
import { BREADCRUMBS_CONFIG } from '~/shared/constants/breadcrumbs';
import { Title } from '~/shared/components/Title';
import CategoryForm from '~/features/categories/CategoryForm/CategoryForm';

export default function EditCategory() {
  const { id } = useParams();
  return (
    <div>
      <CustomBreadCrumbs paths={BREADCRUMBS_CONFIG.CATEGORIES.EDIT} />
      <Title type="h2" className="pb-[12px]">
        Edit Category
      </Title>
      <CategoryForm id={id} />
    </div>
  );
}

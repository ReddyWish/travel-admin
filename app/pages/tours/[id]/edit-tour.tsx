import { useParams } from 'react-router';
import CustomBreadCrumbs from '~/shared/components/CustomBreadCrumbs';
import { BREADCRUMBS_CONFIG } from '~/shared/constants/breadcrumbs';

export default function EditTour() {
  const { id } = useParams();
  return (
    <div>
      <CustomBreadCrumbs paths={BREADCRUMBS_CONFIG.TOURS.EDIT} />
      <h1>Edit tour with id {id}</h1>
    </div>
  );
}

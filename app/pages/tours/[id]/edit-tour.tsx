import { useParams } from 'react-router';
import CustomBreadCrumbs from '~/shared/components/CustomBreadCrumbs';
import { BREADCRUMBS_CONFIG } from '~/shared/constants/breadcrumbs';
import TourForm from '~/features/tours/TourForm/TourForm';
import { Spinner } from '~/shared/components/Spinner';

export default function EditTour() {
  const { id } = useParams();
  console.log(id);
  return (
    <div>
      <CustomBreadCrumbs paths={BREADCRUMBS_CONFIG.TOURS.EDIT} />
      <h1>Edit tour with id {id}</h1>
      <TourForm id={id} />
    </div>
  );
}

import { useParams } from 'react-router';
import CustomBreadCrumbs from '~/shared/components/CustomBreadCrumbs';
import { BREADCRUMBS_CONFIG } from '~/shared/constants/breadcrumbs';
import TourForm from '~/features/tours/TourForm/TourForm';
import { Title } from '~/shared/components/Title';

export default function EditTour() {
  const { id } = useParams();
  return (
    <div>
      <CustomBreadCrumbs paths={BREADCRUMBS_CONFIG.TOURS.EDIT} />
      <Title type="h2" className="pb-[12px]">
        Edit Tour
      </Title>
      <TourForm id={id} />
    </div>
  );
}

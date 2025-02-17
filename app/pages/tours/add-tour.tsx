import { Title } from '~/shared/components/Title';
import CustomBreadCrumbs from '~/shared/components/CustomBreadCrumbs';
import { useLocation } from 'react-router';
import { BREADCRUMBS_CONFIG } from '~/shared/constants/breadcrumbs';
import TourForm from '~/features/tours/TourForm/TourForm';

export default function AddTour() {
  const location = useLocation();
  console.log(location);
  return (
    <>
      <CustomBreadCrumbs
        className="pb-4"
        paths={BREADCRUMBS_CONFIG.TOURS.ADD}
      />
      <Title type="h2" className="pb-[12px]">
        Create New Tour
      </Title>
      <TourForm />
    </>
  );
}

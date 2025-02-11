import { useParams } from 'react-router';

export default function EditTour() {
  const { id } = useParams();
  return <h1>Edit tour with id {id}</h1>;
}

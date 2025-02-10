import type { ColumnDef } from '@tanstack/react-table';
import { CircleCheck, CircleX } from 'lucide-react';
import type { NavigateFunction } from 'react-router';
import { EditDeleteDropDown } from '~/shared/components/EditDeleteDropDown';
import type { DeleteTourMutationFn } from '~/features/tours/ToursTable/__generated__/DeleteTour';
import type { GetToursQuery } from '~/features/tours/ToursTable/__generated__/GetTours';

interface ToursTableColumnsProps {
  navigate: NavigateFunction;
  deleteTour: DeleteTourMutationFn;
}

export type TourFragment = GetToursQuery['tours'][0];

export const toursTableColumns = ({
  navigate,
  deleteTour,
}: ToursTableColumnsProps): ColumnDef<TourFragment>[] => [
  {
    accessorKey: 'title',
    header: 'Tour Name',
  },
  {
    accessorKey: 'location',
    header: 'Location',
  },
  {
    accessorKey: 'accommodations',
    header: 'Accommodation',
    cell: ({ row }) => {
      const accommodation = row.original.accommodations[0];
      return accommodation ? `${accommodation.hotelName}` : 'No accommodation';
    },
  },
  {
    accessorKey: 'isBestSeller',
    header: 'Best Seller',
    cell: ({ row }) => {
      return row.original.isBestSeller ? (
        <CircleCheck className="text-green-500" />
      ) : (
        <CircleX className="text-red-500" />
      );
    },
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => {
      const basePrice = row.original.price.find((price) => price.isBasePrice);
      if (!basePrice) {
        return 'No price available';
      }
      return `${basePrice.amount} ${basePrice.currency.code}`;
    },
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
            deleteTour({
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

import type { ColumnDef } from '@tanstack/react-table';
import { CircleCheck, CircleX } from 'lucide-react';
import type { NavigateFunction } from 'react-router';
import { EditDeleteDropDown } from '~/shared/components/EditDeleteDropDown';
import type { DeleteTourMutationFn } from '~/features/tours/ToursTable/__generated__/DeleteTour';
import type { GetToursQuery } from '~/features/tours/ToursTable/__generated__/GetTours';
import { ChevronsUpDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/shared/components/ui/dropdown-menu';
import type { GetCurrenciesQuery } from '~/features/tours/ToursTable/__generated__/GetCurrencies';

interface ToursTableColumnsProps {
  navigate: NavigateFunction;
  deleteTour: DeleteTourMutationFn;
  currenciesData?: GetCurrenciesQuery;
  selectedCurrency: string;
  setSelectedCurrency: (currencyCode: string) => void;
}

export type TourFragment = GetToursQuery['tours'][0];

export const toursTableColumns = ({
  navigate,
  deleteTour,
  currenciesData,
  selectedCurrency,
  setSelectedCurrency,
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
    header: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center justify-center space-x-1 focus:outline-none">
            Price
            <ChevronsUpDown className="w-4 h-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white">
            {currenciesData?.currencies.map(({ code, id }) => (
              <DropdownMenuItem
                key={id}
                className="hover:bg-gray-50 cursor-pointer flex items-center justify-center space-x-2"
                onClick={() => setSelectedCurrency(code)}
              >
                {code}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    cell: ({ row }) => {
      const priceWithCurrency = row.original.price.find(
        (price) => price.currency.code === selectedCurrency,
      );

      if (!priceWithCurrency && row.original.price.length === 0) {
        return 'No price available';
      }

      const displayPrice = priceWithCurrency || row.original.price[0];

      return `${displayPrice.amount} ${displayPrice.currency.code}`;
    },
  },
  {
    accessorKey: 'actions',
    header: '',
    cell: ({ row }) => {
      const goToEditReviewPage = () => {
        navigate(`edit-tour/${row.original.id}`);
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

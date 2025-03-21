import { Settings, SquarePen, Trash2 } from 'lucide-react';
import { cn } from '~/lib/cn';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/shared/components/ui/dropdown-menu';

type EditDeleteDropDownProps = {
  className?: string;
  onEdit?: () => void;
  onDelete?: () => void;
};

export function EditDeleteDropDown({
  className,
  onEdit,
  onDelete,
}: EditDeleteDropDownProps) {
  return (
    <div className={cn(className)}>
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none flex">
          <Settings className="w-4 h-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="flex-col px-2 py-2 bg-white"
        >
          <DropdownMenuItem
            onClick={onEdit}
            className="flex gap-2 p-1 cursor-pointer hover:bg-gray-50"
          >
            <SquarePen className="w-4 h-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onDelete}
            className="flex gap-2 p-1 text-red-500 cursor-pointer hover:bg-gray-50"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

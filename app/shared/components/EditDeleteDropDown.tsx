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
          <DropdownMenuItem className="flex gap-2 p-0 pb-[6px]">
            <SquarePen className="w-4 h-4" />
            <button onClick={onEdit}>Edit</button>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex gap-2 p-0 text-red-500">
            <Trash2 className="w-4 h-4" />
            <button onClick={onDelete}>Delete</button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

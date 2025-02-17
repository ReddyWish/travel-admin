import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/shared/components/ui/dropdown-menu';
import { cn } from '~/lib/cn';

interface CustomDropdownOption {
  label: string | React.JSX.Element;
  value: string;
}

interface CustomDropdownProps {
  options: CustomDropdownOption[];
  placeholder: string | React.JSX.Element;
  label?: string;
  onChange: (value: string) => void;
  value?: string;
  className?: string;
}

export default function CustomDropdown({
  options,
  placeholder,
  label,
  onChange,
  value,
  className,
}: CustomDropdownProps) {
  const selectedOption = options.find((option) => option.value === value);

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex justify-center items-center border-1 border-slate-200 rounded-md text-sm shadow-sm h-9 w-full lg:w-1/4 outline-none">
        {selectedOption ? selectedOption.label : placeholder}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-[8rem] bg-white"
        side="bottom"
        align="start"
      >
        {label && (
          <>
            <DropdownMenuLabel>{label}</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              'cursor-pointer hover:bg-slate-100',
              value === option.value && 'bg-slate-100',
            )}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleClear}
          className="cursor-pointer hover:bg-slate-100 text-slate-500 flex items-center justify-center"
        >
          Clear selection
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

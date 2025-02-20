import { UploadIcon } from '~/shared/icons/UploadIcon';
import { Title } from '~/shared/components/Title';
import { Input } from '~/shared/components/ui/input';
import { Separator } from '~/shared/components/ui/separator';
import { Button } from '~/shared/components/ui/button';
import { X } from 'lucide-react';

export default function StepFive() {
  return (
    <div className="flex gap-10">
      <div className="w-1/2">
        <Title type="h2">Inclusions</Title>
        <div className="flex gap-2">
          <Input id="inclusions" placeholder="Enter whats included" />
          <Button size="icon" className=" top-1 right-1 hover:text-sky-300">
            <X />
          </Button>
        </div>
      </div>
      <Separator orientation="vertical" />
      <div className="w-1/2">
        <Title type="h2">Exclusions</Title>
        <div className="flex gap-2">
          <Input id="exclusions" placeholder="Enter whats excluded" />
          <Button size="icon" className="top-1 right-1 hover:text-sky-300">
            <X />
          </Button>
        </div>
      </div>
    </div>
  );
}

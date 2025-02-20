import { Title } from '~/shared/components/Title';
import { Label } from '~/shared/components/ui/label';
import { Input } from '~/shared/components/ui/input';
import { Textarea } from '~/shared/components/ui/textarea';
import { X } from 'lucide-react';
import { Separator } from '~/shared/components/ui/separator';
import { Button } from '~/shared/components/ui/button';

export default function StepTwo() {
  return (
    <div className="border-1 border-slate-200 rounded-md shadow-sm p-5 relative">
      <div className="flex gap-4 pb-5">
        <div className="w-full">
          <Title type="h3">USD</Title>
          <div>
            <Input type="number" placeholder="Price in USD currency" />
          </div>
        </div>

        <div className="w-full">
          <Title type="h3">EURO</Title>
          <div>
            <Input type="number" placeholder="Price in Euro currency" />
          </div>
        </div>
      </div>
      <Textarea
        placeholder="Describe the price"
        id="comment"
        className="resize-none h-21"
      />
      <Button
        size="icon"
        className=" absolute top-1 right-1 hover:text-sky-300 border-none shadow-none hover:shadow-none"
      >
        <X />
      </Button>
    </div>
  );
}

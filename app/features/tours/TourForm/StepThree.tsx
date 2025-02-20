import { Title } from '~/shared/components/Title';
import { Input } from '~/shared/components/ui/input';
import { Label } from '~/shared/components/ui/label';
import { Textarea } from '~/shared/components/ui/textarea';
import { X } from 'lucide-react';
import { Button } from '~/shared/components/ui/button';

export default function StepThree() {
  return (
    <div className="border-1 border-slate-200 rounded-md shadow-sm p-5 relative">
      <div className="flex flex-col gap-4 pb-5 md:flex-row">
        <div className="w-full md:w-1/4">
          <Label htmlFor="starttime">Start time</Label>
          <div>
            <Input type="text" placeholder="9:00 AM or Day 1" id="starttime" />
          </div>
        </div>
        <div className="w-full md:w-3/4">
          <Label htmlFor="title">Activity</Label>
          <div>
            <Input type="text" placeholder="Enter activity title" id="title" />
          </div>
        </div>
      </div>
      <div className="grid w-full gap-1.5">
        <Label htmlFor="description">Description</Label>
        <Textarea
          placeholder="Enter activity description"
          id="description"
          className="resize-none h-21"
        />
      </div>

      <Button
        size="icon"
        className=" absolute top-1 right-1 hover:text-sky-300 border-none shadow-none hover:shadow-none"
      >
        <X />
      </Button>
    </div>
  );
}

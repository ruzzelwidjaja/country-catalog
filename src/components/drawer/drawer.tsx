import { ReactElement } from 'react';
import { Drawer } from "vaul";
import { Button } from '../ui/button';
import { ChevronRight } from 'lucide-react';

interface MyDrawerProps {
    contentComponent: () => ReactElement;
}



export function MyDrawer({ contentComponent: ContentComponent }: MyDrawerProps) {
  return (
    <Drawer.Root shouldScaleBackground>
      <Drawer.Trigger asChild>
        <Button variant="outline" size="icon" className='w-14 border-2 focus:border-[#9e8cfc] focus:outline-none hover:border-[#9e8cfc]'>
          <ChevronRight className="h-6 w-6" />
        </Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        {ContentComponent && <ContentComponent />}
      </Drawer.Portal>
    </Drawer.Root>
  );
}
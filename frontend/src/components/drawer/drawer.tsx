import { Drawer } from "vaul";
import { Button } from '../ui/button';
import { ChevronRight } from 'lucide-react';
import { DrawerContent } from './drawerContent';

import { CountryDetailsType } from "@/lib/types";


interface DrawerProps {
  countryDetails: CountryDetailsType | null;
  onButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function MyDrawer({ onButtonClick, countryDetails}: DrawerProps) {
  return (
    <Drawer.Root shouldScaleBackground>
      <Drawer.Trigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className='w-14 border-2 focus:border-[#9e8cfc] focus:outline-none hover:border-[#9e8cfc]'
          onClick={onButtonClick}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <DrawerContent countryDetails={countryDetails}/>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
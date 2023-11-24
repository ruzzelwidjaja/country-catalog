import React, { forwardRef } from 'react';

import { Drawer } from "vaul";
import { Button } from '../ui/button';
import { ChevronRight } from 'lucide-react';
import { DrawerContent } from './drawerContent';

import { CountryDetailsType } from "@/lib/types";
import { DrawerContentSkeleton } from "./drawerContentSkeleton";


interface DrawerProps {
  countryDetails: CountryDetailsType | null;
  onButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isValid: boolean;
}

// export function MyDrawer({ onButtonClick, countryDetails, isValid }: DrawerProps) {
export const MyDrawer = forwardRef<HTMLButtonElement, DrawerProps>(({ onButtonClick, countryDetails, isValid }, ref) => {
  return (
    <Drawer.Root shouldScaleBackground>
      <Drawer.Trigger asChild>
        <Button
          ref={ref}
          testId="drawer-button"
          variant="outline" 
          size="icon" 
          className='w-14 h-[2.65rem] border-2 focus:border-[#9e8cfc] focus:outline-none hover:border-[#9e8cfc]'
          onClick={onButtonClick}
          disabled={!isValid}
        >
          <ChevronRight className="h-6 w-6" />
        </Button> 
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className="geist-font bg-zinc-100 flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0">
            {countryDetails === null
              ? <DrawerContentSkeleton />
              : <DrawerContent countryDetails={countryDetails}/>
            }
            {/* <DrawerContentSkeleton /> */}
          </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
);
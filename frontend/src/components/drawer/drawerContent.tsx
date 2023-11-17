import { Drawer } from "vaul";
import { CountryDetailsType } from "@/lib/types";

export function DrawerContent({countryDetails}: { countryDetails: CountryDetailsType | null}) {
// export function DrawerContent() {

  // if (!countryDetails) return null;


  return (
    <Drawer.Content className="bg-zinc-100 flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0">
        
      {/* Header */}
      <div className="p-4 bg-background rounded-t-[10px] flex-1">
        <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-500 mb-8" />
        <div className="max-w-md mx-auto">
          <Drawer.Title className="font-medium mb-4">
            Unstyled drawer for React.
            {countryDetails
                ? countryDetails.name.common
                : "HELLO"}            
          </Drawer.Title>
          
          {/* Body */}
          <p className="text-zinc-600 mb-2">
            This component can be used as a replacement for a Dialog on
            mobile and tablet devices.
          </p>

        </div>
      </div>

      {/* Footer */}
      <div className="p-4 bg-zinc-100 border-t border-zinc-200 mt-auto">
        <div className="flex gap-6 justify-end max-w-md mx-auto">
          <a
            className="text-xs text-zinc-600 flex items-center gap-0.25"
            href="https://github.com/ruzzelwidjaja/country-search"
            target="_blank"
          >
            GitHub
            <svg
              fill="none"
              height="16"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="16"
              aria-hidden="true"
              className="w-3 h-3 ml-1"
            >
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
              <path d="M15 3h6v6"></path>
              <path d="M10 14L21 3"></path>
            </svg>
          </a>
        </div>
      </div>
    </Drawer.Content>
  )
}

// import { Drawer } from "vaul";
import { CountryDetailsType } from "@/lib/types";

import { Header } from "./header";
import { Languages } from "./languages";
import { Body } from "./body";
import { Links } from "./links";
import { Footer } from "./footer";
import { GptDrawer } from "../gptDrawer/gptDrawer";

interface DrawerContentProps {
  countryDetails: CountryDetailsType | null;
}

export function DrawerContent({ countryDetails }: DrawerContentProps) {
  // Function to get the currency and its symbol
  const getCurrencyInfo = (currencies: { [key: string]: { name: string; symbol: string } }) => {
    const entries = Object.entries(currencies || {});
    if (entries.length === 0) return "Unknown";

    const [currencyCode, { symbol }] = entries[0];
    return `${currencyCode} (${symbol})`;
  };

  return (

    <body className="rounded-t-[10px] h-full">
      <div className="mt-4 mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-500 mb-8" />

      <div className="pb-4 px-6 mx-auto bg-background flex-1 overflow-y-auto overflow-x-hidden h-full max-w-sm md:max-w-xl ">
        <Header countryDetails={countryDetails}/>
        <Languages countryDetails={countryDetails} />
        <hr className="mt-4 mb-5 w-11/12 mx-auto"/>

        <div className="flex justify-center">
          <GptDrawer countryDetails={countryDetails}/>
        </div>

        <hr className="mt-5 w-11/12 mx-auto"/>
        <Body countryDetails={countryDetails} getCurrencyInfo={getCurrencyInfo} />
        <hr className="mt-4 mb-[1.05rem] w-11/12 mx-auto"/>
        <Links countryDetails={countryDetails} />
      </div>


      <div className="fixed bottom-0 inset-x-0 mt-auto">
        <Footer/>
      </div>
    </body>
  )
}

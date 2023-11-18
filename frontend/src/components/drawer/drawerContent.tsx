import { Drawer } from "vaul";
import { Tooltip } from "../ui/tooltip";
import { Header } from "./header";
import { InfoItem } from "./infoItem";
import { Footer } from "./footer";

import { CountryDetailsType } from "@/lib/types";


export function DrawerContent({countryDetails}: { countryDetails: CountryDetailsType | null}) {
  // Function to get the currency and its symbol
  const getCurrencyInfo = (currencies: { [key: string]: { name: string; symbol: string } }) => {
    const entries = Object.entries(currencies || {});
    if (entries.length === 0) return "Unknown";

    const [currencyCode, { symbol }] = entries[0];
    return `${currencyCode} (${symbol})`;
  };


  return (
    <Drawer.Content className="bg-zinc-100 flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0">
        
      
      <div className="p-4 bg-background rounded-t-[10px] flex-1">
        <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-500 mb-8" />
        <div className="max-w-sm mx-auto md:max-w-xl px-2">
          <Header countryDetails={countryDetails}/>

          {/* Body */}

          <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-3 md:grid-rows-2 gap-2 mb-6">
            <InfoItem label="Region" value={countryDetails?.region ?? "Unknown"} />
            <InfoItem label="Currency" value={getCurrencyInfo(countryDetails?.currencies ?? {})} />
            <InfoItem label={<Tooltip text="United Nations Member?">UN Member</Tooltip>} value={countryDetails?.unMember ? "Yes" : "No"} />
            <InfoItem label="Population" value={countryDetails?.population.toLocaleString() ?? "Unknown"} />
            <InfoItem label="Dial Code" value={`${countryDetails?.idd.root ?? ""}${countryDetails?.idd.suffixes[0] ?? ""}`} />
            <InfoItem label="Total Area" value={`${countryDetails?.area.toLocaleString() ?? "Unknown"} km²`} />
          </div>

          <hr className="mb-6 w-11/12 mx-auto"/>
          
          <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-3 md:grid-rows-2 gap-4">
            <InfoItem label="ISO Country Code" value={countryDetails?.cca2 ?? "Unknown"} />
            <InfoItem label={<Tooltip text="Top-Level Domain">TLD</Tooltip>} value={countryDetails?.tld[0] ?? "Unknown"} />
            <InfoItem label="FIFA Code" value={countryDetails?.fifa ?? "Unknown"} />
            <InfoItem label="Timezone" value={countryDetails?.timezones[0] ?? "Unknown"} />
            <InfoItem label="Independence" value={countryDetails?.independent ? "Yes" : "No"} />
            <InfoItem label="Car Side" value={countryDetails?.car.side ?? "Unknown"} />
          </div>

        </div>
      </div>


      <Footer/>
    </Drawer.Content>
  )
}

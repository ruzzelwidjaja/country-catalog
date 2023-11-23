// import { Drawer } from "vaul";
import { Tooltip } from "../ui/tooltip";
import { Header } from "./header";
import { InfoItem } from "./infoItem";
import { Footer } from "./footer";

import { CountryDetailsType } from "@/lib/types";
import { Links } from "./links";

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

      <div className="p-4 pt-0 bg-background flex-1 overflow-y-auto overflow-x-hidden h-full ">
        <div className="max-w-sm mx-auto md:max-w-xl px-2 ">
          <Header countryDetails={countryDetails}/>

          {/* <div className="overflow-y-auto overflow-x-hidden h-full w-auto pb-4"> */}

            {/* Languages */}
              <div className="ml-2">
                <span className="text-grayLD pr-4">Language(s)</span>
                <span className="text-foreground font-semibold">
                  {Object.values(countryDetails?.languages ?? {}).join(", ") || "Unknown"}
                </span>
              </div>

            <hr className="mt-4 mb-3 w-11/12 mx-auto"/>

          {/* Body */}
            <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-3 md:grid-rows-2">
              <InfoItem label="Region" value={countryDetails?.region ?? "Unknown"} />
              <InfoItem label="Currency" value={getCurrencyInfo(countryDetails?.currencies ?? {})} />
              <InfoItem label={<Tooltip text="United Nations Member?">UN Member</Tooltip>} value={countryDetails?.unMember ? "Yes" : "No"} />
              <InfoItem label="Population" value={countryDetails?.population.toLocaleString() ?? "Unknown"} />
              <InfoItem label="Dial Code" value={`${countryDetails?.idd.root ?? ""}${countryDetails?.idd.suffixes[0] ?? ""}`} />
              <InfoItem label="Total Area" value={`${countryDetails?.area.toLocaleString() ?? "Unknown"} km²`} />
            </div>

            <hr className="my-3 w-11/12 mx-auto"/>
            
            <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-3 md:grid-rows-2 mb-4">
              <InfoItem label="ISO Code" value={countryDetails?.cca2 ?? "Unknown"} />
              <InfoItem label={<Tooltip text="Top-Level Domain">TLD</Tooltip>} value={countryDetails?.tld[0] ?? "Unknown"} />
              <InfoItem label="FIFA Code" value={countryDetails?.fifa ?? "N/A"} />
              <InfoItem label="Timezone" value={countryDetails?.timezones[0] ?? "Unknown"} />
              <InfoItem label="Independence" value={countryDetails?.independent ? "Yes" : "No"} />
              <InfoItem label="Car Side" value={countryDetails?.car.side ?? "Unknown"} />
            </div>

            <hr className="mt-4 mb-[1.05rem] w-11/12 mx-auto"/>

            <Links countryDetails={countryDetails} />
          {/* </div> */}


        </div>
      </div>


      <div className="fixed bottom-0 inset-x-0 mt-auto">
        <Footer/>
      </div>
    </body>
  )
}

// CountryBody.tsx
import React from 'react';
import { Tooltip } from "../ui/tooltip";
import { InfoItem } from "./infoItem";

import { CountryDetailsType } from "@/lib/types";

interface BodyProps {
  countryDetails: CountryDetailsType | null;
  getCurrencyInfo: (currencies: { [key: string]: { name: string; symbol: string } }) => string;
}

export const Body: React.FC<BodyProps> = ({ countryDetails, getCurrencyInfo }) => {
  return (
    <>
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
    </>
  );
};

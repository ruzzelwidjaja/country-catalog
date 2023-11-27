import React from 'react';
import { CountryDetailsType } from "@/lib/types";

interface LanguagesProps {
  countryDetails: CountryDetailsType | null;
}

export const Languages: React.FC<LanguagesProps> = ({ countryDetails }) => {
  return (
    <div className="ml-2">
      <span className="text-grayLD pr-4">Language(s)</span>
      <span className="text-foreground font-semibold">
        {Object.values(countryDetails?.languages ?? {}).join(", ") || "Unknown"}
      </span>
    </div>
  );
};

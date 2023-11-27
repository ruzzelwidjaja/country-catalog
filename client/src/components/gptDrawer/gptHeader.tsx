import { CountryDetailsType } from "@/lib/types";

export function GptHeader({ countryDetails }: { countryDetails: CountryDetailsType | null }) {
  return (
    <header className="flex mr-4 ml-2 pl-4">
      <h1 className="font-medium text-2xl">
        Travel Guide to {countryDetails?.name.common ?? "Country"}
      </h1>
    </header>
  );
}

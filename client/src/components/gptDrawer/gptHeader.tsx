import { CountryDetailsType } from "@/lib/types";

export function GptHeader({ countryDetails }: { countryDetails: CountryDetailsType | null }) {
  return (
    <header className="flex mr-4 ml-2 pl-4">
      <h1 className="font-medium text-2xl">
        <span className="text-indigo-600 dark:text-indigo-400">Travel Guide to</span> {countryDetails?.name.common ?? "Country"}
      </h1>
    </header>
  );
}

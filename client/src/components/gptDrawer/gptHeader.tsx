import { CountryDetailsType } from "@/lib/types";
import { Sparkles } from 'lucide-react';

export function GptHeader({ countryDetails }: { countryDetails: CountryDetailsType | null }) {
  return (
    <header className="flex flex-row mr-4 pl-4">
      <Sparkles className="mt-1.5 mr-2 h-5 w-5 text-indigo-600 dark:text-indigo-400"/>
      <h1 className="font-medium text-2xl">
        <span className="text-indigo-600 dark:text-indigo-400">Travel Guide to</span> {countryDetails?.name.common ?? "Country"}
      </h1>
    </header>
  );
}

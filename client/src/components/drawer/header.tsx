import { CountryDetailsType } from "@/lib/types";


export function Header({countryDetails}: { countryDetails: CountryDetailsType | null}) {
  return (
    <header>
      <div className="flex justify-between items-center mr-4 pl-4">
        {/* Name */}
        <h1 className="font-medium text-3xl pr-5">
          <a href={countryDetails?.maps.googleMaps} target="_blank" rel="noopener noreferrer" className="inline-flex items-center border-b border-transparent hover:border-current">
            {countryDetails?.name.common ?? "Name"}
            {/* Icon */}
            <svg
              fill="none" height="1em" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              viewBox="0 0 24 24" width="0.8em" aria-hidden="true" className="ml-1"
            >
              <path d="M15 3h6v6"></path>
              <path d="M10 14L21 3"></path>
            </svg>
          </a>
        </h1>
        {/* Flag */}
        {countryDetails?.flags.svg && (
          <img src={countryDetails.flags.svg} alt="Flag" className="w-16 h-10" />
        )}
      </div>
      
      {/* Capital Cities */}
      <p className="text-zinc-600 dark:text-zinc-400 pl-4">
        {countryDetails?.capital?.length ? countryDetails.capital.join(", ") : "No Capital"}
      </p>

      <hr className="mt-6 mb-4 w-11/12 mx-auto"/>
      
      

    </header>
  );
}

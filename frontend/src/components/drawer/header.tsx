import { CountryDetailsType } from "@/lib/types";


export function Header({countryDetails}: { countryDetails: CountryDetailsType | null}) {
  return (
    <header>
      <div className="flex justify-between items-center mr-4">
        {/* Name */}
        <h1 className="font-medium text-3xl pl-3 pr-5">
          <a href={countryDetails?.maps.googleMaps} target="_blank" rel="noopener noreferrer" className="inline-flex items-center border-b border-transparent hover:border-current">
            {countryDetails?.name.common ?? "Name"}
            <svg
              fill="none" height="1em" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              viewBox="0 0 24 24" width="0.8em" aria-hidden="true" className="ml-1"
            >
              {/* <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path> */}
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
      <p className="text-zinc-600 dark:text-zinc-400 pl-3 mb-6">
        {countryDetails?.capital.join(", ") ?? "Unknown"}
      </p>

      <hr className="mb-4 w-11/12 mx-auto"/>
      
      {/* Languages */}
      <div className="mb-4 ml-2">
        <span className="text-grayLD pr-4">Language(s)</span>
        <span className="text-foreground font-semibold">
          {Object.values(countryDetails?.languages ?? {}).join(", ") || "Unknown"}
        </span>
      </div>

      <hr className="mb-6 w-11/12 mx-auto"/>
    </header>
  );
}

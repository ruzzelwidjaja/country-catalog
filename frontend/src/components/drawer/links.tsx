import { CountryDetailsType } from '@/lib/types';

export function Links({ countryDetails }: { countryDetails: CountryDetailsType | null }) {
    const getTwitterSearchLink = (countryName: string) => {
    const encodedCountryName = encodeURIComponent(countryName);
    return `https://twitter.com/search?q=${encodedCountryName}&src=typed_query`;
  };

  const getGoogleSearchLink = (countryName: string) => {
    const query = encodeURIComponent(`flights to "${countryName}"`);
    return `https://www.google.com/search?q=${query}`;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 px-6 pt-4">
      {countryDetails && (
        <>
          {/* Google Search Link */}
          <a
            href={getGoogleSearchLink(countryDetails.name.common)}
            target="_blank"
            rel="noopener noreferrer"
            className="md:col-start-2 inline-flex items-center"
          >
            <span className="flex flex-inline border-b border-transparent hover:border-current">
                Flights
                <svg
                    fill="none" height="1em" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    viewBox="0 0 24 24" width="0.8em" aria-hidden="true" className="ml-1"
                >
                    <path d="M15 3h6v6"></path>
                    <path d="M10 14L21 3"></path>
                </svg>
            </span>
          </a>

          {/* Twitter Search Link */}
          <a
            href={getTwitterSearchLink(countryDetails.name.common)}
            target="_blank"
            rel="noopener noreferrer"
            className="md:col-start-4 inline-flex items-center"
          >
            <span className="flex flex-inline border-b border-transparent hover:border-current ml-6 md:ml-0">
              Twitter
              
                <svg
                    fill="none" height="1em" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    viewBox="0 0 24 24" width="0.8em" aria-hidden="true" className="ml-1"
                >
                    <path d="M15 3h6v6"></path>
                    <path d="M10 14L21 3"></path>
                </svg>
            </span>
          </a>
        </>
      )}
    </div>
  );
}

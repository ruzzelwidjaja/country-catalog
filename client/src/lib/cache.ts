import { CountryDetailsType } from "@/lib/types";

interface CacheType {
  [key: string]: CountryDetailsType;
}

const countryCache: CacheType = {};

/**
 * Fetches country data from the server and caches it.
 * Throws an error if the API URL is not defined or the network response is not ok.
 */
export const fetchCountryData = async (countryName: string): Promise<CountryDetailsType> => {
  // Set API URL to VITE_API_URL or default to localhost:3001
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  // Return cached data if available
  if (countryCache[countryName]) {
    return countryCache[countryName];
  }

  // Fetch new data from the API
  const response = await fetch(`${apiUrl}/country/${countryName}`);
  if (!response.ok) {
    throw new Error(`Network response was not ok for country: ${countryName}`);
  }

  const data: CountryDetailsType[] = await response.json();
  // const countryData = data[0];

  // Find the correct country data
  const countryData = data.find(country => 
    country.name.common.toLowerCase() === countryName.toLowerCase()
  );

  if (!countryData) {
    throw new Error(`Country not found: ${countryName}`);
  }
  
  // Cache the fetched data
  countryCache[countryName] = countryData;

  return countryData;
};

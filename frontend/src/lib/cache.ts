import { CountryDetailsType } from "@/lib/types";

interface CacheType {
  [key: string]: CountryDetailsType;
}

export const countryCache: CacheType = {};

export const fetchCountryData = async (countryName: string): Promise<CountryDetailsType> => {
  // Check if the data is in the cache
  if (countryCache[countryName]) {
    return countryCache[countryName];
  }

  // Fetch new data
  const response = await fetch(`http://localhost:3001/country/${countryName}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data: CountryDetailsType[] = await response.json();
  const countryData = data[0]; // Assuming the API returns an array and you need the first item

  // Cache the data
  countryCache[countryName] = countryData;

  return countryData;
};
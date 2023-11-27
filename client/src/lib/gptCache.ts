import { TravelRecommendationsType } from "@/lib/types";

interface GptCacheType {
  [key: string]: TravelRecommendationsType;
}

const gptCache: GptCacheType = {};

/**
 * Fetches travel recommendations from the server and caches them.
 * Throws an error if the API URL is not defined or the network response is not ok.
 */
export const fetchTravelRecommendations = async (countryName: string): Promise<TravelRecommendationsType> => {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  // Return cached data if available
  if (gptCache[countryName]) {
    return gptCache[countryName];
  }

  // Fetch new data from the API
  const response = await fetch(`${apiUrl}/travel/${countryName}`);
  if (!response.ok) {
    throw new Error(`Network response was not ok for travel recommendations: ${countryName}`);
  }

  const data: TravelRecommendationsType = await response.json();

  // Cache the fetched data
  gptCache[countryName] = data;

  return data;
};

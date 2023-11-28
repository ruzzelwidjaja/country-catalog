import React from 'react';
import { CountriesListType, CountryDetailsType } from '@/lib/types';

import { History } from 'lucide-react';

type CountriesListProps = {
  filteredCountries: CountriesListType[];
  searchHistory: CountryDetailsType[];
  handleCountryClick: (country: string) => void;
  highlightedIndex: number;
  hoveredIndex: number | null;
  setHoveredIndex: React.Dispatch<React.SetStateAction<number | null>>;
};

export const CountriesList: React.FC<CountriesListProps> = 
  ({ 
    filteredCountries, 
    searchHistory,
    handleCountryClick, 
    // highlightedIndex, // to indicate which item in the list is currently selected or active
    hoveredIndex, //  to track which item is currently being hovered over with the mouse
    setHoveredIndex,
 }) => {
  return (
    <ul className=" pl text-foreground shadow-sm rounded-md max-h-80 overflow-y-auto absolute w-full z-10 top-full">
      {/* Display search history */}
      {searchHistory.map((country, index) => (
        <li key={country.name.common}
            className={`relative p-2 pl-[2.95rem] text-left cursor-pointer ${hoveredIndex === index ? 'bg-bgHover' : ''}`}
            onClick={() => handleCountryClick(country.name.common)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}>
          <History className="absolute w-[22px] left-[0.8rem] top-[52%] transform -translate-y-1/2" />
          {country.name.common}
        </li>
      ))}

      {/* Display filtered countries */}
      {filteredCountries.map((country, index) => (
        <li key={country.name} 
            className={`relative p-2 pl-[2.95rem] text-left cursor-pointer
                        ${hoveredIndex === index + searchHistory.length ? 'bg-bgHover' : ''}`}
            onClick={() => handleCountryClick(country.name)}
            onMouseEnter={() => setHoveredIndex(index + searchHistory.length)}
            onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Icon for Light Mode */}
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 dark:hidden">
          <img src={`continents/${country.continent}.svg`} alt={`${country.continent} icon`} className="w-6 h-6" />
          </span>

          {/* Icon for Dark Mode */}
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 hidden dark:inline">
          <img src={`continents/${country.continent}-light.svg`} alt={`${country.continent} icon`} className="w-6 h-6" />
          </span>


          {country.name}
        </li>
      ))}
    </ul>
  );
};

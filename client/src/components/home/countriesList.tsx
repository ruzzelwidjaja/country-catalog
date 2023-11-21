import { CountriesListType } from '@/lib/types';
import React from 'react';

type CountriesListProps = {
  filteredCountries: CountriesListType[];
  handleCountryClick: (country: string) => void;
  highlightedIndex: number;
  hoveredIndex: number | null;
  setHoveredIndex: React.Dispatch<React.SetStateAction<number | null>>;
};

export const CountriesList: React.FC<CountriesListProps> = 
  ({ 
    filteredCountries, 
    handleCountryClick, 
    highlightedIndex,
    hoveredIndex,
    setHoveredIndex,
 }) => {
  return (
    <ul className=" pl text-foreground shadow-sm rounded-md max-h-60 overflow-y-auto absolute w-full z-10 top-full">
      {filteredCountries.map((country, index) => (
        <li 
          key={country.name} 
          className={`relative p-2 pl-[2.95rem] text-left cursor-pointer
                      ${hoveredIndex === index ? 'bg-bgHover' : 
                      hoveredIndex === null && index === highlightedIndex ? 'bg-bgHover' : ''}`}
          onClick={() => handleCountryClick(country.name)}
          onMouseEnter={() => setHoveredIndex(index)}
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

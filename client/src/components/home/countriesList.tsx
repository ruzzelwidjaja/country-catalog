import { CountriesListType } from '@/lib/types';
import React from 'react';

type CountriesListProps = {
  filteredCountries: CountriesListType[];
  handleCountryClick: (country: string) => void;
};

export const CountriesList: React.FC<CountriesListProps> = ({ filteredCountries, handleCountryClick }) => {
  return (
    <ul className=" pl text-foreground shadow-sm rounded-md max-h-60 overflow-y-auto absolute w-full z-10 top-full">
      {filteredCountries.map((country) => (
        <li 
          key={country.name} 
          className="relative p-2 pl-[2.95rem] text-left hover:bg-bgHover cursor-pointer"
          onClick={() => handleCountryClick(country.name)}
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

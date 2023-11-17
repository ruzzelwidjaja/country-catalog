import { useState } from "react";

import { MyDrawer } from "@/components/drawer/drawer";
import { ModeToggle } from "@/components/mode-toggle";
import { DrawerContent } from '@/components/drawer/drawerContent';
import { Input } from "@/components/ui/input";
import { Header } from "@/components/header";
import { CountriesList, CountryData } from "@/components/countriesList";

import { countries_list } from "@/lib/config/countries_list";


export default function Home() {

    const [inputValue, setInputValue] = useState('');
    const [filteredCountries, setFilteredCountries] = useState<CountryData[]>([]);
    const [isValid, setIsValid] = useState(true); // valid country or not

    // To update what is on the input field, and update the dropdown list
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchQuery = e.target.value;
        setInputValue(searchQuery);
    
        // Filter the countries list based on the input
        const searchResults = countries_list.filter(country =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredCountries(searchResults);
    };

    const clearInput = () => { // x button to clear out input field & dropdown list
        setInputValue('');
        setFilteredCountries([]);
    };
    

    const handleCountryClick = (country: string) => {
        setInputValue(country);
        setFilteredCountries([]); // to clear the dropdown list
        setIsValid(true); // to reset validation state when a country is clicked
      }


    return (
        <main className="flex flex-col items-center justify-center bg-cover bg-center min-h-[100vh]">
            <div style={{ position: 'fixed', top: '1rem', right: '1rem' }}>
                <ModeToggle />
            </div>
            <Header/>
            <form className="w-auto flex flex-col items-center relative">
                <div className="flex mb-2">
                    <Input 
                        inputValue={inputValue} 
                        isValid={isValid} 
                        handleInputChange={handleInputChange} 
                        clearInput={clearInput}
                    />
                    <MyDrawer contentComponent={DrawerContent}/>
                </div>
                <CountriesList filteredCountries={filteredCountries} handleCountryClick={handleCountryClick} />
            </form>
            

        </main>
    )
}
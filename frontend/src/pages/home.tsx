import { useCallback, useState } from "react";

import { MyDrawer } from "@/components/drawer/drawer";
import { ModeToggle } from "@/components/mode-toggle";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/header";
import { CountriesList } from "@/components/countriesList";

import { countries_list } from "@/lib/config/countries_list";
import { CountriesListType, CountryDetailsType } from "@/lib/types";


export default function Home() {

    const [inputValue, setInputValue] = useState('');
    const [filteredCountries, setFilteredCountries] = useState<CountriesListType[]>([]);
    const [isValid, setIsValid] = useState(true); // valid country or not
    const [countryDetails, setCountryDetails] = useState<CountryDetailsType | null>(null);


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
    
    // When a country is clicked from the drop-down list
    const handleCountryClick = (country: string) => {
        setInputValue(country);
        setFilteredCountries([]); // to clear the dropdown list
        setIsValid(true); // to reset validation state when a country is clicked
    }

    // When the button is clicked
    const handleButtonClick = useCallback(async () => {
        const isValidCountry = countries_list.some(country => 
            country.name.toLowerCase() === inputValue.toLowerCase()
        );
    
        if (isValidCountry) {
            try {
                const response = await fetch(`http://localhost:3001/country/${inputValue}`);
                if (!response.ok) { //test
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log("TEST::::::", data[0])
                setCountryDetails(data[0]);
            } catch (error) {
                console.error("Error fetching country details: ", error);
            }
        } else {
            setIsValid(false);
            setCountryDetails(null); // Reset or handle invalid country
        }
    }, [inputValue]);


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
                    <MyDrawer onButtonClick={handleButtonClick} countryDetails={countryDetails}/>
                </div>
                <CountriesList filteredCountries={filteredCountries} handleCountryClick={handleCountryClick} />
            </form>
            

        </main>
    )
}
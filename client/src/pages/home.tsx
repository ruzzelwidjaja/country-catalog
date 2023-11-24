import { useCallback, useEffect, useRef, useState } from "react";

import { countries_list } from "@/lib/config/countries_list";
import { CountriesListType, CountryDetailsType } from "@/lib/types";
import { fetchCountryData } from "@/lib/cache";

import { MyDrawer } from "@/components/drawer/drawer";
import { ModeToggle } from "@/components/home/mode-toggle";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/home/header";
import { CountriesList } from "@/components/home/countriesList";

export default function Home() {

    const [inputValue, setInputValue] = useState('');
    const [filteredCountries, setFilteredCountries] = useState<CountriesListType[]>([]);
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);


    // State to validate country in input field
    const [isValid, setIsValid] = useState(true); // Disable button

    const [countryDetails, setCountryDetails] = useState<CountryDetailsType | null>(null);


    // To update what is on the input field, and update the dropdown list
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchQuery = e.target.value.toLowerCase();
        setInputValue(searchQuery);
    
        // Filter the countries list based on the input
        const searchResults = countries_list.filter(country =>
        country.name.toLowerCase().includes(searchQuery) || 
        country.continent.toLowerCase().includes(searchQuery)        
        );
        setFilteredCountries(searchResults);
    };

    // Highlighted country
    useEffect(() => {
        setHighlightedIndex(0);
    }, [filteredCountries]);


    const drawerButtonRef = useRef<HTMLButtonElement>(null);

    // const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    //     if (event.key === "Enter" && filteredCountries.length > 0) {
    //         event.preventDefault(); // Prevent the default form submission
    //         const firstCountry = filteredCountries[0].name;
    //         setInputValue(firstCountry); // Set the input to the first country in the list
    //         handleCountryClick(firstCountry); // Update the country details
    //         drawerButtonRef.current?.click(); // Trigger the drawer to open
    //     }
    // };

    // const handleKeyDown = (e: React.KeyboardEvent) => {
    //     if (e.key === 'Enter' && filteredCountries.length > 0) {
    //       e.preventDefault(); // Prevent form submission
    //       handleCountryClick(filteredCountries[highlightedIndex].name);
    //     //   handleButtonClick();
    //     }
    // };


    // x button to clear out input field & dropdown list
    const clearInput = () => { 
        setInputValue('');
        setFilteredCountries([]);
    };

    // Update isValid whenever inputValue changes
    useEffect(() => {
        const isValidCountry = inputValue !== '' && countries_list.some(country => 
            country.name.toLowerCase() === inputValue.toLowerCase()
        );
        setIsValid(isValidCountry);
    }, [inputValue]);
    
    // When a country is clicked from the drop-down list
    const handleCountryClick = (country: string) => {
        setInputValue(country);
        setFilteredCountries([]); // to clear the dropdown list
        setIsValid(true); // enable button click (country is definitely valid as it's from dropdown list)
    }
    

    const handleButtonClick = useCallback(async () => {
        const isValidCountry = countries_list.some(country => 
            country.name.toLowerCase() === inputValue.toLowerCase()
        );

        if (isValidCountry) {
            setCountryDetails(null); // Reset to show loading state (skeleton)

            try {
                const data = await fetchCountryData(inputValue);
                setCountryDetails(data);
            } catch (error) {
                console.error("Error fetching country details: ", error);
            }
        } else {
            setIsValid(false); // disable button
            setCountryDetails(null); // Reset or handle invalid country
        }
    }, [inputValue]);

    useEffect(() => {
        const isValidCountry = countries_list.some(country => 
          country.name.toLowerCase() === inputValue.toLowerCase()
        );
      
        if (isValidCountry) {
          handleButtonClick(); // Trigger the drawer to open
          drawerButtonRef.current?.click();
        }
      }, [inputValue, handleButtonClick]);
      
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && filteredCountries.length > 0) {
        event.preventDefault();
        const firstCountry = filteredCountries[0].name;
        setInputValue(firstCountry); // This will trigger the useEffect
        drawerButtonRef.current?.click();
    }
    };
    

    // Function to handle input focus
    const handleInputFocus = () => {
        // setFilteredCountries(countries_list); // Show all countries when input is focused
        if (!inputValue) {
            setFilteredCountries(countries_list); // Show all countries when input is empty and focused
          } else {
            // Keep the filtered list based on the current input value
            const searchResults = countries_list.filter(country =>
              country.name.toLowerCase().includes(inputValue.toLowerCase()) || 
              country.continent.toLowerCase().includes(inputValue.toLowerCase())        
            );
            setFilteredCountries(searchResults);
        }
    };


    return (
        // <main className="flex flex-col items-center justify-center bg-cover bg-center min-h-[100vh]">
        <main className="flex flex-col items-center justify-center bg-cover bg-center min-h-[86vh] md:min-h-screen">

            <div style={{ position: 'fixed', top: '1rem', right: '1rem' }}>
                <ModeToggle />
            </div>
            <div className="mb-20">
                <Header/>
                <form className="w-auto flex flex-col items-center relative">
                    <div className="flex mb-2">
                        <Input 
                            inputValue={inputValue} 
                            handleInputChange={handleInputChange}
                            handleInputFocus={handleInputFocus}
                            clearInput={clearInput}
                            onKeyDown={handleKeyDown}
                        />
                        <MyDrawer 
                            ref={drawerButtonRef}
                            onButtonClick={handleButtonClick} 
                            countryDetails={countryDetails} 
                            isValid={isValid}
                        />
                    </div>
                    <CountriesList 
                        filteredCountries={filteredCountries} 
                        handleCountryClick={handleCountryClick} 
                        highlightedIndex={highlightedIndex}
                        hoveredIndex={hoveredIndex}
                        setHoveredIndex={setHoveredIndex}

                    />
                </form>

            </div>
            

        </main> 
    )
}
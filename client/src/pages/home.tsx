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
    const [errorMessage, setErrorMessage] = useState('');

    const [countryDetails, setCountryDetails] = useState<CountryDetailsType | null>(null);


    // To update what is on the input field, and update the dropdown list
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchQuery = e.target.value.toLowerCase();
        setInputValue(searchQuery);
        setErrorMessage('');
    
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
        setErrorMessage(''); // reset the error message
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

        if (!isValidCountry) {
            setErrorMessage('Please enter a valid country!');
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
        if (event.key === "Enter") {
            event.preventDefault();
    
            // Check if the current input can autocomplete to a valid country
            const matchedCountry = countries_list.find(country =>
                country.name.toLowerCase().startsWith(inputValue.toLowerCase())
            );
    
            if (matchedCountry) {
                setInputValue(matchedCountry.name); // Auto-complete the input field
                setErrorMessage(''); // Clear any existing error message
                // Trigger other necessary actions like opening the drawer
                drawerButtonRef.current?.click();
            } else {
                // Only show error if no valid country is matched
                setErrorMessage('Please enter a valid country!');
            }
        }
    };
    

    function isMobileDevice() {
        return (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ||
                window.matchMedia("only screen and (max-width: 760px)").matches ||
                ('ontouchstart' in document.documentElement && navigator.userAgent.match(/Mobi/)));
    }
    
    // In your React component
    const [isInputFocused, setIsInputFocused] = useState(false);
    
    // Function to handle input focus
    const handleInputFocus = () => {
        if (isMobileDevice()) {
            setIsInputFocused(true);
            // Scroll the input field into view
            setTimeout(() => {
                const inputElement = document.querySelector('input-selector'); // Replace 'input-selector' with the actual selector for your input field.
                if (inputElement instanceof HTMLElement) {
                    inputElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }, 300); // Adjust the timeout as needed
        }

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
        // <main className="flex flex-col items-center justify-center bg-cover bg-center min-h-[86vh] md:min-h-screen">
        <main 
            className={`min-h-[100svh] md:min-h-screen ${isInputFocused ? 'input-focused' : 'flex flex-col items-center justify-center bg-cover bg-center'}`}
        >
            <div style={{ position: 'fixed', top: '1rem', right: '1rem', display: isInputFocused ? 'none' : 'block' }}>
                <ModeToggle />
            </div>
            <div className={`md:mb-20`}>
                {/* <Header/> */}
                <Header customStyles={` ${isInputFocused ? 'hidden' : ''}`} />
                <div className={`flex ${isInputFocused ? 'top-4 relative ml-2 max-h-screen justify-start' : 'flex-col items-center'}`}>
                    <form className="w-auto flex flex-col relative">
                        <div className="flex flex-row mb-2 mr-[0.35rem]">
                            <Input
                                inputValue={inputValue} 
                                handleInputChange={handleInputChange}
                                handleInputFocus={handleInputFocus}
                                clearInput={clearInput}
                                onKeyDown={handleKeyDown}
                                customStyles={`${isInputFocused ? 'w-full' : ''}`}
                            />
                            <MyDrawer 
                                ref={drawerButtonRef}
                                onButtonClick={handleButtonClick} 
                                countryDetails={countryDetails} 
                                isValid={isValid}
                            />
                        </div>
                        {errorMessage && <div className="text-red-500 text-sm mb-2">{errorMessage}</div>}
                        <CountriesList 
                            filteredCountries={filteredCountries} 
                            handleCountryClick={handleCountryClick} 
                            highlightedIndex={highlightedIndex}
                            hoveredIndex={hoveredIndex}
                            setHoveredIndex={setHoveredIndex}
                        />
                    </form>
                    {isInputFocused && (
                        <div className="mr-2">
                            <ModeToggle />
                        </div>
                    )}
                </div>
            </div>
        </main> 
    )
}
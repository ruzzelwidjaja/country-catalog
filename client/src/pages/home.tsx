import { useCallback, useEffect, useRef, useState } from "react";

import { countries_list } from "@/lib/config/countries_list";
import { CountriesListType, CountryDetailsType } from "@/lib/types";
import { fetchCountryData } from "@/lib/cache";

import { ModeToggle } from "@/components/home/mode-toggle";
import DummyContent from '@/components/home/dummyContent';
import { Header } from "@/components/home/header";
import { CountriesList } from "@/components/home/countriesList";
import { Input } from "@/components/ui/input";
import { MyDrawer } from "@/components/drawer/drawer";


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

    const [isMobile, setIsMobile] = useState(false);
    const [isDummyVisible, setIsDummyVisible] = useState(true);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const checkIfMobile = () => {
            return !!(/Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
                      window.matchMedia("only screen and (max-width: 760px)").matches ||
                      ('ontouchstart' in document.documentElement && navigator.userAgent.match(/Mobi/)));
        };

        const mobileStatus = checkIfMobile();
        setIsMobile(mobileStatus);
        setIsDummyVisible(mobileStatus); // Set isDummyVisible based on mobile status
    }, []);

    // New state to toggle visibility
    useEffect(() => {
        if (isMobile && !isDummyVisible) {
            inputRef.current?.focus();
        }
    }, [isDummyVisible, isMobile]);

    const handleDummyClick = () => {
        setIsDummyVisible(false);
    };


    return (
        <main className={`${!isDummyVisible ? 'min-h-[100vh] flex flex-col items-center justify-center bg-cover bg-center' 
                                            : 'min-h-[100vh] md:min-h-screen flex items-center justify-center'}`}
        >
            {isDummyVisible && isMobile && (
                <DummyContent onDummyClick={handleDummyClick} />
            )}

            <div className={`fixed top-4 right-4 ${isMobile && !isDummyVisible ? 'hidden' : ''}`}>
                <ModeToggle />
            </div>

            <div className={`${!isDummyVisible ? 'block' : 'hidden'} ${isMobile ? 'absolute top-4' : 'relative'}`}>
                <Header customStyles={`${isMobile ? 'hidden' : ''}`} />
                <div className={`flex flex-col items-center ${isMobile ? 'top-4 ml-2' : '' }`}>
                    <form className="w-auto flex flex-row relative">
                        <div className="flex flex-row mb-2 mr-[0.35rem]">
                            <Input
                                ref={inputRef}
                                id="actual-input"
                                inputValue={inputValue} 
                                handleInputChange={handleInputChange}
                                handleInputFocus={handleInputFocus}
                                clearInput={clearInput}
                                onKeyDown={handleKeyDown}
                                customStyles={`${!isDummyVisible ? 'w-full' : ''}`}
                            />
                            <MyDrawer 
                                ref={drawerButtonRef}
                                onButtonClick={handleButtonClick} 
                                countryDetails={countryDetails} 
                                isValid={isValid}
                            />
                        </div>
                        {isMobile && (
                            <div className="mr-2"><ModeToggle/></div>
                        )}
                    </form>
                    {errorMessage && <div className="text-red-500 text-sm mb-2">{errorMessage}</div>}

                    <CountriesList 
                            filteredCountries={filteredCountries} 
                            handleCountryClick={handleCountryClick} 
                            highlightedIndex={highlightedIndex}
                            hoveredIndex={hoveredIndex}
                            setHoveredIndex={setHoveredIndex}
                        />
                </div>
            </div>
        </main> 
    )
}
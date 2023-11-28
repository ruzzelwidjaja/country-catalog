// src/lib/useHome.ts
import { useState, useEffect, useRef, useCallback } from 'react';
import { countries_list } from './config/countries_list';
import { CountriesListType, CountryDetailsType } from './types';
import { checkIfMobile } from './utils';
import { fetchCountryData } from "@/lib/cache";


export const useHome = () => {
    const [inputValue, setInputValue] = useState('');
    const [isValid, setIsValid] = useState(true); // Validate country in input field

    const [filteredCountries, setFilteredCountries] = useState<CountriesListType[]>([]); // Dropdown list
    const [highlightedIndex, setHighlightedIndex] = useState(0); // Highlight first country in dropdown
    // const [hoveredIndex, setHoveredIndex] = useState(0); // Index of hovered country
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);

    const [searchHistory, setSearchHistory] = useState<CountryDetailsType[]>([]);
    const [filteredSearchHistory, setFilteredSearchHistory] = useState<CountryDetailsType[]>([]);


    const [errorMessage, setErrorMessage] = useState(''); // Error message when country entered is not valid

    const [countryDetails, setCountryDetails] = useState<CountryDetailsType | null>(null); // Country Data

    const [isMobile, setIsMobile] = useState(false); // Determine if user is on mobile
    const [isDummyVisible, setIsDummyVisible] = useState(true); // State to show/hide dummy

    const drawerButtonRef = useRef<HTMLButtonElement>(null); // Another way to trigger the drawer button
    const inputRef = useRef<HTMLInputElement>(null); // Focus on input field when dummy is hidden

    // To update what is on the input field, and update the dropdown list
    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const searchQuery = e.target.value.toLowerCase();
        setInputValue(searchQuery);
        setErrorMessage('');
        
        // Filter the countries list based on the input
        const searchResults = countries_list.filter(country =>
            country.name.toLowerCase().includes(searchQuery) ||
            country.continent.toLowerCase().includes(searchQuery)
        );
        setFilteredCountries(searchResults);

        // Filter the search history based on the input
        const historyResults = searchHistory.filter(country =>
            country.name.common.toLowerCase().includes(searchQuery)
        );
        setFilteredSearchHistory(historyResults);

        // Reset highlightedIndex to 0 whenever the input changes
        setHighlightedIndex(0);
    }, [searchHistory]);

    // When a country is clicked from the dropdown list
    const handleCountryClick = useCallback((country: string) => {
        setInputValue(country);
        setFilteredCountries([]); // to clear the dropdown list
        setIsValid(true); // enable button click (country is defenitely valid as it's from dropdown list)
        setErrorMessage(''); // reset error message
    }, []);


    const handleButtonClick = useCallback(async () => {
        const isValidCountry = countries_list.some(country =>
            country.name.toLowerCase() === inputValue.toLowerCase()
        );

        if (isValidCountry) {
            setCountryDetails(null); // Reset to show loading state (skeleton)
            try {
                const data = await fetchCountryData(inputValue);
                setCountryDetails(data);
                setSearchHistory(prevHistory => [data, ...prevHistory.filter(h => h.name.common !== data.name.common)]);
            } catch (error) {
                console.error("Error fetching country details: ", error);
            }
        } else {
            setIsValid(false); // Disable button
            setCountryDetails(null); // Reset or handle invalid country
            setErrorMessage('Please enter a valid country!'); // Render error message
        }
    }, [inputValue]);

    // Highlighted country
    useEffect(() => {
        setHighlightedIndex(0);
    }, [filteredCountries]);

    // Update isValid whenever inputValue changes
    useEffect(() => {
        const isValidCountry = inputValue !== '' && countries_list.some(country =>
            country.name.toLowerCase() === inputValue.toLowerCase()
        );
        setIsValid(isValidCountry);
    }, [inputValue]);

    // Trigger the drawer button and populate countryDetails with data through handleButtonClick()
    // useEffect(() => {
    //     if (inputValue && isValid) {
    //         handleButtonClick();
    //         drawerButtonRef.current?.click();
    //     }
    // }, [inputValue, isValid, handleButtonClick])
    useEffect(() => {
        const isValidCountry = countries_list.some(country => 
            country.name.toLowerCase() === inputValue.toLowerCase()
        );
        
        if (isValidCountry) {
            handleButtonClick(); // Trigger the drawer to open
            drawerButtonRef.current?.click();
        }
    }, [inputValue, handleButtonClick]);

    // Checks if user is on mobile and renders dummy if yes
    useEffect(() => {
        setIsMobile(checkIfMobile()); // Set isMobile to True/False
        setIsDummyVisible(checkIfMobile()); // Toggle dummy based on mobile status
    }, []);

    // State to toggle visibility
    useEffect(() => {
        if (isMobile && !isDummyVisible) {
            inputRef.current?.focus();
        }
    }, [isDummyVisible, isMobile]);

    // Hides dummy and set search component to be active
    const handleDummyClick = () => {
        setIsDummyVisible(false);
    };

    // Autocompletes input field and then triggers drawer button if user presses enter key
    // const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    //     if (event.key === "Enter") {
    //         event.preventDefault();
    //         const totalItems = searchHistory.length + filteredCountries.length;
    //         // Check if the current input can autocomplete to a valid country
    //         const matchedCountry = countries_list.find(country =>
    //             country.name.toLowerCase().startsWith(inputValue.toLowerCase())
    //         );
    
    //         if (matchedCountry) {
    //             setInputValue(matchedCountry.name); // Autocomplete the input field
    //             setErrorMessage(''); // Clear any existing error message
    //             drawerButtonRef.current?.click(); // Trigger drawer button
    //         } else {
    //             // Only show error if no valid country is matched
    //             setErrorMessage('Please enter a valid country!'); 
    //         }
    //     }
    // };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
    
            const totalItems = filteredSearchHistory.length + filteredCountries.length;
    
            if (highlightedIndex < totalItems) {
                // There's an item highlighted in either the search history or filtered countries
                if (highlightedIndex < filteredSearchHistory.length) {
                    // Handle selection from filtered search history
                    const selectedCountry = filteredSearchHistory[highlightedIndex];
                    setInputValue(selectedCountry.name.common);
                } else {
                    // Handle selection from filtered countries
                    const filteredIndex = highlightedIndex - filteredSearchHistory.length;
                    const selectedCountry = filteredCountries[filteredIndex];
                    setInputValue(selectedCountry.name);
                }
                drawerButtonRef.current?.click(); // Trigger drawer button
                setFilteredCountries([]); // Clear the dropdown
            } else {
                // Handle the case where the input value doesn't match any item
                const matchedCountry = countries_list.find(country =>
                    country.name.toLowerCase().startsWith(inputValue.toLowerCase())
                );
    
                if (matchedCountry) {
                    setInputValue(matchedCountry.name); // Autocomplete the input field
                    drawerButtonRef.current?.click(); // Trigger drawer button
                } else {
                    setErrorMessage('Please enter a valid country!');
                }
            }
        }
    };
    

    // Function to handle input focus
    const handleInputFocus = () => {
        console.log("Input Focused");
        if (!inputValue) {
            console.log("Setting filtered countries to full list")
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

    return {
        inputValue, setInputValue,
        filteredCountries, setFilteredCountries,
        highlightedIndex, setHighlightedIndex,
        hoveredIndex, setHoveredIndex,
        searchHistory,
        filteredSearchHistory,
        isValid, setIsValid,
        errorMessage, setErrorMessage,
        countryDetails, setCountryDetails,
        isMobile, setIsMobile,
        isDummyVisible, setIsDummyVisible,
        drawerButtonRef, inputRef,
        handleInputChange,
        handleCountryClick,
        handleButtonClick,
        handleDummyClick,
        handleKeyDown,
        handleInputFocus
    };
};

import { useHome } from '@/lib/useHome';

import { countries_list } from '@/lib/config/countries_list';

import { ModeToggle } from '@/components/home/mode-toggle';
import DummyContent from '@/components/home/dummyContent';
import { Header } from '@/components/home/header';
import { CountriesList } from '@/components/home/countriesList';
import { Input } from '@/components/ui/input';
import { MyDrawer } from '@/components/drawer/drawer';

export default function Home() {
    const {
        inputValue, setInputValue,
        filteredCountries, setFilteredCountries,
        highlightedIndex,
        hoveredIndex,setHoveredIndex,
        filteredSearchHistory,
        isValid,
        errorMessage,
        countryDetails,
        isMobile,
        isDummyVisible,
        drawerButtonRef, inputRef,
        handleInputChange,
        handleCountryClick,
        handleButtonClick,
        handleDummyClick,
        handleKeyDown,
        handleInputFocus
    } = useHome();

    return (
        <main className={`antialiased ${!isDummyVisible ? 'min-h-[100vh] flex flex-col items-center justify-center bg-cover bg-center' 
                                                         : 'min-h-[100vh] md:min-h-screen flex items-center justify-center'}`}>
            {/* Dummy header, input field, and button */}
            {isDummyVisible && isMobile && (
                <DummyContent onDummyClick={handleDummyClick} />
            )}

            {/* Dark mode toggle */}
            <div className={`fixed top-4 right-4 ${isMobile && !isDummyVisible ? 'hidden' : ''}`}>
                <ModeToggle />
            </div>
            
            {/* Header, input field, button, dropdown list, error message, drawer */}
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
                                clearInput={() => {
                                    setInputValue('');
                                    setFilteredCountries(countries_list);
                                    inputRef.current?.focus();
                                }}
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
                        {/* Dark mode toggle */}
                        {isMobile && (
                            <div className="mr-2"><ModeToggle/></div>
                        )}
                    </form>

                    {errorMessage && <div className="text-red-500 text-sm mb-2">{errorMessage}</div>}
                    {/* Dropdown list */}
                    <CountriesList 
                        filteredCountries={filteredCountries} 
                        searchHistory={filteredSearchHistory}
                        handleCountryClick={handleCountryClick} 
                        highlightedIndex={highlightedIndex}
                        hoveredIndex={hoveredIndex}
                        setHoveredIndex={setHoveredIndex}
                    />
                </div>
            </div>

        </main> 
    );
}

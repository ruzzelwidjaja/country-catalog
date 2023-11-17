import { Search, X } from 'lucide-react';
import React from 'react';

type searchInputProps = {
  inputValue: string;
  // isValid: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearInput: () => void;
};

// export const Input: React.FC<searchInputProps> = ({ inputValue, isValid, handleInputChange }) => {
export const Input: React.FC<searchInputProps> = ({ inputValue, handleInputChange, clearInput }) => {
    return (
    <div className="relative w-full mr-1.5">

      <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
        <Search strokeWidth={2.2} className='w-[1.05rem] h-[1.05rem]' />
      </span> 

    
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className={`text-primary text-[0.9rem] w-full p-[0.4512rem] rounded-md pl-[2.15rem] bg-background placeholder-muted-foreground 
                    border-2 border-grey focus:border-indigo-500 focus:outline-none focus:bg-bgHover
                    hover:bg-bgHover hover:border-[#9e8cfc]`}
                    // ${!isValid && 'border-red-500'}`}
        placeholder="Search for a country"
      />

      {inputValue && (
        <button 
          onClick={clearInput} 
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
        >
          <X strokeWidth={2.5} className='w-[1.05rem] h-[1.05rem]' />
        </button>
      )}

    </div>
  );
}

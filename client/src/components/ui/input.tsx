import { Search, X } from 'lucide-react';
import React from 'react';

type searchInputProps = {
  inputValue: string;
  // isValid: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputFocus: () => void;
  clearInput: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void; // Add this line

};

// export const Input: React.FC<searchInputProps> = ({ inputValue, isValid, handleInputChange }) => {
export const Input: React.FC<searchInputProps> = 
  ({ 
    inputValue, 
    handleInputChange, 
    handleInputFocus,
    clearInput,
    onKeyDown,
  }) => {
    return (
    <div className="relative w-[17rem] mr-1.5">

      <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
        <Search strokeWidth={2.2} className='w-[1.05rem] h-[1.05rem]' />
      </span> 

    
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onKeyDown={onKeyDown}
        className={`text-primary text-[16px] w-full p-[0.4512rem] rounded-md pl-[2.15rem] bg-background placeholder-muted-foreground 
                    border-2 border-input focus:border-indigo-500 focus:outline-none focus:bg-bgHover
                    hover:bg-bgHover hover:border-[#9e8cfc]`}
        placeholder="Search by name/continent"
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

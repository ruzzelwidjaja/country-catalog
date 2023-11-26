import React from 'react';

interface HeaderProps {
  customStyles?: string;
}

export const Header: React.FC<HeaderProps> = ({ customStyles }) => {
  return (
    <div className={`mb-8 text-center ${customStyles}`}>
      <h1 className='text-4xl text-primary mb-3'>country catalog</h1>
      <h2 className='text-grayLD'>Discover information about any country.</h2>
    </div>  
  );
};

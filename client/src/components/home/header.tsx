import React from 'react';

export const Header: React.FC = () => {
  return (
    <div className='mb-8 text-center'>
      <h1 className='text-4xl text-primary mb-3'>country catalog</h1>
      <h2 className='text-grayLD'>Discover countries by clicking the {`>`} button.</h2>
    </div>  
);
};

import React from 'react';

interface InfoItemProps {
  label: React.ReactNode;
  value: string | JSX.Element;
}

export const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => {
  return (
    <div className="p-4 rounded-[14px] hover:bg-bgHover">
      <p className='text-grayLD'>{label}</p>
      <p className='font-semibold'>{value}</p>
    </div>
  );
};

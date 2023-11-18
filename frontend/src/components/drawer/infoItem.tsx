import React from 'react';

interface InfoItemProps {
  label: React.ReactNode;
  value: string | JSX.Element;
}

export const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => {
  return (
    <div className="px-6 py-4 rounded-[14px] hover:bg-bgHover">
      <div className='text-grayLD'>{label}</div>
      <div className='font-semibold'>{value}</div>
    </div>
  );
};

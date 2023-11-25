import React from 'react';
import { Search, ChevronRight } from 'lucide-react';
import { Header } from "@/components/home/header";

type DummyContentProps = {
  onDummyClick: () => void; // Function to handle the dummy click
};

const DummyContent: React.FC<DummyContentProps> = ({ onDummyClick }) => {
  return (
    <div className="flex flex-col items-center justify-center">
        <Header />
        <div 
            onClick={onDummyClick}
            className="flex items-center space-x-2 mb-20"
        >
            {/* Dummy Input */}
            <div className="relative w-[17rem] h-[2.65rem] border-2 border-input rounded-md flex items-center">
                <Search strokeWidth={2.2} className='w-[1.05rem] h-[1.05rem] ml-3' />
                <span className="ml-2 text-muted-foreground">Search by name/continent</span>
            </div>
            
            {/* Dummy Button */}
            <div className="w-[2.65rem] h-[2.65rem] border-2 border-input rounded-md flex items-center justify-center">
              <ChevronRight className="h-6 w-6" color="#7f7a7a" />
            </div>
        </div>
    </div>
  );
};

export default DummyContent;

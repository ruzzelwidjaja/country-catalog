import { useState, useEffect } from 'react';
import { track } from '@vercel/analytics';
import { Drawer } from "vaul";
import { Button } from '../ui/button';
import { Sparkles } from 'lucide-react';
import LoadingBar from 'react-top-loading-bar';

import { GptDrawerContent } from './gptDrawerContent';
import { GptDrawerContentSkeleton } from './gptDrawerContentSkeleton';

import { CountryDetailsType } from "@/lib/types";
import { fetchTravelRecommendations } from '@/lib/gptCache';


interface DrawerProps {
  countryDetails: CountryDetailsType | null;
}

export function GptDrawer({ countryDetails }: DrawerProps) {
  const [recommendations, setRecommendations] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (progress < 100 && recommendations === '') {
      const timer = setTimeout(() => setProgress(progress + 1), 100); // Increment by 1% every 100ms
      return () => clearTimeout(timer);
    }
  }, [progress, recommendations]);

  const handleButtonClick = async () => {
    // Track the event when the button is clicked
    track('Generate Recommendations', { country: countryDetails?.name?.common || 'Unknown' });

    setProgress(10); // Start progress

    try {
      const countryName = countryDetails?.name?.common || '';
      if (countryName) {
        const data = await fetchTravelRecommendations(countryName);
        console.log("GPT DATA::", data)
        setRecommendations(data.recommendations.content);
      }
    } catch (error) {
      console.error('Failed to fetch recommendations:', error);
    } finally {
      setProgress(100); // Complete the progress
    }
  };

  return (
    <Drawer.NestedRoot>
      <Drawer.Trigger asChild>
        <Button onClick={handleButtonClick} className='w-full text-primary text-[16px] bg-[#bdb0ff] hover:bg-[#9e8cfc] dark:bg-indigo-500 dark:hover:bg-indigo-400'>
          <Sparkles className="mr-2 h-4 w-4" /> Generate travel recommendations
        </Button> 
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="geist-font bg-zinc-100 flex flex-col h-full max-h-[94%] mt-24 fixed bottom-0 left-0 right-0">
          <LoadingBar color='#9e8cfc' progress={progress} onLoaderFinished={() => setProgress(0)} />
          {recommendations === ''
            ? <GptDrawerContentSkeleton />
            : <GptDrawerContent recommendations={recommendations} countryDetails={countryDetails} />
          }
          {/* <GptDrawerContentSkeleton/> */}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.NestedRoot>
  );
}
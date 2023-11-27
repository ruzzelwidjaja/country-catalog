// import { Drawer } from "vaul";
import { CountryDetailsType } from "@/lib/types";
import { GptHeader } from "./gptHeader";
import { GptFooter } from "./gptFooter";

interface DrawerContentProps {
  countryDetails: CountryDetailsType | null;
  recommendations: string;
}

export function GptDrawerContent({ countryDetails, recommendations }: DrawerContentProps) {
  // const recommendations = countryDetails?.recommendations?.content;
  // const recommendations = "1. Explore the Giant's Causeway ::\nThe Giant's Causeway is a UNESCO World Heritage Site and one of Ireland’s most magnificent natural attractions. The causeway is filled with about 40,000 interlocking basalt columns formed by ancient volcanic activity. Don't forget your camera, as this unique geological wonder is perfect for all you photographers out there. The Grand Causeway is the main attraction, but we recommend also walking the Shepherd's Steps to see the Organ and the Chimney Tops. \n\n2. Navigating the Ring of Kerry ::\nA renowned circuit through the south-west of Ireland, the Ring of Kerry spans 120 miles and has everything from beaches to mountains. You’ll also stumble across charming villages where you can immerse in local culture. To beat the crowds, it's better to start the route early in the morning, and traveling counter-clockwise may result in less traffic.\n\n3. Kayaking with Dolphins in Dingle Bay ::\nThis bay off the southwest coast of Ireland is an ideal spot for kayaking, with plenty to see in its serene waters. With a little luck, you may get to kayak alongside one of the bay's most famous residents, the bottlenose dolphin named Fungie. Make sure book this activity in advance as it can get busy during peak season.\n\n4. Visit the Historic Guinness Storehouse ::\nLocated in Dublin’s city center, the Guinness Storehouse is a must-visit for beer lovers. It's actually Ireland’s most popular tourist attraction. Take a tour around the seven-story building to learn about the brewing process and the history of this world-famous stout. The Gravity Bar at the top of the building offers a 360-degree view of Dublin city - the perfect accompaniment to your complimentary pint of Guinness. We recommend booking your visit online to avoid long queues at the entrance. \n\n5. Discover the Cliffs of Moher ::\nUndeniably one of Ireland's most famous sights, the Cliffs of Moher offer breathtaking views. The cliffs rise up to 702 feet at their highest point and stretch for 5 miles along the Atlantic coast. As it might get extremely windy at the site, don't forget to bring your windbreaker. Try visiting in the quieter hours of morning or evening to avoid the biggest crowds."

  return (
    <div className="antialiased h-full bg-background">
      <div className="mt-4 mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-500 mb-8" />
      <div className="pb-4 px-6 mx-auto bg-background flex-1 overflow-y-auto overflow-x-hidden h-full max-w-sm sm:max-w-lg md:max-w-xl ">
        <GptHeader countryDetails={countryDetails}/>
        <hr className="my-3 w-11/12 mx-auto"/>
        <div className="px-4 mb-32 text-sm">
          {recommendations ? 
              recommendations.split('\n\n').map((section, index) => {
                const [title, description] = section.split('::');
                return (
                  <div key={index} className="mb-4">
                    <div className="font-medium text-lg">{title}</div>
                    <div className="text-grayLD text-sm">{description}</div>
                  </div>
                );
              })
              : <p>No recommendations available.</p>
            }
        </div>
      </div>

      <div className="fixed bottom-0 inset-x-0 mt-auto">
        <GptFooter/>
      </div>
    </div>
  )
}
import { GptFooter } from "./gptFooter";

function LoadingDot({ delay, color }: { delay: string; color: string }) {
  return (
    <div className={`h-[6px] w-[6px] ${color} rounded-full animate-bounce ${delay}`}></div>
  );
}

function LoadingDots() {
  return (
    <div className="flex pt-3 ml-2 space-x-1">
      <LoadingDot delay="delay-0" color="bg-indigo-600 dark:bg-indigo-400" />
      <LoadingDot delay="delay-150" color="bg-indigo-700 dark:bg-indigo-500" />
      <LoadingDot delay="delay-300" color="bg-indigo-800 dark:bg-indigo-600" />
    </div>
  );
}

function Paragraph () {
  return (
    <div className="flex flex-col mb-4">
      <div className="h-[1.2rem] w-10/12 mb-2 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
      <div className="h-[1rem] w-11/12 mb-1 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
      <div className="h-[1rem] w-10/12 mb-1 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
      <div className="h-[1rem] w-7/12 mb-1 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
      <div className="h-[1rem] w-11/12 mb-1 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
      <div className="h-[1rem] w-full mb-1 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
      <div className="h-[1rem] w-5/12 mb-1 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
    </div>
  )
}

export const GptDrawerContentSkeleton = () => {
    return (
      <section className="h-full">
        <div className="p-4 bg-background flex-1">
          <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-500 mb-4" />
          <div className="max-w-sm mx-auto md:max-w-xl px-2">
            {/* Header */}
            {/* <header className="pt-4 pl-4 mx-4">
              <div className="pr-5 h-[1.78rem] w-10/12 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
              <hr className="my-4 w-11/12 mx-auto"/>              
            </header> */}
            <header className="pt-4 pl-4 mx-4">
              <div className="flex items-center text-2xl font-medium">
                {/* <span> Crafting unique travel insights just for you... </span><LoadingDots /> */}
                <span className="text-indigo-600 dark:text-indigo-400">Generating guide</span>
                <LoadingDots />
              </div>
            </header>

            <hr className="mt-3 mb-[17px] w-11/12 mx-auto"/>              

            {/* Body */}
            <div className="flex flex-col px-4">
              <Paragraph/>
              <Paragraph/>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 inset-x-0 mt-auto">
          <GptFooter/>
        </div>
      </section>
    );
  };
  
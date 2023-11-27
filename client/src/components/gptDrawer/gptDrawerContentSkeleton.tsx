import { GptFooter } from "./gptFooter";

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
      <body className="h-full">
        <div className="p-4 bg-background flex-1">
          <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-500 mb-4" />
          <div className="max-w-sm mx-auto md:max-w-xl px-2">
            {/* Header */}
            <header className="pt-4 pl-4 mx-4">
              <div className="pr-5 h-[1.78rem] w-10/12 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
              <hr className="my-4 w-11/12 mx-auto"/>              
            </header>

            {/* Body */}
            <body className="flex flex-col px-4">
              <Paragraph/>
              <Paragraph/>
              <Paragraph/>
              <Paragraph/>
            </body>
          </div>
        </div>

        <div className="fixed bottom-0 inset-x-0 mt-auto">
          <GptFooter/>
        </div>
      </body>
    );
  };
  
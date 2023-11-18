import { Drawer } from "vaul";

function InfoItemSkeleton () {
  return (
    <div className="mx-6 my-[0.9rem] rounded-[14px]">
      <div className='mb-3 bg-gray-300 rounded h-5 w-8/12 animate-pulse'></div>
      <div className='bg-gray-300 rounded h-5 w-8/12 animate-pulse'></div>
    </div>
  )
}


export function DrawerContentSkeleton() {
    return (
      <Drawer.Content className="bg-zinc-100 flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0">
        <div className="p-4 bg-background rounded-t-[10px] flex-1">
          <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-500 mb-4" />

          <header className="p-4 pb-0">
            {/* Name and Flag Skeleton */}
            <div className="flex justify-between items-center mr-4 pl-4">
              <div className="pr-5 w-1/2 bg-gray-300 rounded h-8 animate-pulse"></div>
              <div className="w-16 h-10 bg-gray-300 rounded animate-pulse"></div>
            </div>
            
            {/* Capital Cities Skeleton */}
            <div className="ml-4 mt-2 bg-gray-300 rounded h-4 w-1/3 animate-pulse"></div>

            <hr className="mt-6 mb-5 w-11/12 mx-auto"/>
            
            {/* Languages Skeleton */}
            <div className="ml-2 flex">
              <div className="mr-6 bg-gray-300 rounded h-4 w-3/12 animate-pulse"></div>
              <div className="bg-gray-300 rounded h-4 w-1/2 animate-pulse"></div>
            </div>

            <hr className="mt-5 mb-4 w-11/12 mx-auto"/>
          </header>

          {/* Body */}
          <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-3 md:grid-rows-2 ml-4 mr-2">
            <InfoItemSkeleton />
            <InfoItemSkeleton />
            <InfoItemSkeleton />
            <InfoItemSkeleton />
            <InfoItemSkeleton />
            <InfoItemSkeleton />
          </div>

          <hr className="my-4 w-11/12 mx-auto"/>

          <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-3 md:grid-rows-2 ml-4 mr-2">
            <InfoItemSkeleton />
            <InfoItemSkeleton />
            <InfoItemSkeleton />
            <InfoItemSkeleton />
            <InfoItemSkeleton />
            <InfoItemSkeleton />
          </div>

        </div>

      </Drawer.Content>
    );
  }
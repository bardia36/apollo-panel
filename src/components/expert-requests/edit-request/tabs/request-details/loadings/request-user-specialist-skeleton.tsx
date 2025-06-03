import { Skeleton } from "@heroui/react";

export default function RequestUserSpecialistSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2 lg:col-span-1">
        <Skeleton className="h-4 w-16 mb-2 rounded-lg" />

        <div className="p-4 flex flex-wrap items-center gap-4 bg-content1 rounded-3xl mb-2">
          <Skeleton className="w-12 h-12 rounded-large" />

          <div className="flex-1">
            <Skeleton className="h-5 w-32 mb-2 rounded-lg" />
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Skeleton className="w-4 h-4 rounded-full" />
                <Skeleton className="h-4 w-28 rounded-lg" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="w-4 h-4 rounded-full" />
                <Skeleton className="h-4 w-28 rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center flex-wrap gap-2">
          <Skeleton className="h-8 w-40 rounded-lg" />
          <div className="flex gap-2">
            <Skeleton className="h-5 w-16 rounded-lg" />
            <Skeleton className="h-5 w-16 rounded-lg" />
          </div>
        </div>
      </div>

      <div className="col-span-2 lg:col-span-1">
        <Skeleton className="h-4 w-20 mb-2 rounded-lg" />

        <div className="p-4 flex flex-wrap items-center gap-4 bg-content1 rounded-3xl mb-2">
          <Skeleton className="w-12 h-12 rounded-full" />

          <div className="flex-1">
            <Skeleton className="h-5 w-32 mb-2 rounded-lg" />
            <div className="flex items-center gap-2">
              <Skeleton className="w-5 h-4 rounded-sm" />
              <Skeleton className="h-4 w-40 rounded-lg" />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-2">
          <div>
            <Skeleton className="h-3 w-24 mb-1 rounded-lg" />
            <Skeleton className="h-3 w-20 rounded-lg" />
          </div>

          <div className="flex">
            <Skeleton className="w-8 h-8 rounded-full border-2" />
          </div>
        </div>
      </div>
    </div>
  );
}

import { Skeleton } from "@heroui/react";

export default function ImagesStatusAlertSkeleton() {
  return (
    <div className="flex flex-col items-center bg-content1 shadow-md rounded-3xl lg:col-span-8 p-6">
      <div className="min-h-[156px] w-full flex items-center justify-center mb-6">
        <Skeleton className="w-full h-[156px] rounded-2xl" />
      </div>

      <div className="flex flex-col items-center gap-6 w-full">
        <div className="flex flex-col items-center gap-2 w-full">
          <Skeleton className="w-1/2 h-6 rounded-lg" />
          <Skeleton className="w-3/4 h-6 rounded-lg mt-4" />
          <Skeleton className="w-1/2 h-10 rounded-lg mt-4" />
        </div>
      </div>
    </div>
  );
}

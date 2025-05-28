import { Skeleton } from "@heroui/react";

export const StepThreeLoading = () => {
  return (
    <div className="flex flex-col h-full gap-6">
      <Skeleton className="w-32 h-5 rounded-lg" />
      <div className="p-4 flex flex-col gap-4 bg-default-50 shadow-md rounded-[20px]">
        <div className="flex items-center gap-2">
          <Skeleton className="w-12 h-12 rounded-full" />

          <div className="flex-1">
            <Skeleton className="w-32 h-6 mb-1 rounded-lg" />
            <Skeleton className="w-24 h-4 rounded-lg" />
          </div>

          <div className="text-sm ms-auto">
            <Skeleton className="w-20 h-5 mb-1 rounded-lg ms-auto" />
            <Skeleton className="w-28 h-4 rounded-lg" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="w-12 h-12 rounded-full" />

          <div className="flex-1">
            <Skeleton className="w-36 h-6 mb-1 rounded-lg" />
            <Skeleton className="w-28 h-4 rounded-lg" />
          </div>

          <div className="ms-auto text-end">
            <Skeleton className="w-24 h-5 mb-1 rounded-lg ms-auto" />
            <Skeleton className="w-32 h-4 rounded-lg" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="w-12 h-12 rounded-full" />

          <div className="flex-1">
            <Skeleton className="w-40 h-6 mb-1 rounded-lg" />
            <Skeleton className="w-32 h-4 rounded-lg" />
          </div>

          <div className="ms-auto text-end">
            <Skeleton className="w-24 h-5 mb-1 rounded-lg ms-auto" />
            <Skeleton className="w-32 h-4 rounded-lg" />
          </div>
        </div>
      </div>

      <Skeleton className="w-full h-14 rounded-medium" />
      <Skeleton className="w-full h-14 rounded-medium" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <Skeleton className="w-full h-20 rounded-lg" />
        <Skeleton className="w-full h-20 rounded-lg" />
        <Skeleton className="w-full h-20 rounded-lg" />
      </div>

      <div className="flex justify-end mt-auto">
        <Skeleton className="w-32 h-10 rounded-lg me-4" />
        <Skeleton className="w-32 h-10 rounded-lg" />
      </div>
    </div>
  );
};

import { FC } from "react";
import { Skeleton } from "@heroui/skeleton";

export const TemplatesLoadingSkeleton: FC = () => {
  return (
    <>
      <Skeleton className="w-full h-14 mt-2 mb-6 rounded-lg" />

      <Skeleton className="w-full h-12 mb-2 rounded-lg" />

      <div className="p-4 flex flex-col gap-4 bg-default-50 text-default-600 border-dashed shadow-lg rounded-[20px] border-default-200 border-2">
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} className="w-full h-16 rounded-lg" />
          ))}
      </div>
    </>
  );
};

import { Skeleton } from "@heroui/react";

export default function RequestContentSkeleton() {
  return (
    <div className="h-full flex flex-col gap-1.5">
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-32 rounded-lg" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>

      <div className="bg-content1 rounded-3xl p-4 flex-1">
        {[1, 2, 3].map((index) => (
          <div key={index} className="mb-4 last:mb-0">
            <Skeleton className="h-4 w-24 mb-1 rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}

import { Skeleton } from "@heroui/react";

export default function RequestStatusSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-4 w-24 rounded-lg" />

      <div className="flex flex-col gap-2">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="flex items-center gap-4 px-3 py-2 rounded-large"
          >
            <Skeleton className="w-9 h-9 rounded-full" />

            <div className="flex-1">
              <Skeleton className="h-4 w-32 mb-1 rounded-lg" />
              <Skeleton className="h-3 w-40 rounded-lg" />
            </div>
          </div>
        ))}
      </div>

      <Skeleton className="h-12 rounded-lg" />
    </div>
  );
}

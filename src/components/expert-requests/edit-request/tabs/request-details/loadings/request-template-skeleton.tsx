import { Skeleton } from "@heroui/react";

export default function RequestTemplateSkeleton() {
  return (
    <div>
      <Skeleton className="h-4 w-32 mb-2.5 rounded-lg" />

      <div className="flex flex-col bg-content1 rounded-3xl gap-4 p-4">
        <div className="flex items-center gap-2">
          <Skeleton className="w-12 h-12 rounded-large" />

          <div>
            <Skeleton className="h-5 w-32 mb-0.5 rounded-lg" />
            <div className="flex items-center gap-2">
              <Skeleton className="min-w-[18px] h-[18px] rounded-sm" />
              <Skeleton className="h-4 w-24 rounded-lg" />
            </div>
          </div>
        </div>

        <div>
          <Skeleton className="h-4 w-32 mb-1 rounded-lg" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 flex-1 rounded-lg" />
          </div>
        </div>

        <div className="p-2 bg-default-50">
          <Skeleton className="h-3 w-24 mb-1 rounded-lg" />
          <Skeleton className="h-5 w-40 rounded-lg" />
        </div>

        <Skeleton className="w-full h-16 rounded-large" />

        <div className="flex items-center justify-between flex-wrap gap-2">
          <Skeleton className="h-5 w-24 rounded-lg" />
          <Skeleton className="h-5 w-32 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

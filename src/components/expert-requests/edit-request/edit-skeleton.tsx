import { Skeleton } from "@heroui/react";
import RequestDetailsSkeleton from "./tabs/request-details/request-details-skeleton";

export default function RequestLoadingSkeleton() {
  return (
    <div>
      <div className="flex flex-col gap-4 pt-3 md:px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4 order-1 md:order-none">
            <div className="hidden md:flex items-center justify-center min-w-16 h-16 rounded-large bg-default-100">
              <Skeleton className="w-6 h-6 rounded" />
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-48 rounded-lg" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Skeleton className="h-4 w-24 rounded-lg" />
                <Skeleton className="h-4 w-32 rounded-lg" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto">
            <Skeleton className="h-9 w-32 rounded-lg" />
            <Skeleton className="h-9 w-40 rounded-lg" />
          </div>
        </div>

        <div>
          <div className="flex gap-6 px-2">
            {[1, 2, 3].map((tab) => (
              <div key={tab} className="flex items-center gap-2 py-4">
                <Skeleton className="w-5 h-5 rounded" />
                <Skeleton className="h-5 w-20 rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <RequestDetailsSkeleton />
    </div>
  );
}

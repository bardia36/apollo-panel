import { Skeleton } from "@heroui/react";

const WorkspaceSkeleton = () => {
  return (
    <div className="lg:px-4">
      <div className="flex justify-between mt-3">
        <div className="flex items-center gap-4">
          <Skeleton className="rounded-2xl w-16 h-16" />

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Skeleton className="rounded-full w-48 h-9" />
              <Skeleton className="rounded-full w-20 h-9" />
            </div>

            <div className="flex items-center gap-2">
              <Skeleton className="rounded-full w-36 h-4" />
              <Skeleton className="rounded-full w-32 h-4" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 mt-auto">
          <Skeleton className="rounded-lg w-9 h-9" />
          <Skeleton className="rounded-lg w-32 h-9" />
          <Skeleton className="rounded-lg w-40 h-11" />
        </div>
      </div>

      <div className="mt-4 pb-4">
        <Skeleton className="rounded-xl w-96 h-11" />
      </div>

      <div className="gap-4 grid grid-cols-1 md:grid-cols-3 bg-default-50 mt-4 p-4 rounded-xl">
        <div className="flex flex-col gap-4 col-span-2">
          <Skeleton className="rounded-xl w-40 h-4" />

          <div className="flex items-center bg-content1 p-4 rounded-xl h-56">
            <Skeleton className="rounded-xl w-full h-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceSkeleton;

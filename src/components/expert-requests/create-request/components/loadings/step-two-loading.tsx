import { Skeleton } from "@heroui/react";

export const StepTwoLoading = () => {
  return (
    <div>
      <h6 className="text-xs text-default-600 mb-2">
        <Skeleton classNames={{ base: "h-4 w-16 rounded-lg" }} />
      </h6>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 mb-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="p-4 bg-default-50 rounded-[20px]">
            <Skeleton classNames={{ base: "h-6 w-3/4 mb-2 rounded-lg" }} />
            <Skeleton classNames={{ base: "h-4 w-1/2 rounded-lg" }} />
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mb-1.5">
        <h6 className="text-xs text-default-600">
          <Skeleton classNames={{ base: "h-4 w-20 rounded-lg" }} />
        </h6>
        <Skeleton classNames={{ base: "h-6 w-12 rounded-full" }} />
      </div>

      <div className="p-4 bg-default-50 text-default-600 border-dashed shadow-lg rounded-[20px] border-default-200 border-2">
        <h6 className="text-xs text-default-600">
          <Skeleton classNames={{ base: "h-4 w-20 rounded-lg mb-2" }} />
        </h6>

        <div className="grid grid-cols-2 gap-1">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton
              key={index}
              classNames={{ base: "h-6 w-32 rounded-lg" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

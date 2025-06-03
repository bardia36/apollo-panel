import { Skeleton } from "@heroui/react";

export default function Loading() {
  return (
    <Skeleton className="w-full h-screen" role="status" aria-live="polite" />
  );
}

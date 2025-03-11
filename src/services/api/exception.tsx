import { ErrorException } from "@/types/api";
import { toast } from "@/utils/toast";
import errors from "./errors";

export function isError(error: unknown) {
  return typeof error === "object";
}

export function exceptionHandler(error: unknown) {
  if (isError(error))
    toast({
      title: exceptionMessage(error as ErrorException),
      color: "danger",
    });
  else toast({ title: JSON.stringify(error), color: "danger" });
}

export function exceptionMessage(exception: ErrorException) {
  if (errors[exception.errorCode as keyof typeof errors])
    return errors[exception.errorCode as keyof typeof errors];
  else return "unhandled error";
}

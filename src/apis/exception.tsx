import { ErrorException } from "@/types/api";
import { toast } from "@/utils/toast";
import i18n from "@/translations/index";

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
  if (i18n.exists(`errorCodes.${exception.errorCode}`)) {
    return i18n.t(`errorCodes.${exception.errorCode}`);
  }

  if (i18n.exists(`errorCodes.${exception.data}`)) {
    return i18n.t(`errorCodes.${exception.data}`);
  }

  if (i18n.exists(`errorCodes.${exception.code}`))
    return i18n.t(`errorCodes.${exception.code}`);
  else return i18n.t("errorCodes.unhandled");
}

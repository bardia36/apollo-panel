import type { SlotsToClasses } from "@heroui/react";

import { ReactNode } from "react";

import { addToast } from "@heroui/react";

type Color =
  | "default"
  | "foreground"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger";

type ToastClassNames =
  | "title"
  | "base"
  | "wrapper"
  | "description"
  | "icon"
  | "loadingIcon"
  | "content"
  | "progressTrack"
  | "progressIndicator"
  | "motionDiv"
  | "closeButton"
  | "closeIcon";

type ToastVariant = "flat" | "solid" | "bordered";

type Toast = {
  title: string;
  message?: string;
  color: Color;
  endContent?: ReactNode;
  variant?: ToastVariant;
  classNames?: SlotsToClasses<ToastClassNames> | undefined;
};

export function toast({
  title,
  message,
  color,
  endContent,
  variant,
  classNames,
}: Toast) {
  addToast({
    title,
    description: message,
    color,
    timeout: 8000,
    endContent: endContent,
    shouldShowTimeoutProgress: true,
    variant: variant,
    classNames: classNames,
  });
}

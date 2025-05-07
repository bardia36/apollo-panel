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

export function toast({
  title,
  message,
  color,
  endContent,
  variant,
  classNames,
}: {
  title: string;
  message?: string;
  color: Color;
  endContent?: ReactNode;
  variant?: "flat" | "solid" | "bordered";
  classNames?:
    | SlotsToClasses<
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
        | "closeIcon"
      >
    | undefined;
}) {
  addToast({
    title,
    description: message,
    color,
    timeout: 3000,
    endContent: endContent,
    shouldShowTimeoutProgress: true,
    variant: variant,
    classNames: classNames,
  });
}

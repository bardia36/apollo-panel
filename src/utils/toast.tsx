import { addToast } from "@heroui/toast";

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
}: {
  title: string;
  message?: string;
  color: Color;
}) {
  addToast({
    title,
    description: message,
    color,
    timeout: 3000,
    
    shouldShowTimeoutProgress: true,
  });
}

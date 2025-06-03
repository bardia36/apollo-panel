import { Button, cn } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { copyToClipboard } from "@/utils/base";

type CopyButtonProps = {
  value: string;
  size?: string;
  btnFit?: boolean;
  btnClassName?: string;
  iconSize?: string;
  iconClassName?: string;
};

export default function CopyButton({
  value,
  size,
  btnFit,
  btnClassName,
  iconSize,
  iconClassName,
}: CopyButtonProps) {
  return (
    <Button
      isIconOnly
      variant="light"
      className={cn(
        `w-${size} h-${size}`,
        btnFit && "min-w-fit min-h-fit",
        btnClassName
      )}
      onPress={copyToClipboard(value)}
    >
      <Icon
        icon="gravity-ui:copy"
        width={iconSize}
        height={iconSize}
        className={cn(`min-w-[${iconSize}px]`, iconClassName)}
      />
    </Button>
  );
}

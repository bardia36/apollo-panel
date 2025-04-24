import { Image } from "@heroui/image";
import { SlotsToClasses } from "@heroui/theme";
import { useTheme } from "@heroui/use-theme";

type FullLogoProps = {
  className?: string;
  classNames?:
    | SlotsToClasses<"img" | "wrapper" | "zoomedWrapper" | "blurredImg">
    | undefined;
};

export const FullLogo = ({ className, classNames }: FullLogoProps) => {
  const { theme } = useTheme();

  return (
    <Image
      src={theme === "dark" ? "/images/logo-dark.svg" : "/images/logo.svg"}
      alt="Logo"
      className={className}
      classNames={classNames}
    />
  );
};

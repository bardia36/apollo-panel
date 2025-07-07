import { Image } from "@heroui/react";
import { SlotsToClasses } from "@heroui/react";
import { useTheme } from "@heroui/use-theme";
import { t } from "i18next";

type Props = {
  classNames?:
    | SlotsToClasses<"img" | "wrapper" | "zoomedWrapper" | "blurredImg">
    | undefined;
};

export const FullLogo = ({ classNames }: Props) => {
  const { theme } = useTheme();

  return (
    <Image
      src={theme === "dark" ? "/src/assets/images/logo/logo-dark.webp" : "/src/assets/images/logo/logo.webp"}
      alt={t("shared.apolloLogo")}
      classNames={classNames}
    />
  );
};

export const LogoIcon = ({ classNames }: Props) => {
  const { theme } = useTheme();

  return (
    <Image
      src={
        theme === "dark"
          ? "/src/assets/images/logo/logo-icon-dark.webp"
          : "/src/assets/images/logo/logo-icon.webp"
      }
      alt={t("shared.apolloLogo")}
      classNames={classNames}
    />
  );
};

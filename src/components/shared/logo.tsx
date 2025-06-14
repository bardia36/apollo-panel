import { Image } from "@heroui/react";
import { SlotsToClasses } from "@heroui/react";
import { useTheme } from "@heroui/use-theme";
import { t } from "i18next";
import logo from "@/assets/images/logo/logo.webp";
import logoDark from "@/assets/images/logo/logo-dark.webp";
import logoIcon from "@/assets/images/logo/logo-icon.webp";
import logoIconDark from "@/assets/images/logo/logo-icon-dark.webp";

type Props = {
  classNames?:
    | SlotsToClasses<"img" | "wrapper" | "zoomedWrapper" | "blurredImg">
    | undefined;
};

export const FullLogo = ({ classNames }: Props) => {
  const { theme } = useTheme();

  return (
    <Image
      src={theme === "dark" ? logoDark : logo}
      alt={t("shared.apolloLogo")}
      classNames={classNames}
    />
  );
};

export const LogoIcon = ({ classNames }: Props) => {
  const { theme } = useTheme();

  return (
    <Image
      src={theme === "dark" ? logoIconDark : logoIcon}
      alt={t("shared.apolloLogo")}
      classNames={classNames}
    />
  );
};

import { Image } from "@heroui/image";
import { SlotsToClasses } from "@heroui/theme";
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
      src={
        theme === "dark"
          ? "/images/logo/logo-dark.svg"
          : "/images/logo/logo.svg"
      }
      alt={t('shared.apolloLogo')}
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
          ? "/images/logo/logo-icon-dark.svg"
          : "/images/logo/logo-icon.svg"
      }
      alt={t('shared.apolloLogo')}
      classNames={classNames}
    />
  );
};

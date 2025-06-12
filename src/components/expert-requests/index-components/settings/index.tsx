import { useState } from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { t } from "i18next";
import { SettingsModal } from "./settings-modal";

type Props = {
  activator?: React.ReactNode;
  variant?: "light" | "flat";
  className?: string;
};

export const Settings = ({
  activator,
  variant = "light",
  className = "",
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const defaultActivator = (
    <Button
      variant={variant}
      className={className}
      onPress={() => setIsOpen(true)}
    >
      <Icon
        icon="lineicons:gear-1"
        width={20}
        height={20}
        className="text-default-500"
      />
      {t("shared.settings")}
    </Button>
  );

  return (
    <>
      <div onClick={() => setIsOpen(true)}>{activator || defaultActivator}</div>

      <SettingsModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

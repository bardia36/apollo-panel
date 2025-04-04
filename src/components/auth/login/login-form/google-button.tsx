// Components
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useTranslation } from "react-i18next";

export default function GoogleButton() {
  const { t } = useTranslation();

  return (
    <Button
      fullWidth
      className="my-3 bg-default-100"
      endContent={<Icon icon="flat-color-icons:google" fontSize={24} />}
    >
      {t("auth.loginWithGoogle")}
    </Button>
  );
}

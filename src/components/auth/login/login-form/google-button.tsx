// Components
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useTranslation } from "react-i18next";

export default function GoogleButton() {
  const { t } = useTranslation();

  return (
    <Button
      fullWidth
      className="mb-10 bg-default-100 my-4"
      endContent={<Icon icon="flat-color-icons:google" fontSize={24} />}
    >
      {t("auth.loginWithGoogle")}
    </Button>
  );
}

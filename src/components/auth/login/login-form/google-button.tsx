import { useState } from "react";
import { useTranslation } from "react-i18next";
import { accountApi } from "@/services/api";
import { exceptionHandler } from "@/services/api/exception";

// Components
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function GoogleButton() {
  const [progressing, setProgressing] = useState(false);
  const { t } = useTranslation();

  async function submit() {
    try {
      setProgressing(true);

      const url = await accountApi.loginByGoogle();

      window.location.replace(url);
    } catch (err) {
      exceptionHandler(err);
    } finally {
      setProgressing(false);
    }
  }

  return (
    <Button
      fullWidth
      className="my-3 bg-default-100"
      endContent={<Icon icon="flat-color-icons:google" fontSize={24} />}
      isLoading={progressing}
      onPress={submit}
    >
      {t("auth.loginWithGoogle")}
    </Button>
  );
}

type Props = {
  progressing: boolean;
  isRegister?: boolean;
  retrieveRequest: () => {};
  changeComponent: Dispatch<SetStateAction<"confirmEmail" | "form">>;
};

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// Components
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { fancyTimeFormat } from "@/utils/base";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Divider } from "@heroui/divider";
import GoogleButton from "../auth/login/login-form/google-button";
import { Link } from "react-router-dom";

export default function ConfirmMessage({
  progressing,
  isRegister = false,
  changeComponent,
  retrieveRequest,
}: Props) {
  const { t } = useTranslation();
  const [count, setCount] = useState<number>(600);
  const [retrieve, setRetrieve] = useState<boolean>(false);

  useEffect(() => {
    setRetrieve(false);
    initCountDown();
  }, []);

  function retrieveAgain() {
    setRetrieve(false);
    setCount(600);
    initCountDown();
    retrieveRequest();
  }

  function initCountDown() {
    const remaining = setInterval(() => {
      if (count === 0) {
        setCount(600);
        setRetrieve(true);
        clearInterval(remaining);
      } else setCount((prevCount) => prevCount - 1);
    }, 1000);
  }

  return (
    <div>
      <div className="bg-[#0074FF] bg-opacity-5 flex justify-center items-center p-4 mb-4 rounded-[14px]">
        <Image
          src="/images/auth/confirm-message.svg"
          alt={t("auth.confirmMessage")}
          width={84}
          height={62}
        />
      </div>

      <p className="text-center text-small">
        {isRegister
          ? t("auth.AMessageContainingAnActivationLinkWasSent")
          : t("auth.aMessageContainingAPasswordResetLinkWasSent")}
      </p>

      <p className="mb-10 text-center text-small">
        {t("auth.clickOnTheReceivedLinkToContinue")}
      </p>

      <Button
        fullWidth
        variant="light"
        isDisabled={!retrieve}
        isLoading={progressing}
        className="mb-4"
        onPress={retrieveAgain}
      >
        {t("auth.receiveVerificationCodeAgain", {
          time: fancyTimeFormat(count),
        })}
      </Button>

      <Button
        variant="bordered"
        fullWidth
        className="mb-4"
        startContent={
          <Icon icon="solar:alt-arrow-right-linear" width="24" height="24" />
        }
        onPress={() => changeComponent("form")}
      >
        {t("shared.back")}
      </Button>

      <div className="flex items-center w-full gap-4 py-2">
        <Divider className="flex-1" />

        <p className="shrink-0 text-tiny text-default-500">{t("shared.or")}</p>

        <Divider className="flex-1" />
      </div>

      <GoogleButton />

      <p className="w-full text-center text-small">
        {isRegister
          ? t("auth.needToCreateAnAccount")
          : t("auth.haveYouAlreadyRegistered")}

        <Link to="/login" className="text-primary ms-1">
          {isRegister ? t("auth.register") : t("auth.login")}
        </Link>
      </p>
    </div>
  );
}

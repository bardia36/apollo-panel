import { useState } from "react";
import { useTranslation } from "react-i18next";

//components
import { Card, CardBody } from "@heroui/card";

import ForgetPasswordForm from "./components/forget-password-form";
import ConfirmEmail from "./components/confirm-email";
import { FullLogo } from "@/components/shared/logo";

const components = {
  form: ForgetPasswordForm,
  confirmEmail: ConfirmEmail,
};

export default function ForgetPassword() {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [currentComponent, setCurrentComponent] =
    useState<keyof typeof components>("form");

  const Component =
    components[currentComponent as keyof typeof components] ||
    (() => <div>Not Found</div>);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <FullLogo classNames={{ wrapper: "mb-6 mt-6 mt-md-0" }} />

      <Card
        fullWidth
        className="w-full max-w-sm border border-default-100 rounded-large shadow-small mb-md-0"
      >
        <CardBody className="px-8 py-6">
          <h1 className="pb-2 mb-2 text-xl text-content3-foreground text-start">
            {t("auth.passwordRecovery")}
          </h1>

          <Component
            email={email}
            setEmail={setEmail}
            setCurrentComponent={setCurrentComponent}
          />
        </CardBody>
      </Card>
    </div>
  );
}

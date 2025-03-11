import { useTranslation } from "react-i18next";
import { Suspense, useState } from "react";

// Components
import { Card, CardBody } from "@heroui/card";

import OtpComponent from "./otp";
import UsernameComponent from "./username";
import PasswordComponent from "./password";

const components = {
  userName: UsernameComponent,
  otp: OtpComponent,
  password: PasswordComponent,
};

export default function LoginForm() {
  const { t } = useTranslation();

  const [userName, setUserName] = useState("");
  const [currentComponent, setCurrentComponent] = useState("userName");
  const Component =
    components[currentComponent as keyof typeof components] ||
    (() => <div>Not Found</div>);

  return (
    <Card
      fullWidth
      className="border border-default-100 w-full rounded-large max-w-sm shadow-small"
    >
      <CardBody className="py-6 px-8">
        <h1 className="text-xl text-content3-foreground text-start mb-2 ">
          {t("auth.login")}
        </h1>

        <Component
          userName={userName}
          setCurrentComponent={setCurrentComponent}
          setUserName={setUserName}
        />
      </CardBody>
    </Card>
  );
}

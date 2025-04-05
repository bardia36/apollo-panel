import { useTranslation } from "react-i18next";
import { useState } from "react";

// Components
import { Card, CardBody } from "@heroui/card";
import { Icon } from "@iconify/react/dist/iconify.js";

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
  const [accountUserName, setAccountUserName] = useState("");
  const [currentComponent, setCurrentComponent] = useState("userName");
  const Component =
    components[currentComponent as keyof typeof components] ||
    (() => <div>Not Found</div>);

  return (
    <Card
      fullWidth
      className="w-full max-w-sm border border-default-100 rounded-large shadow-small"
    >
      <CardBody className="px-8 py-6">
        <h1 className="mb-2 text-xl text-content3-foreground text-start">
          {(currentComponent as keyof typeof components) === "otp"
            ? t("auth.otpCode")
            : t("auth.login")}
        </h1>

        {(currentComponent as keyof typeof components) === "otp" ||
        (currentComponent as keyof typeof components) === "password" ? (
          <div
            className="px-3 mt-4 border border-default-200 grid grid-cols-12 cursor-pointer rounded-large h-[66px] justify-between items-center"
            onClick={() => setCurrentComponent("userName")}
          >
            <div className="col-span-2"></div>

            <div className="flex items-center w-full justify-end col-span-8">
              <p
                dir="ltr"
                className="overflow-hidden text-lg text-ellipsis whitespace-nowrap align-middle"
              >
                {accountUserName}
              </p>
            </div>

            <div className="flex items-center justify-end col-span-2">
              <div className="flex items-center h-5 p-1 rounded-lg max-w-5 min-w-min bg-default-50 justify-normal">
                <Icon
                  icon="solar:undo-right-round-linear"
                  className="text-black"
                  width="16"
                  height="16"
                />
              </div>
            </div>
          </div>
        ) : null}

        <div className="">
          <Component
            userName={userName}
            setUserName={setUserName}
            setAccountUserName={setAccountUserName}
            setCurrentComponent={setCurrentComponent}
          />
        </div>
      </CardBody>
    </Card>
  );
}

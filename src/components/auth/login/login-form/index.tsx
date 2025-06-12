import { useTranslation } from "react-i18next";
import { useState } from "react";

// Components
import { Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";

import OtpComponent from "./otp";
import UsernameComponent from "./username";
import PasswordComponent from "./password";

const components = {
  otp: OtpComponent,
  username: UsernameComponent,
  password: PasswordComponent,
};

export default function LoginForm() {
  const { t } = useTranslation();

  const [username, setUsername] = useState("");
  const [accountUsername, setAccountUsername] = useState("");
  const [currentComponent, setCurrentComponent] = useState("username");
  const Component =
    components[currentComponent as keyof typeof components] ||
    (() => <div>Not Found</div>);

  return (
    <Card
      fullWidth
      className="shadow-small border border-default-100 rounded-large w-full max-w-sm"
    >
      <CardBody className="px-8 pt-6 pb-10">
        <h1 className="mb-2 text-content3-foreground text-xl text-start">
          {(currentComponent as keyof typeof components) === "otp"
            ? t("auth.otpCode")
            : t("auth.login")}
        </h1>

        {(currentComponent as keyof typeof components) === "otp" ||
        (currentComponent as keyof typeof components) === "password" ? (
          <div
            className="justify-between items-center grid grid-cols-12 mt-4 px-3 border border-default-200 rounded-large h-[66px] cursor-pointer"
            onClick={() => setCurrentComponent("username")}
          >
            <div className="col-span-2"></div>

            <div className="flex items-center col-span-8 w-full">
              <p
                dir="auto"
                className="overflow-hidden text-lg text-ellipsis align-middle whitespace-nowrap"
              >
                {accountUsername}
              </p>
            </div>

            <div className="flex justify-end items-center col-span-2">
              <div className="flex justify-normal items-center bg-default-50 p-1 rounded-lg min-w-min max-w-5 h-5">
                <Icon
                  icon="solar:undo-right-round-linear"
                  className="text-content1-foreground"
                  width="16"
                  height="16"
                />
              </div>
            </div>
          </div>
        ) : null}

        <Component
          username={username}
          setUsername={setUsername}
          setAccountUsername={setAccountUsername}
          setCurrentComponent={setCurrentComponent}
        />
      </CardBody>
    </Card>
  );
}

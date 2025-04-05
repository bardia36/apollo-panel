import type { UserExist } from "@/types/auth";

type Props = {
  userName: string;
  setUserName: (userName: string) => void;
  setAccountUserName: Dispatch<SetStateAction<string>>;
  setCurrentComponent: (component: "userName" | "password" | "otp") => void;
};

import { object, string } from "yup";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "@/utils/toast";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { formOptions } from "@/utils/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useValidationMessages } from "@/utils/rules";
import { accountApi } from "@/services/api";
import { exceptionHandler } from "@/services/api/exception";

// Components
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { Form } from "@heroui/form";
import { AppInput } from "@/components/shared/app-components/app-input";
import GoogleButton from "./google-button";

export default function Username(props: Props) {
  const { t } = useTranslation();
  const [progressing, setProgressing] = useState(false);
  const navigate = useNavigate();

  const validationSchema = object({
    userName: string().required(
      useValidationMessages().required(t("auth.emailOrPhoneNumber"))
    ),
  }).required();

  const { handleSubmit, control } = useForm<UserExist>({
    ...formOptions,
    defaultValues: {
      userName: "",
    },
    resolver: yupResolver(validationSchema),
  });

  async function submit(data: UserExist) {
    setProgressing(true);
    props.setUserName(data.userName);
    const exist = await userExist(data);

    if (exist) {
      const havePass = await havePassword(data);

      if (havePass) props.setCurrentComponent("password");
      else props.setCurrentComponent("otp");
    } else {
      toast({
        title: t("auth.authToastTitle"),
        message: t("auth.authToastDescription"),
        color: "foreground",
        variant: "solid",
        classNames: {
          base: "max-h-[64px] md:min-w-[558px] min-h-[64px] bg-default-100 text-foreground",
          title: "text-foreground",
          description: "text-foreground",
        },
        endContent: (
          <Button size="sm" onPress={() => navigate("/login")}>
            {t("shared.back")}
          </Button>
        ),
      });
      navigate("/signup");
    }

    setProgressing(false);
  }

  async function userExist(data: UserExist) {
    try {
      const { userName } = data;

      const { exist, profile } = await accountApi.userExist({ userName });

      props.setAccountUserName(profile.userName);

      return exist;
    } catch (err) {
      exceptionHandler(err);
    }
  }

  async function havePassword(data: UserExist) {
    try {
      const { userName } = data;

      const { exist } = await accountApi.havePassword({ userName });

      return exist;
    } catch (err) {
      exceptionHandler(err);
    }
  }

  return (
    <Form className="gap-0" onSubmit={handleSubmit(submit)}>
      <Controller
        name="userName"
        key="username"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <AppInput
            label={t("auth.emailOrPhoneNumber")}
            {...field}
            error={error}
            variant="flat"
            className="my-4"
            endContent={
              <Icon
                icon="solar:letter-outline"
                width="20"
                height="20"
                className="mb-2 text-default-400"
              />
            }
          />
        )}
      />

      <Button
        fullWidth
        color="primary"
        type="submit"
        isLoading={progressing}
        className="mb-10"
      >
        {t("shared.continue")}
      </Button>

      <div className="flex items-center w-full gap-4 py-2">
        <Divider className="flex-1" />

        <p className="shrink-0 text-tiny text-default-500">{t("shared.or")}</p>

        <Divider className="flex-1" />
      </div>

      <GoogleButton />

      <div className="w-full text-center">
        <p className="text-small">
          {t("auth.needToCreateAnAccount")}
          <Link to="/signup" className="text-primary ms-1">
            {t("auth.register")}
          </Link>
        </p>
      </div>
    </Form>
  );
}

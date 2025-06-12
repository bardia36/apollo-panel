import type { UserExist } from "@/types/auth";

type Props = {
  username: string;
  setUsername: (username: string) => void;
  setAccountUsername: Dispatch<SetStateAction<string>>;
  setCurrentComponent: (component: "username" | "password" | "otp") => void;
};

import { object, string } from "yup";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "@/utils/toast";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { formOptions } from "@/utils/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useValidationMessages } from "@/utils/rules";
import { accountApi } from "@/apis/auth";
import { exceptionHandler } from "@/apis/exception";
import { validationRegex } from "@/utils/rules";

// Components
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@heroui/react";
import { Divider } from "@heroui/react";
import { Form } from "@heroui/react";
import { AppInput } from "@/components/shared/app-components/app-input";
import GoogleButton from "./google-button";

export default function Username(props: Props) {
  const { t } = useTranslation();
  const [progressing, setProgressing] = useState(false);
  const navigate = useNavigate();

  const msgs = useValidationMessages();

  const validationSchema = object({
    username: string()
      .required(msgs.required(t("auth.emailOrPhoneNumber")))
      .test(
        "email-or-phone",
        msgs.isNotValid(t("auth.emailOrPhoneNumber")),
        (value) => {
          if (!value) return false;
          try {
            string().email().validateSync(value);
            return true;
          } catch {
            return validationRegex.mobile.test(value);
          }
        }
      ),
  }).required();

  const { handleSubmit, control } = useForm<UserExist>({
    ...formOptions,
    defaultValues: {
      username: "",
    },
    resolver: yupResolver(validationSchema),
  });

  async function submit(data: UserExist) {
    setProgressing(true);
    props.setUsername(data.username);
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
          base: "md:max-h-[64px] md:min-w-[558px] min-h-[64px] bg-default-100 text-foreground",
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
      const { username } = data;

      const { exist, profile } = await accountApi.userExist({ username });

      if (exist) props.setAccountUsername(profile.username);

      return exist;
    } catch (err) {
      exceptionHandler(err);
    }
  }

  async function havePassword(data: UserExist) {
    try {
      const { username } = data;

      const { exist } = await accountApi.havePassword({ username });

      return exist;
    } catch (err) {
      exceptionHandler(err);
    }
  }

  return (
    <Form className="gap-0" onSubmit={handleSubmit(submit)}>
      <Controller
        name="username"
        key="username"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <AppInput
            label={t("auth.emailOrPhoneNumber")}
            {...field}
            error={error}
            variant="flat"
            autoFocus
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

      <div className="flex items-center gap-4 py-2 w-full">
        <Divider className="flex-1" />

        <p className="text-default-500 text-tiny shrink-0">{t("shared.or")}</p>

        <Divider className="flex-1" />
      </div>

      <GoogleButton />

      <div className="w-full text-center">
        <p className="text-small">
          {t("auth.needToCreateAnAccount")}

          <Link to="/signup" className="ms-1 text-primary">
            {t("auth.register")}
          </Link>
        </p>
      </div>
    </Form>
  );
}

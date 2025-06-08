import { t } from "i18next";

type Props = {
  code: string;
};

export const RequestCode = ({ code }: Props) => {
  return (
    <h5 className="text-default-foreground text-3xl font-bold">
      <span className="hidden md:inline-block">
        {t("expertRequests.request")}
      </span>
      {t("expertRequests.code")} {code}
    </h5>
  );
};

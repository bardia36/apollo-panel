import { useTranslation } from "react-i18next";

export const useValidationMessages = () => {
  const { t } = useTranslation();

  return {
    required: (label: string) => t("validations.required", { label }),
    email: (label: string) => t("validations.email", { label }),
    min: (label: string, min: number) => t("validations.min", { label, min }),
  };
};

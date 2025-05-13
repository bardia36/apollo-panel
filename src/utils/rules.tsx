import { useTranslation } from "react-i18next";

export const useValidationMessages = () => {
  const { t } = useTranslation();

  return {
    required: (label: string) => t("validations.required", { label }),
    isNotValid: (label: string) => t("validations.isNotValid", { label }),
    min: (label: string, min: number) => t("validations.min", { label, min }),
    max: (label: string, max: number) => t("validations.max", { label, max }),
    confirmPassword: () => t("validations.confirmPass"),
  };
};

export const validationRegex = {
  mobile: /(?:\+98|0098|0)?9\d{9}/,
};

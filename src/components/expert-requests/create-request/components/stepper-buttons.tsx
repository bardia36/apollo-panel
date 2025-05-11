import { Button } from "@heroui/react";
import { t } from "i18next";

type Props = {
  currentStep: 1 | 2 | 3;
  onPrevStep?: () => void;
  onNextStep: () => void;
};

export const StepperButtons = ({
  currentStep,
  onPrevStep,
  onNextStep,
}: Props) => {
  return (
    <div className="flex justify-center md:justify-end gap-4 pt-4 md:pt-10 mt-auto">
      {/* TODO: ICONS AND THIRD STEP SUBMIT BG */}
      {currentStep > 1 && (
        <Button variant="light" onPress={onPrevStep} className="cursor-pointer">
          {t("shared.previousPage")}
        </Button>
      )}

      {currentStep < 3 ? (
        <Button onPress={onNextStep}>{t("shared.continue")}</Button>
      ) : (
        <Button onPress={onNextStep}>{t("shared.createIt")}</Button>
      )}
    </div>
  );
};

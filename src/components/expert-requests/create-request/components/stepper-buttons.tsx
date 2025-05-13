import { Button } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { t } from "i18next";

type Props = {
  currentStep: 1 | 2 | 3;
  isLoading?: boolean;
  onPrevStep?: () => void;
  onNextStep: () => void;
};

export const StepperButtons = ({
  currentStep,
  isLoading = false,
  onPrevStep,
  onNextStep,
}: Props) => {
  return (
    <div className="flex justify-center md:justify-end gap-4 pt-4 md:pt-10 mt-auto">
      {currentStep > 1 && (
        <Button
          variant="light"
          onPress={onPrevStep}
          isDisabled={isLoading}
          className="cursor-pointer"
        >
          <Icon icon="solar:arrow-right-outline" width={20} height={20} />
          {t("shared.previousPage")}
        </Button>
      )}

      {currentStep < 3 ? (
        <Button isLoading={isLoading} onPress={onNextStep}>
          {t("shared.continue")}
          <Icon icon="solar:arrow-left-outline" width={20} height={20} />
        </Button>
      ) : (
        <Button
          isLoading={isLoading}
          className="bg-foreground-900 text-default-50"
          onPress={onNextStep}
        >
          {t("shared.createIt")}
        </Button>
      )}
    </div>
  );
};

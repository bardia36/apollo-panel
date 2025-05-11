import { useState, lazy, Suspense } from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Stepper from "./components/stepper";
import { t } from "i18next";

const StepOne = lazy(() => import("./components/step-one"));
const StepTwo = lazy(() => import("./components/step-two"));
const StepThree = lazy(() => import("./components/step-three"));

export type Step = {
  title: string;
  description: string;
};

type Props = {
  onCloseModal: () => void;
};

const steps: Step[] = [
  {
    title: t("expertRequests.requestDetail"),
    description: t("expertRequests.userAndExpertCaseInformation"),
  },
  {
    title: t("expertRequests.linkData"),
    description: t("expertRequests.casesDetail"),
  },
  {
    title: t("expertRequests.finalCheck"),
    description: t("expertRequests.chooseWayToSend"),
  },
];

export default function StepsWrapper({ onCloseModal }: Props) {
  const [currentStep, setCurrentStep] = useState(3);

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepOne onStepComplete={nextStep} />;
      case 2:
        return <StepTwo onStepComplete={nextStep} onStepBack={prevStep} />;
      case 3:
        return <StepThree onStepComplete={submit} onStepBack={prevStep} />;
      default:
        return null;
    }
  };

  const submit = () => {
    console.log("submit");
  };

  return (
    <div className="lg:h-screen flex flex-col md:flex-row gap-6 md:gap-4">
      <aside className="md:w-1/3 bg-primary-50 py-6 px-8 rounded-large flex flex-col items-start gap-8">
        <Button
          radius="full"
          variant="flat"
          size="sm"
          className="bg-content1 text-default-foreground min-h-8"
          onPress={onCloseModal}
        >
          <Icon icon="material-symbols:arrow-back-ios-new-rounded" hFlip />
          {t("shared.return")}
        </Button>

        <div>
          <h2 className="text-xl mb-1">
            {t("expertRequests.stepsToCreateReviewLink")}
          </h2>
          <p className="text-default-500">
            {t("expertRequests.addReqStepperDescription")}
          </p>
        </div>

        <Stepper steps={steps} currentStep={currentStep} />
      </aside>

      <div className="md:w-2/3 md:py-4">
        {/* // TODO: add skeleton */}
        <Suspense fallback={<div>در حال بارگذاری...</div>}>
          <div className="xl:w-3/4 xl:mx-auto flex flex-col h-full">
            {renderStep()}
          </div>
        </Suspense>
      </div>
    </div>
  );
}

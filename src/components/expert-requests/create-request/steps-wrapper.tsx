import { useState, lazy, Suspense } from "react";
import { Button, Skeleton } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { t } from "i18next";
import { useExpertRequests } from "@/components/expert-requests/index-page/context/expert-requests-context";
import { StepTwoLoading } from "./components/loadings/step-two-loading";
import { StepThreeLoading } from "./components/loadings/step-three-loading";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { DesktopStepper, MobileStepper } from "./components/stepper";
import { CreateRequestProvider } from "./context/create-request-context";

const StepOneHeader = lazy(
  () => import("./components/step-one/step-one-header")
);
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
  const [currentStep, setCurrentStep] = useState(0); // 0 | 1 | 2
  const { refreshRequests } = useExpertRequests();
  const { isMdAndUp } = useBreakpoint();

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <StepOne onStepComplete={nextStep} />;
      case 1:
        return <StepTwo onStepComplete={nextStep} onStepBack={prevStep} />;
      case 2:
        return <StepThree onStepComplete={onFinal} onStepBack={prevStep} />;
      default:
        return null;
    }
  };

  const onFinal = () => {
    onCloseModal();
    refreshRequests();
  };

  return (
    <CreateRequestProvider>
      <div className="lg:h-screen flex flex-col md:flex-row gap-6 md:gap-4">
        {isMdAndUp && (
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

            <DesktopStepper steps={steps} currentStep={currentStep} />
          </aside>
        )}

        {!isMdAndUp && (
          <div>
            {currentStep == 0 && <StepOneHeader />}
            <MobileStepper steps={steps} currentStep={currentStep} />
          </div>
        )}

        <div className="md:w-2/3 md:py-4">
          <Suspense
            fallback={
              currentStep == 2 ? (
                <StepTwoLoading />
              ) : currentStep == 3 ? (
                <StepThreeLoading />
              ) : (
                <Skeleton className="w-[90%] rounded-xl mx-auto h-full" />
              )
            }
          >
            <div className="xl:w-3/4 xl:mx-auto flex flex-col h-full">
              {renderStep()}
            </div>
          </Suspense>
        </div>
      </div>
    </CreateRequestProvider>
  );
}

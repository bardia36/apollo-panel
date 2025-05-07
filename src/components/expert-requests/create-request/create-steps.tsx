import { useState, lazy, Suspense } from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Stepper from "./components/stepper";
const StepOne = lazy(() => import("./components/step-one"));
const StepTwo = lazy(() =>
  Promise.resolve({ default: () => <div className="p-4">مرحله دوم</div> })
);
const StepThree = lazy(() =>
  Promise.resolve({ default: () => <div className="p-4">مرحله سوم</div> })
);

export type Step = {
  title: string;
  description: string;
};
const steps: Step[] = [
  { title: "مشخصات درخواست", description: "اطلاعات کاربر و مورد کارشناسی" },
  { title: "محتویات لینک", description: "جزئیات موارد درخواستی" },
  { title: "بررسی نهایی", description: "انتخاب نحوه ارسال" },
];

type Props = {
  onCloseModal: () => void;
};

export default function CreateSteps({ onCloseModal }: Props) {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <StepOne />;
      case 1:
        return <StepTwo />;
      case 2:
        return <StepThree />;
      default:
        return null;
    }
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
          بازگشت
        </Button>

        <div>
          <h2 className="text-xl mb-1">مراحل ایجاد لینک کارشناسی</h2>
          <p className="text-default-500">
            اطلاعات کاربر، مورد کارشناسی و جزئیات موارد درخواستی را وارد کنید.
            در انتها لینک درخواست ایجاد شده و برای کاربر ارسال می‌شود.
          </p>
        </div>

        <Stepper steps={steps} currentStep={currentStep} />
      </aside>

      <div className="md:w-2/3 flex flex-col justify-between md:py-4">
        {/* // TODO: add skeleton and loading state */}
        <Suspense fallback={<div>در حال بارگذاری...</div>}>
          <div className="xl:w-3/4 mx-auto">{renderStep()}</div>
        </Suspense>

        <div className="flex justify-center md:justify-end pt-8 gap-4 xl:w-3/4 mx-auto">
          <Button
            variant="light"
            disabled={currentStep === 0}
            onPress={prevStep}
            className="cursor-pointer"
          >
            صفحه قبل
          </Button>

          {currentStep < steps.length - 1 ? (
            <Button onPress={nextStep}>ادامه</Button>
          ) : (
            <Button>ایجاد کن</Button>
          )}
        </div>
      </div>
    </div>
  );
}

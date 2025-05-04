import { useState, lazy, Suspense } from "react";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react/dist/iconify.js";

const StepOne = lazy(() =>
  Promise.resolve({ default: () => <div className="p-4">مرحله اول</div> })
);
const StepTwo = lazy(() =>
  Promise.resolve({ default: () => <div className="p-4">مرحله دوم</div> })
);
const StepThree = lazy(() =>
  Promise.resolve({ default: () => <div className="p-4">مرحله سوم</div> })
);

const steps = [
  { title: "مشخصات درخواست", description: "اطلاعات کاربر و مورد کارشناسی" },
  { title: "محتویات لینک", description: "جزئیات موارد درخواستی" },
  { title: "بررسی نهایی", description: "انتخاب نحوه ارسال" },
];

export default function CreateRequestStepper() {
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
    <div className="flex flex-row-reverse h-screen">
      <div className="w-1/4 bg-blue-50 p-6 border-l border-gray-200">
        <h2 className="text-lg font-semibold mb-6">
          مراحل ایجاد لینک کارشناسی
        </h2>
        <ul className="space-y-6">
          {steps.map((step, index) => (
            <li
              key={index}
              className="flex items-start space-x-2 rtl:space-x-reverse"
            >
              <div className="mt-1">
                {index < currentStep ? (
                  <Icon
                    icon="material-symbols:check-circle"
                    className="text-blue-600 w-5 h-5"
                  />
                ) : (
                  <Icon
                    icon="material-symbols:circle-outline"
                    className={`w-5 h-5 ${index === currentStep ? "text-blue-600" : "text-gray-400"}`}
                  />
                )}
              </div>
              <div>
                <p
                  className={`text-sm font-medium ${index === currentStep ? "text-blue-700" : "text-gray-600"}`}
                >
                  {step.title}
                </p>
                <p className="text-xs text-gray-500">{step.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-3/4 flex flex-col justify-between p-8">
        <Suspense fallback={<div>در حال بارگذاری...</div>}>
          {renderStep()}
        </Suspense>

        <div className="flex justify-between items-center pt-8">
          <Button
            onPress={prevStep}
            disabled={currentStep === 0}
            variant="ghost"
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

import { Icon } from "@iconify/react/dist/iconify.js";
import { Step } from "../steps-wrapper";
import { t } from "i18next";

type Props = {
  currentStep: number;
  steps: Step[];
};

export const DesktopStepper = ({ currentStep, steps }: Props) => {
  return (
    <ul className="space-y-1">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;
        const isLast = index === steps.length - 1;

        return (
          <div key={`step-${index}`}>
            <div className="px-3 py-2">
              <li className="flex items-start space-x-2 rtl:space-x-reverse">
                <div className="mt-1">
                  {isCompleted ? (
                    <Icon
                      icon="material-symbols:check-circle"
                      className="text-blue-600 w-[38px] h-[38px] -mx-1"
                    />
                  ) : (
                    <div
                      className={`rounded-full border-2 w-8 h-8 flex items-center justify-center ${isActive ? "text-primary border-primary" : "text-primary-300 border-primary-300"}`}
                    >
                      {index + 1}
                    </div>
                  )}
                </div>

                <div>
                  <h6
                    className={`text-lg font-semibold ${isCompleted || isActive ? "text-default-foreground" : "text-gray-500"}`}
                  >
                    {step.title}
                  </h6>
                  <p className="text-sm text-gray-500">{step.description}</p>
                </div>
              </li>
            </div>

            {!isLast && (
              <div className="h-6 w-0.5 bg-primary-200 ms-7">
                <div
                  className="rounded-full h-full bg-primary transition-all duration-300 ease-in-out"
                  style={{
                    transform: `scaleY(${isCompleted ? 1 : 0})`,
                    transformOrigin: "top",
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
    </ul>
  );
};

export const MobileStepper = ({ currentStep, steps }: Props) => {
  return (
    <>
      <ul className="flex justify-center mb-4">
        {steps.map((_, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          const isLast = index === steps.length - 1;

          return (
            <div key={`step-${index}`} className="flex items-center">
              <li className="flex items-start space-x-2 rtl:space-x-reverse">
                {isCompleted ? (
                  <Icon
                    icon="material-symbols:check-circle"
                    className="text-blue-600"
                    width={20}
                    height={20}
                  />
                ) : (
                  <div
                    className={`rounded-full border-2 w-4 h-4 mx-0.5 ${isActive ? "bg-primary border-primary" : "border-default-400"}`}
                  ></div>
                )}
              </li>

              {!isLast && (
                <div className="h-0.5 w-6 bg-default-400">
                  <div
                    className="w-full h-full bg-primary transition-all duration-300 ease-in-out"
                    style={{
                      transform: `scaleX(${isCompleted ? 1 : 0})`,
                      transformOrigin: "right",
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </ul>

      <h6 className="text-sm font-bold text-center">
        {`${t(`expertRequests.step${currentStep + 1}`)} - ${steps[currentStep].title}`}
      </h6>
    </>
  );
};

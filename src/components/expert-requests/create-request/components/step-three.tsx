import { t } from "i18next";
import { StepperButtons } from "./stepper-buttons";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react"; // Add useEffect and useState
import { expertRequestsApi } from "@/services/api/expert-requests"; // Import the API
import { exceptionHandler } from "@/services/api/exception";
import { ExpertRequest } from "@/types/expertRequests";

type StepThreeProps = {
  requestId: string | null;
  onStepComplete: () => void;
  onStepBack: () => void;
};

export default function StepThree({
  requestId,
  onStepBack,
  onStepComplete,
}: StepThreeProps) {
  const [requestData, setRequestData] = useState<any>(null);

  useEffect(() => {
    if (requestId) {
      expertRequestsApi
        .getRequestsById(requestId)
        .then((response) => setRequestData(response))
        .catch((err) => exceptionHandler(err));
    }
  }, [requestId]);

  if (!requestData) {
    return <StepThreeLoading />;
  }

  return (
    <div className="flex flex-col h-full gap-6">
      <RequestSummary requestData={requestData} />

      <RequestContact />

      <RequestOtherFields />

      <StepperButtons
        currentStep={3}
        onPrevStep={onStepBack}
        onNextStep={onStepComplete}
      />
    </div>
  );
}

function RequestSummary({ requestData }: { requestData: ExpertRequest }) {
  return (
    <>
      <h6 className="text-xs text-default-600 mb-2">
        {t("expertRequests.requestSummary")}
      </h6>

      <div className="p-4 flex flex-col gap-4 bg-default-50 shadow-md rounded-[20px]">
        <div className="flex items-center gap-2">
          <div className="p-3.5">
            <Icon
              icon="solar:user-linear"
              className="text-default-400"
              width={20}
              height={20}
            />
          </div>

          <div>
            <h6 className="font-semibold text-default-700">
              {requestData.owner.userName}
            </h6>
            <p className="text-default-500 text-sm">
              {requestData.owner.phoneNumber}
            </p>
          </div>

          <div className="text-sm ms-auto">
            <div className="flex items-center gap-2 text-end">
              <h6 className="text-default-700">{requestData.order_number}</h6>
              <Icon
                icon="solar:box-minimalistic-outline"
                className="text-default-400"
                width={16}
                height={16}
              />
            </div>
            <p className="text-default-500 text-end">
              {requestData.owner.email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="p-3.5">
            <Icon
              icon="lineicons:search-1"
              className="text-default-400"
              width={20}
              height={20}
            />
          </div>

          <div>
            <h6 className="font-semibold text-default-700">
              {requestData.inspection_data.vehicle_model?.name_fa}
            </h6>
            <p className="text-default-500 text-sm">
              {requestData.inspection_data.vehicle_brand?.name_fa}
            </p>
          </div>

          <div className="ms-auto text-end text-default-500 text-sm">
            <h6>{requestData.inspection_data.color.name_fa}</h6>
            <p>VIN: {requestData.inspection_data.vin}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="p-3.5">
            <Icon
              icon="solar:folder-linear"
              className="text-default-400"
              width={20}
              height={20}
            />
          </div>

          <div>
            <h6 className="font-semibold text-default-700">template name</h6>
            <p className="text-default-500 text-sm">template desc</p>
          </div>

          <div className="text-end ms-auto text-sm">
            <h6 className="text-default-500">template fields count</h6>
            <p className="bg-default-500">FIELDS</p>
          </div>
        </div>
      </div>
    </>
  );
}

function RequestContact() {
  return <div>RequestContact</div>;
}

function RequestOtherFields() {
  return <div>RequestOtherFields</div>;
}

export function StepThreeLoading() {
  return (
    <div>Loading...</div> // TODO: skeleton
  )
}
import { t } from "i18next";
import { StepperButtons } from "./stepper-buttons";
import { Icon } from "@iconify/react/dist/iconify.js";

type StepThreeProps = {
  onStepComplete: () => void;
  onStepBack: () => void;
};

const data = {
  status: "DRAFT",
  inspection_format: {
    name: "string",
    logo: "string",
    description: "string",
  },
  order_number: "string",
  owner: {
    image: "string",
    userName: "string",
    phoneNumber: "string",
    email: "string",
  },
  lead_specialist: {
    image: "string",
    userName: "string",
    phoneNumber: "string",
    email: "string",
  },
  unit: {
    title: "string",
    level: {
      name: "string",
      level_number: 0,
    },
  },
  tags: ["string"],
  createdAt: "2025-05-10",
  inspection_data: {
    vehicle_brand: {
      name_en: "string",
      name_fa: "string",
    },
    vehicle_model: {
      name_en: "string",
      name_fa: "string",
    },
    vehicle_compony: {
      name: "string",
      nameLocal: "string",
    },
    color: {
      name: "string",
    },
    vin: "string",
  },
};

export default function StepThree({
  onStepBack,
  onStepComplete,
}: StepThreeProps) {
  return (
    <div className="flex flex-col h-full gap-6">
      <RequestSummary />

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

function RequestSummary() {
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
              {data.owner.userName}
            </h6>
            <p className="text-default-500 text-sm">{data.owner.phoneNumber}</p>
          </div>

          <div className="text-sm ms-auto">
            <div className="flex items-center gap-2 text-end">
              <h6 className="text-default-700">{data.order_number}</h6>
              <Icon
                icon="solar:box-minimalistic-outline"
                className="text-default-400"
                width={16}
                height={16}
              />
            </div>
            <p className="text-default-500 text-end">{data.owner.email}</p>
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
              {data.inspection_data.vehicle_model.name_fa}
            </h6>
            <p className="text-default-500 text-sm">
              {data.inspection_data.vehicle_brand.name_fa}
            </p>
          </div>

          <div className="ms-auto text-end text-default-500 text-sm">
            <h6>{data.inspection_data.color.name}</h6>
            <p>VIN: {data.inspection_data.vin}</p>
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

import { RegisterRequestResponse } from "@/types/expert-requests";
import { getFieldsInfo, truncateString } from "@/utils/base";
import { Chip } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { t } from "i18next";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { FieldChip } from "@/components/shared/templates/field-chip";
import { TemplateField } from "@/types/templates";

type RequestSummaryProps = {
  requestData: RegisterRequestResponse;
};

export const RequestSummary = ({ requestData }: RequestSummaryProps) => {
  const { isSmAndDown } = useBreakpoint();

  return (
    <div className="mb-6">
      <h6 className="text-xs text-default-600 mb-2">
        {t("expertRequests.requestSummary")}
      </h6>

      <div className="p-4 flex flex-col gap-4 bg-default-50 shadow-md rounded-[20px] border-dashed border-2 border-default-200">
        <div className="flex items-center flex-wrap gap-2">
          <div className="p-3.5">
            <Icon
              icon="solar:user-linear"
              className="text-default-400"
              width={20}
              height={20}
            />
          </div>

          <div>
            <h6 className="font-semibold text-foreground-700">
              {isSmAndDown
                ? truncateString(requestData.username, 15)
                : requestData.username}
            </h6>

            {!!requestData.mobile && (
              <p className="text-foreground-500 text-sm">
                {requestData.mobile}
              </p>
            )}
          </div>

          <div className="ms-auto text-end">
            {!!requestData.order_number && (
              <div className="flex items-center justify-end gap-2">
                <h6 className="text-foreground-700">
                  {isSmAndDown
                    ? truncateString(requestData.order_number, 20)
                    : requestData.order_number}
                </h6>
                <Icon
                  icon="solar:box-minimalistic-outline"
                  className="text-default-400"
                  width={16}
                  height={16}
                />
              </div>
            )}

            {!!requestData.email && (
              <p className="text-foreground-500 text-end">
                {isSmAndDown
                  ? truncateString(requestData.email, 15)
                  : requestData.email}
              </p>
            )}
          </div>
        </div>

        {!!requestData.inspection_data && (
          <SecondRow
            vehicleModelName={
              requestData.inspection_data.vehicle_model?.name_fa
            }
            vehicleBrandName={
              requestData.inspection_data.vehicle_brand?.name_fa
            }
            colorName={requestData.inspection_data.color?.name}
            vin={requestData.inspection_data.vin}
          />
        )}

        <ThirdRow
          gallery={requestData.gallery}
          templateName={requestData.template_id.name}
          inspectionFormatName={requestData.inspection_format.name}
        />
      </div>
    </div>
  );
};

export const SecondRow = ({
  vehicleModelName,
  vehicleBrandName,
  colorName,
  vin,
}: {
  vehicleModelName?: string;
  vehicleBrandName?: string;
  colorName?: string;
  vin?: string;
}) => {
  return (
    <div>
      <div className="p-3.5">
        <Icon
          icon="lineicons:search-1"
          className="text-default-400"
          width={20}
          height={20}
        />
      </div>

      <div>
        {!!vehicleModelName && (
          <h6 className="font-semibold text-foreground-700">
            {vehicleModelName}
          </h6>
        )}
        {!!vehicleBrandName && (
          <p className="text-foreground-500 text-sm">{vehicleBrandName}</p>
        )}
      </div>

      <div className="ms-auto text-end text-foreground-500 text-sm">
        {!!colorName && <h6>{colorName}</h6>}
        {!!vin && <p>VIN: {vin}</p>}
      </div>
    </div>
  );
};

export const ThirdRow = ({
  gallery,
  templateName,
  inspectionFormatName,
}: {
  gallery: TemplateField[];
  templateName: string;
  inspectionFormatName: string;
}) => {
  const { defaultFields, customFields } = getFieldsInfo(gallery);

  return (
    <div className="flex items-center flex-wrap gap-2">
      <div className="p-3.5">
        <Icon
          icon="solar:folder-linear"
          className="text-default-400"
          width={20}
          height={20}
        />
      </div>

      <div>
        <h6 className="font-semibold text-foreground-700">{templateName}</h6>
        <p className="text-foreground-500 text-sm">{inspectionFormatName}</p>
      </div>

      <div className="text-end ms-auto text-sm">
        <h6 className="text-foreground-500">
          {defaultFields.length} {t("expertRequests.wantedItem")}
        </h6>

        {!!customFields.length && (
          <div className="flex items-center justify-end gap-2 mt-1">
            <FieldChip
              field={{
                ...customFields[0],
                title: truncateString(customFields[0].title, 20),
                active: true,
              }}
            />

            {customFields.length > 1 && (
              <Chip
                classNames={{
                  base: "text-default-foreground bg-default bg-opacity-40",
                  content: "flex items-center",
                }}
              >
                +{customFields.length - 1}
              </Chip>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

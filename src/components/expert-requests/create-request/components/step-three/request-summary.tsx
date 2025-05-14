import { FieldChip } from "@/components/expert-requests/templates/components/template-fields";
import { ExpertRequestDetail } from "@/types/expertRequests";
import { truncateString } from "@/utils/base";
import { Chip } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { t } from "i18next";

export const RequestSummary = ({
  requestData,
}: {
  requestData: ExpertRequestDetail;
}) => {
  return (
    <div>
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
            <h6 className="font-semibold text-foreground-700">
              {requestData.owner.userName}
            </h6>
            <p className="text-foreground-500 text-sm">
              {requestData.owner.phoneNumber}
            </p>
          </div>

          <div className="text-sm ms-auto">
            <div className="flex items-center justify-end gap-2">
              <h6 className="text-foreground-700">
                {requestData.order_number}
              </h6>
              <Icon
                icon="solar:box-minimalistic-outline"
                className="text-default-400"
                width={16}
                height={16}
              />
            </div>
            <p className="text-foreground-500 text-end">
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
            <h6 className="font-semibold text-foreground-700">
              {requestData.inspection_data.vehicle_model?.name_fa}
            </h6>
            <p className="text-foreground-500 text-sm">
              {requestData.inspection_data.vehicle_brand?.name_fa}
            </p>
          </div>

          <div className="ms-auto text-end text-foreground-500 text-sm">
            <h6>{requestData.inspection_data.color?.name}</h6>
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
            <h6 className="font-semibold text-foreground-700">
              {requestData.template_id?.name}
            </h6>
            <p className="text-foreground-500 text-sm">
              {requestData.inspection_format.name}
            </p>
          </div>

          <div className="text-end ms-auto text-sm">
            <h6 className="text-foreground-500 mb-1">
              {requestData.template_fields_count}{" "}
              {t("expertRequests.wantedItem")}
            </h6>
            {!!requestData.required_fields?.length && (
              <div className="flex items-center justify-end gap-2">
                <FieldChip
                  field={{
                    ...requestData.required_fields[0],
                    title: truncateString(
                      requestData.required_fields[0].title,
                      20
                    ),
                    active: true,
                  }}
                />

                {requestData.required_fields.length > 1 && (
                  <Chip
                    classNames={{
                      base: "text-default-foreground bg-default bg-opacity-40",
                      content: "flex items-center",
                    }}
                  >
                    +{requestData.required_fields.length - 1}
                  </Chip>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

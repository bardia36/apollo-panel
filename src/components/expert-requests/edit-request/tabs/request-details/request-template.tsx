import { Avatar, Button, NumberInput } from "@heroui/react";
import { t } from "i18next";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ExpertRequestDetail } from "@/types/expert-requests";
import CopyButton from "@/components/shared/copy-button";
import IranLicensePlate from "@/components/shared/iran-license-plate";

type RequestTemplateProps = {
  template: ExpertRequestDetail["template_id"];
  inspectionFormat: ExpertRequestDetail["inspection_format"];
  inspectionData: ExpertRequestDetail["inspection_data"];
  price: ExpertRequestDetail["price"];
};
export default function RequestTemplate({
  template,
  inspectionFormat,
  inspectionData,
  price,
}: RequestTemplateProps) {
  return (
    <div className="h-full flex flex-col gap-2.5">
      <h6 className="text-xs text-default-600">
        {t("expertRequests.requestTemplate")}
      </h6>

      <div className="flex-1 flex flex-col bg-content1 rounded-3xl gap-4 p-4">
        <div className="flex items-center gap-2">
          <Avatar
            className="bg-foreground-200 rounded-large"
            size="lg"
            src="/src/assets/images/expert-requests/car-vector.svg"
            classNames={{ img: "max-w-10 h-10 object-contain" }}
          />

          <div>
            <h6 className="font-semibold mb-0.5 text-default-foreground">
              {inspectionFormat.name}
            </h6>
            <div className="flex items-center gap-2">
              <Icon
                icon="proicons:apps"
                className="min-w-[18px] h-[18px] text-content4-foreground"
              />
              <p className="text-xs text-content2-foreground">
                {template.name}
              </p>
            </div>
          </div>
        </div>

        <NumberInput
          value={price}
          hideStepper
          placeholder={t("expertRequests.approximatePricePlaceholder")}
          classNames={{
            input:
              "text-left text-foreground font-semibold placeholder:text-start placeholder:font-normal",
          }}
          label={t("expertRequests.approximatePrice")}
          startContent={
            <Button
              isIconOnly
              variant="light"
              className="min-w-fit max-w-fit h-fit"
            >
              <Icon
                icon="eva:edit-2-fill"
                className="text-default-400 min-w-4 h-4"
              />
            </Button>
          }
          endContent={
            <span className="text-foreground font-semibold">ریال</span>
          }
        />

        {!!inspectionData && (
          <>
            {!!inspectionData.vehicle_model && (
              <div className="p-2 bg-default-50">
                <h6 className="text-xs mb-1 text-default-600">
                  {t("expertRequests.vehicleModel")}
                </h6>
                <p className="font-semibold text-foreground">
                  {!!inspectionData?.vehicle_category?.name && (
                    <>{inspectionData.vehicle_category?.name} - </>
                  )}{" "}
                  {!!inspectionData?.vehicle_brand?.name_fa && (
                    <>{inspectionData.vehicle_brand.name_fa} - </>
                  )}{" "}
                  {!!inspectionData?.vehicle_model?.name_fa && (
                    <>{inspectionData.vehicle_model.name_fa}</>
                  )}
                </p>
              </div>
            )}

            {!!inspectionData.license_plate_number && (
              <IranLicensePlate
                licensePlate={inspectionData.license_plate_number}
              />
            )}

            {(!!inspectionData.color || !!inspectionData.vin) && (
              <div className="flex items-center justify-between flex-wrap gap-2 text-content2-foreground text-sm">
                {inspectionData.color && (
                  <div className="flex items-center gap-2">
                    <Icon
                      icon="material-symbols:invert-colors"
                      className="text-content4-foreground min-w-3 h-3"
                    />
                    <p>{inspectionData.color?.name}</p>
                  </div>
                )}

                {inspectionData.vin && (
                  <div className="flex items-center gap-2" dir="ltr">
                    <span>VIN:</span>
                    <p>{inspectionData.vin}</p>
                    <CopyButton
                      value={inspectionData.vin}
                      btnFit
                      iconClassName="text-content4-foreground"
                    />
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

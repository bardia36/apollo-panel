import { AppInput } from "@/components/shared/app-components/app-input";
import { AppSelect } from "@/components/shared/app-components/app-select";
import { LazyImage } from "@/components/shared/lazy-image";
import { colorApi } from "@/apis/colors";
import { vehicleBrandApi } from "@/apis/vehicle-brand";
import { vehicleCategoryApi } from "@/apis/vehicle-category";
import { vehicleModelApi } from "@/apis/vehicle-model";
import { InspectionDataItem } from "@/types/expert-requests";
import { Avatar } from "@heroui/react";
import { t } from "i18next";
import { Control, Controller } from "react-hook-form";

type InspectionFormatDetailCardProps = {
  activeFormat: InspectionDataItem;
  control: Control<any>;
};

export const InspectionFormatDetailCard = ({
  activeFormat,
  control,
}: InspectionFormatDetailCardProps) => {
  return (
    <div className="bg-default-50 shadow-md mt-4 p-4 rounded-[20px]">
      <div className="flex items-center gap-2 mb-8">
        <Avatar
          showFallback
          className="bg-default-100 rounded-large w-12 h-12"
          fallback={
            <LazyImage
              src={activeFormat.logo}
              alt={activeFormat.label}
              width={24}
              height={24}
              className="min-w-[24px] min-h-[24px]"
            />
          }
        />

        <div>
          <h6 className="font-semibold text-foreground-700">
            {activeFormat.label}
          </h6>
          <p className="text-foreground-500 text-sm line-clamp-1">
            {activeFormat.description}
          </p>
        </div>
      </div>

      <div className="gap-x-3 gap-y-4 grid md:grid-cols-3 mb-4">
        <Controller
          control={control}
          name="inspection_data.vehicle_category"
          render={({ field, fieldState: { error } }) => (
            <AppSelect
              label={t("expertRequests.carGroup")}
              labelPlacement="outside"
              placeholder={t("shared.choose")}
              error={error}
              value={field.value}
              itemKey="key"
              itemLabel="label"
              classNames={{
                trigger: "bg-default-100 text-foreground-500",
                label: "text-xs !text-default-600",
              }}
              onChange={(value) => field.onChange(value)}
              fetchData={vehicleCategoryApi.getCategoriesInfo}
            />
          )}
        />

        <Controller
          control={control}
          name="inspection_data.vehicle_brand"
          render={({ field, fieldState: { error } }) => (
            <AppSelect
              label={t("shared.producer")}
              labelPlacement="outside"
              placeholder={t("shared.choose")}
              error={error}
              value={field.value}
              itemKey="key"
              itemLabel="label"
              classNames={{
                trigger: "bg-default-100 text-foreground-500",
                label: "text-xs !text-default-600",
              }}
              onChange={(value) => field.onChange(value)}
              fetchData={vehicleBrandApi.getBrandsInfo}
            />
          )}
        />

        <Controller
          control={control}
          name="inspection_data.vehicle_model"
          render={({ field, fieldState: { error } }) => (
            <AppSelect
              label={t("shared.model")}
              labelPlacement="outside"
              placeholder={t("shared.choose")}
              error={error}
              value={field.value}
              itemKey="key"
              itemLabel="label"
              classNames={{
                trigger: "bg-default-100 text-foreground-500",
                label: "text-xs !text-default-600",
              }}
              onChange={(value) => field.onChange(value)}
              fetchData={vehicleModelApi.getModelsInfo}
            />
          )}
        />
      </div>

      <div className="gap-x-3 gap-y-4 grid md:grid-cols-2">
        <Controller
          control={control}
          name="inspection_data.vin"
          render={({ field, fieldState: { error } }) => (
            <AppInput
              {...field}
              label={t("expertRequests.vinNumber")}
              labelPlacement="outside"
              placeholder={t("expertRequests.vinNumberPlaceholder")}
              error={error}
              value={field.value}
              classNames={{
                inputWrapper: "bg-default-100",
                input: "text-foreground-500",
                label: "text-xs !text-default-600",
              }}
            />
          )}
        />

        <Controller
          control={control}
          name="inspection_data.color"
          render={({ field, fieldState: { error } }) => (
            <AppSelect
              label={t("shared.color")}
              labelPlacement="outside"
              placeholder={t("shared.choose")}
              error={error}
              value={field.value}
              itemKey="key"
              itemLabel="label"
              classNames={{
                trigger: "bg-default-100 text-foreground-500",
                label: "text-xs !text-default-600",
              }}
              onChange={(value) => field.onChange(value)}
              fetchData={colorApi.getColorsInfo}
            />
          )}
        />
      </div>
    </div>
  );
};

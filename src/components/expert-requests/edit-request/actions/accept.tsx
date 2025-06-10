import { exceptionHandler } from "@/apis/exception";
import { expertRequestsApi } from "@/apis/expert-requests";
import {
  AppModal,
  AppModalRef,
} from "@/components/shared/app-components/app-modal";
import { Button, Switch, Checkbox } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { t } from "i18next";
import { useParams } from "react-router-dom";
import { useRef, useState } from "react";
import { ActionsHeader } from "./components/actions-header";
import { RequestCode } from "./components/request-code";
import { TagInput } from "@/components/shared/tag-input";
import IranLicensePlate from "@/components/shared/iran-license-plate";
import { AppInput } from "@/components/shared/app-components/app-input";
import { ExpertRequestDetail } from "@/types/expert-requests";
// import { LazyImage } from "@/components/shared/lazy-image";

type Props = {
  requestData: ExpertRequestDetail;
};

export const AcceptRequestModal = ({ requestData }: Props) => {
  const { id } = useParams();
  const modalRef = useRef<AppModalRef>(null);
  const queryClient = useQueryClient();
  const [sendNotification, setSendNotification] = useState(true);
  const [tags, setTags] = useState<string[]>(requestData.tags || []);
  const [disableSupplemental, setDisableSupplemental] = useState(false);

  const [vehicleFuel, setVehicleFuel] = useState("");
  const [color, setColor] = useState(
    requestData.inspection_data.color?.name || ""
  );
  const [motorCode, setMotorCode] = useState("");
  const [vin, setVin] = useState(requestData.inspection_data.vin || "");
  const [chassisNumber, setChassisNumber] = useState("");

  const [rightNumber, setRightNumber] = useState("");
  const [leftNumber, setLeftNumber] = useState("");
  const [letter, setLetter] = useState("");
  const [provinceCode, setProvinceCode] = useState("");

  const { mutate: acceptRequest, isPending } = useMutation({
    mutationFn: async () =>
      expertRequestsApi.accept(id as string, {
        vehicle_fuel: vehicleFuel,
        color,
        motor_code: motorCode,
        vin,
        chassis_number: chassisNumber,
        right_number: rightNumber,
        left_number: leftNumber,
        letter,
        province_code: provinceCode,
        notify_user: sendNotification,
        tags,
      }),
    onSuccess: () => {
      modalRef.current?.onClose();
      queryClient.invalidateQueries({ queryKey: ["expert-request", id] });
    },
    onError: (err) => exceptionHandler(err),
  });

  return (
    <AppModal
      ref={modalRef}
      activator={
        <Button
          variant="shadow"
          className="bg-foreground-900 text-foreground-50 ms-1"
        >
          <Icon
            icon="solar:check-circle-bold"
            width={20}
            height={20}
            className="text-foreground-50 min-w-5"
          />
          {t("expertRequests.confirmRequest")}
        </Button>
      }
      size="xl"
      hideCloseButton={false}
    >
      <AppModal.Header>
        <ActionsHeader
          title={t("expertRequests.confirmRequest")}
          icon="solar:check-circle-bold"
        />
      </AppModal.Header>

      <div className="flex flex-col gap-6">
        <RequestCode code={requestData.req_id} />

        <div>
          <h6 className="text-default-600 text-xs mb-2">
            {t("shared.supplementalInfo")}
          </h6>

          <div className="bg-foreground-50 border-1 border-default-100 shadow-sm shadow-neutral rounded-3xl p-3.5 flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AppInput
                label={t("expertRequests.fuelType")}
                value={vehicleFuel}
                size="lg"
                onValueChange={setVehicleFuel}
                placeholder={t("expertRequests.fuelType")}
                isDisabled={disableSupplemental}
              />

              <AppInput
                label={t("shared.color")}
                value={color}
                size="lg"
                onValueChange={setColor}
                placeholder={t("shared.color")}
                isDisabled={disableSupplemental}
              />

              <AppInput
                label={t("expertRequests.motorNumber")}
                value={motorCode}
                size="lg"
                onValueChange={setMotorCode}
                placeholder={t("expertRequests.motorNumber")}
                isDisabled={disableSupplemental}
              />

              <AppInput
                label={t("expertRequests.vinNumber")}
                value={vin}
                size="lg"
                onValueChange={setVin}
                placeholder={t("expertRequests.vinNumber")}
                isDisabled={disableSupplemental}
              />

              <AppInput
                label={t("expertRequests.chassisNumber")}
                value={chassisNumber}
                size="lg"
                onValueChange={setChassisNumber}
                placeholder={t("expertRequests.chassisNumber")}
                isDisabled={disableSupplemental}
              />

              <IranLicensePlate
                licensePlate={requestData.inspection_data.license_plate_number}
                onChange={(val) => {
                  setRightNumber(val.right_number);
                  setLeftNumber(val.left_number);
                  setLetter(val.letter);
                  setProvinceCode(val.province_code);
                }}
                isDisabled={disableSupplemental}
              />
            </div>

            <div>
              <div className="flex items-center">
                <Icon
                  icon="solar:info-circle-bold"
                  className="text-default-foreground min-w-4 h-4 me-2.5"
                />
                <p className="text-xs text-foreground">
                  {t("expertRequests.checkYourCartForFillingThisForm")}
                </p>
              </div>

              {/* TODO: add image whenever backend is ready */}
              {/* <LazyImage /> */}
            </div>
          </div>
        </div>

        <div className="bg-default-50 rounded-xl px-4 py-3.5">
          <Checkbox
            isSelected={disableSupplemental}
            onValueChange={setDisableSupplemental}
          >
            <span className="font-semibold text-foreground-700">
              {t("expertRequests.acceptWithoutSupplemental")}
            </span>
          </Checkbox>
        </div>

        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2 md:gap-4 flex-1 bg-default-50 rounded-xl px-4 py-3.5">
            <div className="flex items-center gap-2 md:gap-4 flex-1">
              <Icon
                icon="solar:bell-outline"
                className="text-xl text-default-foreground"
              />
              {t("expertRequests.notifyUser")}
            </div>

            <Switch
              isSelected={sendNotification}
              onValueChange={setSendNotification}
              size="sm"
              className="flex-1"
            />
          </div>

          <div className="flex-1">
            <TagInput
              label={t("expertRequests.tag")}
              value={tags}
              onChange={setTags}
            />
          </div>
        </div>
      </div>

      <AppModal.Footer>
        <Button
          onPress={() => modalRef.current?.onClose()}
          isLoading={isPending}
          variant="light"
          className="text-default-foreground me-2"
          startContent={
            <Icon icon="mynaui:arrow-right" className="min-w-5 h-5" />
          }
        >
          {t("shared.back")}
        </Button>

        <Button
          className="bg-foreground-900 text-default-50"
          isLoading={isPending}
          startContent={
            <Icon icon="ic:baseline-check" className="min-w-5 h-5" />
          }
          onPress={() => acceptRequest()}
        >
          {t("shared.acceptIt")}
        </Button>
      </AppModal.Footer>
    </AppModal>
  );
};

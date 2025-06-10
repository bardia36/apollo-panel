import { exceptionHandler } from "@/apis/exception";
import { expertRequestsApi } from "@/apis/expert-requests";
import {
  AppModal,
  AppModalRef,
} from "@/components/shared/app-components/app-modal";
import { ExpertRequestStatus } from "@/types/expert-requests";
import { Button, Checkbox, Switch, Textarea } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useMutation } from "@tanstack/react-query";
import { t } from "i18next";
import { useParams } from "react-router-dom";
import { useRef, useState } from "react";
import { ActionsHeader } from "./components/actions-header";
import { RequestCode } from "./components/request-code";
import { AppStatusSelect } from "@/components/shared/app-components/app-status-select";
import { TagInput } from "@/components/shared/tag-input";

type Props = {
  status: ExpertRequestStatus;
  code: string;
  tags: string[];
};

export const ChangeStatusModal = ({ status, code, tags }: Props) => {
  const { id } = useParams();
  const modalRef = useRef<AppModalRef>(null);

  const [selectedStatus, setSelectedStatus] = useState<ExpertRequestStatus[]>(
    []
  );
  const [reqTags, setReqTags] = useState<string[]>(tags);
  const [changeMind, setChangeMind] = useState(false);
  const [sendNotification, setSendNotification] = useState(true);
  const [cantSendNotification, setCantSendNotification] = useState(false);
  const [reason, setReason] = useState("");

  const { mutate: changeStatus, isPending } = useMutation({
    mutationFn: async () =>
      expertRequestsApi.changeStatus(id as string, {
        status: selectedStatus[0],
        change_mind: changeMind,
        send_notification: sendNotification,
        cant_send_notification: cantSendNotification,
        tags: reqTags,
      }),
    onSuccess: () => modalRef.current?.onClose(),
    onError: (err) => exceptionHandler(err),
  });

  return (
    <AppModal
      ref={modalRef}
      activator={
        <Button
          variant={status === "REVIEWED" ? "light" : "flat"}
          size="sm"
          isIconOnly={status === "REVIEWED"}
          className="text-default-foreground"
        >
          <Icon
            icon="bx:sort"
            width={20}
            height={20}
            className="text-foreground min-w-5"
          />
          {status !== "REVIEWED" && t("shared.changeStatus")}
        </Button>
      }
      size="xl"
      hideCloseButton={false}
    >
      <AppModal.Header>
        <ActionsHeader title={t("shared.changeStatus")} icon="bx:sort" />
      </AppModal.Header>

      <div className="flex flex-col gap-6">
        <RequestCode code={code} />

        <div className="space-y-2">
          <div className="space-y-2">
            <AppStatusSelect
              label={t("expertRequests.newStatus")}
              selectedStatuses={selectedStatus}
              onStatusChange={setSelectedStatus}
              selectionMode="single"
              currentStatus={status}
            />
          </div>

          <div className="space-y-2">
            <h6 className="text-xs text-default-600">
              {t("expertRequests.statusChangeReason")}
            </h6>
            <div className="flex flex-col gap-2">
              <Checkbox isSelected={changeMind} onValueChange={setChangeMind}>
                {t("expertRequests.changeMind")}
              </Checkbox>
              <Checkbox
                isSelected={!cantSendNotification}
                onValueChange={(checked) => {
                  setCantSendNotification(!checked);
                  if (!checked) setSendNotification(false);
                }}
              >
                {t("expertRequests.canSendNotification")}
              </Checkbox>
            </div>
          </div>

          <div className="space-y-2">
            <h6 className="text-xs text-default-600">
              {t("expertRequests.reasonDescription")}
            </h6>
            <Textarea
              value={reason}
              onValueChange={setReason}
              placeholder={t("expertRequests.writeReasonHere")}
              classNames={{ inputWrapper: "border-2 border-default-200" }}
            />
          </div>

          <div className="bg-default-100 rounded-2xl p-3 flex items-center gap-2">
            <Icon
              icon="solar:info-circle-bold"
              className="min-w-6 h-6 text-default-foreground"
            />
            <div className="text-sm text-foreground">
              <p className="font-bold">
                {t("expertRequests.statusChangeWarning")}
              </p>
              <p>{t("expertRequests.statusChangeWarningDescription")}</p>
            </div>
          </div>

          <div className="flex items-start justify-between gap-4 pt-4">
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
                isDisabled={cantSendNotification}
                size="sm"
                className="flex-1"
              />
            </div>

            <div className="flex-1">
              <TagInput
                label={t("expertRequests.tag")}
                value={reqTags}
                onChange={setReqTags}
              />
            </div>
          </div>
        </div>
      </div>

      <AppModal.Footer>
        <Button
          onPress={() => changeStatus()}
          isLoading={isPending}
          isDisabled={!selectedStatus.length}
        >
          {t("shared.saveAndSubmit")}
        </Button>
      </AppModal.Footer>
    </AppModal>
  );
};

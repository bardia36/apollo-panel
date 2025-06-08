import { exceptionHandler } from "@/apis/exception";
import { expertRequestsApi } from "@/apis/expert-requests";
import {
  AppModal,
  AppModalRef,
} from "@/components/shared/app-components/app-modal";
import {
  Button,
  Switch,
  Checkbox,
  CheckboxGroup,
  Textarea,
} from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useMutation } from "@tanstack/react-query";
import { t } from "i18next";
import { useParams } from "react-router-dom";
import { useRef, useState } from "react";
import { ActionsHeader } from "./components/actions-header";
import { RequestCode } from "./components/request-code";
import { TagInput } from "@/components/shared/tag-input";

type Props = {
  code: string;
  tags?: string[];
};

export const RejectRequestModal = ({ code, tags }: Props) => {
  const { id } = useParams();
  const modalRef = useRef<AppModalRef>(null);
  const [sendNotification, setSendNotification] = useState(true);
  const [requestTags, setRequestTags] = useState<string[]>(tags || []);
  const [reasons, setReasons] = useState<string[]>([]);
  const [otherReason, setOtherReason] = useState("");

  const REJECTION_REASONS = t("expertRequests.rejectReasons", {
    returnObjects: true,
  }) as string[];

  const { mutate: rejectRequest, isPending } = useMutation({
    mutationFn: async () =>
      expertRequestsApi.reject(id as string, {
        reasons: otherReason ? [...reasons, otherReason] : reasons,
        tags: requestTags,
        send_notification: sendNotification,
      }),
    onSuccess: () => modalRef.current?.onClose(),
    onError: (err) => exceptionHandler(err),
  });

  return (
    <AppModal
      ref={modalRef}
      activator={
        <Button
          variant="light"
          size="sm"
          className="hidden md:flex text-default-foreground"
        >
          <Icon
            icon="solar:clipboard-remove-bold"
            width={20}
            height={20}
            className="text-foreground min-w-5"
          />

          {t("expertRequests.rejectRequest")}
        </Button>
      }
      size="xl"
      hideCloseButton={false}
    >
      <AppModal.Header>
        <ActionsHeader
          title={t("expertRequests.rejectRequest")}
          icon="solar:clipboard-remove-bold"
        />
      </AppModal.Header>

      <div className="flex flex-col gap-6">
        <RequestCode code={code} />

        <div className="flex flex-col gap-2">
          <h6 className="text-default-600 text-xs mb-1">
            {t("expertRequests.requestRejectReason")}
          </h6>
          <CheckboxGroup value={reasons} color="default" onChange={setReasons}>
            {REJECTION_REASONS.map((reason) => (
              <Checkbox size="sm" key={reason} value={reason} className="mb-0">
                {reason}
              </Checkbox>
            ))}
          </CheckboxGroup>

          <Textarea
            value={otherReason}
            variant="bordered"
            onChange={(e) => setOtherReason(e.target.value)}
            placeholder={t("expertRequests.otherReasonPlaceholder")}
            className="mt-2"
            classNames={{ inputWrapper: "bg-default-100" }}
          />
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
              size="sm"
              className="flex-1"
            ></Switch>
          </div>

          <div className="flex-1">
            <TagInput
              label={t("expertRequests.tag")}
              value={requestTags}
              onChange={setRequestTags}
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

        <Button onPress={() => rejectRequest()} isLoading={isPending}>
          {t("shared.saveAndSubmit")}
        </Button>
      </AppModal.Footer>
    </AppModal>
  );
};

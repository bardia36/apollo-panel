import { exceptionHandler } from "@/apis/exception";
import { expertRequestsApi } from "@/apis/expert-requests";
import {
  AppModal,
  AppModalRef,
} from "@/components/shared/app-components/app-modal";
import { Button, Switch } from "@heroui/react";
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
};

export const AcceptRequestModal = ({ code }: Props) => {
  const { id } = useParams();
  const modalRef = useRef<AppModalRef>(null);
  const [sendNotification, setSendNotification] = useState(true);
  const [cantSendNotification, setCantSendNotification] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

  const { mutate: acceptRequest, isPending } = useMutation({
    mutationFn: async () => expertRequestsApi.accept(id as string, {}),
    onSuccess: () => modalRef.current?.onClose(),
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
        <RequestCode code={code} />

        <div className="bg-foreground-50 border-2 border-default-100 shadow-sm shadow-neutral rounded-3xl p-[14px]">
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
              ></Switch>
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

        <Button onPress={() => acceptRequest()} isLoading={isPending}>
          {t("shared.acceptIt")}
        </Button>
      </AppModal.Footer>
    </AppModal>
  );
};

import { exceptionHandler } from "@/apis/exception";
import { expertRequestsApi } from "@/apis/expert-requests";
import {
  AppModal,
  AppModalRef,
} from "@/components/shared/app-components/app-modal";
import { NeutralChip } from "@/components/shared/request-status-chip";
import { ExpertRequestStatus } from "@/types/expert-requests";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useMutation } from "@tanstack/react-query";
import { t } from "i18next";
import { useParams } from "react-router-dom";
import { useRef } from "react";

type Props = {
  status: ExpertRequestStatus;
  code: string;
};

export const RetrieveRequestModal = ({ status, code }: Props) => {
  const { id } = useParams();
  const modalRef = useRef<AppModalRef>(null);

  const { mutate: retrieveRequest, isPending } = useMutation({
    mutationFn: async () =>
      expertRequestsApi.retrieveRequest(id as string, {
        status,
      }),
    onSuccess: () => modalRef.current?.onClose(),
    onError: (err) => exceptionHandler(err),
  });

  return (
    <AppModal
      ref={modalRef}
      activator={
        <Button variant="flat" size="sm" className="text-default-foreground">
          <Icon
            icon="solar:undo-left-round-bold"
            width={20}
            height={20}
            className="text-foreground min-w-5"
          />

          {t("expertRequests.retrieveRequest")}
        </Button>
      }
      size="xl"
      hideCloseButton={false}
    >
      <AppModal.Header>
        <div className="flex items-center gap-2">
          <Icon icon="solar:undo-left-round-bold" className="min-w-6 h-6" />

          <h6 className="text-lg font-semibold text-default-foreground">
            {t("expertRequests.retrieveRequest")}
          </h6>
        </div>
      </AppModal.Header>

      <div className="flex flex-col gap-6">
        <h5 className="text-default-foreground text-3xl font-bold">
          <span className="hidden md:inline-block">
            {t("expertRequests.request")}
          </span>
          {t("expertRequests.code")} {code}
        </h5>

        <div className="bg-foreground-50 border-2 border-default-100 shadow-sm shadow-neutral rounded-3xl p-[14px]">
          <h6 className="text-default-600 mb-2">
            {t("expertRequests.previousStatus")}
          </h6>
          <NeutralChip status={status} />
        </div>
      </div>

      <AppModal.Footer>
        <Button onPress={() => retrieveRequest()} isLoading={isPending}>
          {t("expertRequests.retrieveIt")}
        </Button>
      </AppModal.Footer>
    </AppModal>
  );
};

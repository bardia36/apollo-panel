import { AppModal } from "@/components/shared/app-components/app-modal";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { t } from "i18next";
import { useParams } from "react-router-dom";

export const RetrieveRequestModal = () => {
  const { id } = useParams();

  return (
    <AppModal
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
      hideCloseButton={false}
    >
      <div>Hello {id}</div>
    </AppModal>
  );
};

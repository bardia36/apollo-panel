import CopyButton from "@/components/shared/copy-button";
import { OneLineDateDisplay } from "@/components/shared/date-display";
import {
  ExpertRequestDetail,
  ExpertRequestStatus,
} from "@/types/expert-requests";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { t } from "i18next";

type Props = {
  orderNumber: ExpertRequestDetail["order_number"];
  status: ExpertRequestStatus;
  statusHistory: ExpertRequestDetail["status_history"];
};

export default function RequestStatus({
  orderNumber,
  status,
  statusHistory,
}: Props) {
  return (
    <div className="flex flex-col gap-4">
      <h6 className="text-xs text-default-600">
        {t("expertRequests.requestStatus")}
      </h6>

      <div>
        {statusHistory.map((item, index) => (
          <div
            key={item.updatedAt + item.createdAt}
            className={`flex items-center gap-4 px-3 py-2 rounded-large ${
              item.status === "COMPLETED" && "bg-content1 shadow-md"
            }`}
          >
            {item.status === "COMPLETED" ? (
              <div className="p-1.5 rounded-full bg-primary shadow-lg shadow-primary">
                <Icon
                  icon="humbleicons:check"
                  className="text-primary-foreground min-w-6 h-6"
                />
              </div>
            ) : (
              <div
                className={`rounded-full border-2 w-9 h-9 flex items-center justify-center ${
                  item.status === "ACCEPTED"
                    ? "text-primary border-primary"
                    : "text-primary-300 border-primary-300"
                }`}
              >
                {index + 1}
              </div>
            )}

            <div>
              <h6 className="text-sm font-semibold text-default-foreground">
                {item.description}
              </h6>
              <OneLineDateDisplay
                isoDate={item.updatedAt}
                className="text-default-500"
              />
            </div>
          </div>
        ))}
      </div>

      {["COMPLETED", "REVIEWED"].includes(status) && (
        <div className="grid grid-cols-6 gap-2.5">
          {orderNumber && (
            <div className="col-span-2 lg:col-span-3 xl:col-span-2 bg-default-100 rounded-lg shadow-sm shadow-neutral px-4 py-1">
              <p className="text-xs text-default-600 mb-1">
                {t("expertRequests.orderNumber")}
              </p>

              <div className="flex items-center justify-between gap-2">
                <span className="text-foreground">{orderNumber}</span>
                <CopyButton
                  value={orderNumber}
                  size="6"
                  iconSize="12"
                  iconClassName="text-content4-foreground"
                />
              </div>
            </div>
          )}

          <Button
            variant="flat"
            size="sm"
            className={`h-12 ${orderNumber ? "col-span-4 lg:col-span-3 xl:col-span-4" : "col-span-6 lg:col-span-4 xl:col-span-3"}`}
            startContent={
              <Icon
                icon="solar:upload-square-bold"
                className="text-default-foreground min-w-5 h-5"
              />
            }
          >
            <span className="text-xs">
              {t("expertRequests.viewReferenceRequest")}
            </span>
          </Button>
        </div>
      )}
    </div>
  );
}

import { OneLineDateDisplay } from "@/components/shared/date-display";
import { ExpertRequestDetail } from "@/types/expert-requests";
import { copyToClipboard } from "@/utils/base";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { t } from "i18next";

export default function RequestStatus({
  orderNumber,
  status,
}: {
  orderNumber: ExpertRequestDetail["order_number"];
  status: ExpertRequestDetail["status"];
}) {
  const sampleData = [
    {
      id: 1,
      title: t("expertRequests.sendLinkToUser"),
      createdAt: "2025-05-31T09:22:24.218Z",
      isCompleted: true,
    },
    {
      id: 2,
      title: t("expertRequests.uploadAndSendItems"),
      createdAt: "2025-05-31T09:22:24.218Z",
      isCompleted: false,
      active: true,
    },
    {
      id: 3,
      title: t("expertRequests.reviewBySpecialist"),
      createdAt: "2025-05-31T09:22:24.218Z",
      isCompleted: false,
    },
    {
      id: 4,
      title: t("expertRequests.notifyExpert"),
      createdAt: "2025-05-31T09:22:24.218Z",
      isCompleted: false,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <h6 className="text-xs text-default-600">
        {t("expertRequests.requestStatus")}
      </h6>

      <div>
        {/* TODO: Handle it from request data */}
        {sampleData.map((item, index) => (
          <div
            key={item.id}
            className={`flex items-center gap-4 px-3 py-2 rounded-large ${
              item.active && "bg-content1 shadow-md"
            }`}
          >
            {item.isCompleted ? (
              <div className="p-1.5 rounded-full bg-primary shadow-lg shadow-primary">
                <Icon
                  icon="humbleicons:check"
                  className="text-primary-foreground min-w-6 h-6"
                />
              </div>
            ) : (
              <div
                className={`rounded-full border-2 w-9 h-9 flex items-center justify-center ${
                  item.active
                    ? "text-primary border-primary"
                    : "text-primary-300 border-primary-300"
                }`}
              >
                {index + 1}
              </div>
            )}

            <div>
              <h6 className="text-sm font-semibold text-default-foreground">
                {item.title}
              </h6>
              <OneLineDateDisplay
                isoDate={item.createdAt}
                className="text-default-500"
              />
            </div>
          </div>
        ))}
      </div>

      {["COMPLETED", "REVIEWED"].includes(status) && (
        <div className="grid grid-cols-6 gap-2.5">
          {orderNumber && (
            <div className="col-span-2 bg-default-100 rounded-lg shadow-sm shadow-neutral px-4 py-1">
              <p className="text-xs text-default-600 mb-1">
                {t("expertRequests.orderNumber")}
              </p>

              <div className="flex items-center justify-between gap-2">
                <span className="text-foreground">{orderNumber}</span>
                <Button
                  isIconOnly
                  variant="light"
                  className="min-w-6 w-6 h-6"
                  onPress={copyToClipboard(orderNumber)}
                >
                  <Icon
                    icon="solar:copy-linear"
                    width={12}
                    height={12}
                    className="min-w-3 text-content4-foreground"
                  />
                </Button>
              </div>
            </div>
          )}

          <Button
            variant="flat"
            size="sm"
            className={`h-12 ${orderNumber ? "col-span-4" : "col-span-6"}`}
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

import CollapsableCards from "@/components/shared/collapsable-cards";
import { NeutralChip } from "@/components/shared/request-status-chip";
import { ExpertRequestDetail } from "@/types/expert-requests";
import { Button, Chip } from "@heroui/react";
import { statusesMap } from "../../constants";
import { t } from "i18next";
import { Icon } from "@iconify/react/dist/iconify.js";

interface RequestDetailsProps {
  requestData: ExpertRequestDetail;
}

export default function RequestDetails({ requestData }: RequestDetailsProps) {
  return (
    <div className="grid lg:grid-cols-12 gap-4">
      <div className="col-span-12 grid lg:grid-cols-12 gap-12 bg-default-50 p-4 rounded-large">
        <div className="flex flex-col items-center bg-content1 shadow-md rounded-3xl lg:col-span-8 p-6">
          {!!requestData.documents?.img?.length && (
            <div className="min-h-[156px] w-full flex items-center justify-center">
              {/* TODO: handle if img is less and more than 4, handle license */}
              <CollapsableCards items={requestData.documents?.img} />
            </div>
          )}

          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 text-right text-xl font-light">
                <span>این درخواست</span>
                <Chip variant="flat" radius="full">
                  {requestData.createdAt}
                </Chip>
                <span>است که</span>
                <NeutralChip
                  status={{
                    uid: requestData.status,
                    label: statusesMap[requestData.status].label,
                  }}
                />
                <span>است.</span>
              </div>

              {["COMPLETED", "REVIEWED"].includes(requestData.status) && (
                <p className="text-xl font-light">
                  لطفاً پس از مشاهده محتویات و بررسی آن، درخواست را تأیید یا رد
                  کنید.
                </p>
              )}

              {requestData.status === "DRAFT" && (
                <p className="text-xl font-light">
                  لطفاً محتویات کارشناسی را مشخص و لینک آن را به کاربر ارسال
                  کنید.
                </p>
              )}

              {requestData.status === "ACCEPTED" && (
                <p className="text-xl font-light">
                  می‌توانید محتویات را مشاهده یا دانلود کنید.
                </p>
              )}

              {["PENDING", "OPENED", "IN_PROGRESS"].includes(
                requestData.status
              ) && (
                <p className="text-xl font-light">
                  لطفاً محتویات کارشناسی را مشخص و لینک آن را به کاربر ارسال
                  کنید.
                </p>
              )}

              {["CANCELED", "EXPIRED", "REJECTED", "FAILED"].includes(
                requestData.status
              ) && (
                <>
                  <p className="text-xl font-light">
                    درصورت نیاز، درخواست جدید ایجاد کنید.
                  </p>

                  <Button
                    variant="flat"
                    radius="lg"
                    className="text-default-foreground mt-4"
                  >
                    <Icon
                      icon="solar:document-medicine-bold"
                      className="min-w-5 h-5"
                    />
                    {t("expertRequests.createRequest")}
                  </Button>
                </>
              )}

              {["COMPLETED", "REVIEWED", "ACCEPTED"].includes(
                requestData.status
              ) && (
                <div className="flex items-center gap-2 mt-2">
                  <Button
                    variant="light"
                    radius="lg"
                    className="text-default-foreground"
                  >
                    دانلود
                    <Icon
                      icon="solar:archive-down-minimlistic-bold-duotone"
                      className="min-w-5 h-5"
                    />
                  </Button>

                  <Button
                    variant="shadow"
                    radius="lg"
                    size="lg"
                    color="primary"
                  >
                    مشاهده محتویات
                    <Icon icon="solar:play-bold" className="min-w-5 h-5" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4">steps</div>
      </div>

      <div className="col-span-12 grid lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 order-1 lg:order-none bg-default-50 rounded-large p-4 flex gap-4">
          user
        </div>
        <div className="lg:col-span-4">location</div>
      </div>

      <div className="col-span-12 grid lg:grid-cols-12 gap-4 lg:col-span-8 bg-default-50 rounded-large p-4">
        <div className="lg:col-span-5 p-4 bg-content1 rounded-3xl">
          template
        </div>
        <div className="lg:col-span-7 p-4 bg-content1 rounded-3xl">detail</div>
      </div>
    </div>
  );
}

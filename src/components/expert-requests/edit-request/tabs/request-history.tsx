import { OneLineDateDisplay } from "@/components/shared/date-display";
import { ExpertRequestDetail } from "@/types/expert-requests";
import { Avatar, Chip, Divider } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";

interface RequestHistoryProps {
  requestData: ExpertRequestDetail;
}

export default function RequestHistory({ requestData }: RequestHistoryProps) {
  return (
    <div className="bg-content1 xl:p-4">
      {requestData.request_log.map((log, index) => (
        <div key={index + log.createdAt} className="flex gap-6">
          <div className="flex flex-col items-center">
            <Chip
              radius="full"
              variant="solid"
              classNames={{ content: "px-0 flex justify-center" }}
              className="bg-content4 shadow-lg min-w-8 h-8"
            >
              <Icon
                icon="solar:info-circle-bold"
                className="min-w-5 h-5 text-default-foreground"
              />
            </Chip>
            <Divider className="flex-1 bg-content3 w-[1px]" />
          </div>

          <div className="flex flex-col gap-4 pb-8">
            <Chip
              radius="full"
              size="sm"
              variant="flat"
              className="bg-foreground-100 px-2"
              startContent={
                <Icon
                  icon="solar:calendar-minimalistic-outline"
                  className="me-1 min-w-4 h-4 text-default-400"
                />
              }
            >
              <OneLineDateDisplay
                isoDate={log.createdAt}
                className="text-default-foreground text-xs"
              />
            </Chip>

            {!!log.operation && (
              <p className="text-default-800">{log.operation}</p>
            )}

            {(!!log.ip || !!log.os || log.browser) && (
              <div className="flex flex-col gap-0.5">
                {!!log.ip && (
                  <Chip
                    variant="flat"
                    radius="sm"
                    startContent={
                      <Icon
                        icon="solar:gps-outline"
                        className="min-w-4 h-4 text-default-400"
                      />
                    }
                    className="bg-foreground-100 px-2 text-default-800 text-sm"
                  >
                    IP: {log.ip}
                  </Chip>
                )}

                {!!log.os && (
                  <Chip
                    variant="flat"
                    radius="sm"
                    startContent={
                      <Icon
                        icon="solar:iphone-outline"
                        className="min-w-4 h-4 text-default-400"
                      />
                    }
                    className="bg-foreground-100 px-2 text-default-800 text-sm"
                  >
                    {log.os}
                  </Chip>
                )}

                {!!log.browser && (
                  <Chip
                    variant="flat"
                    radius="sm"
                    startContent={
                      <Icon
                        icon="hugeicons:browser"
                        className="min-w-4 h-4 text-default-400"
                      />
                    }
                    className="bg-foreground-100 px-2 text-default-800 text-sm"
                  >
                    {log.browser}
                  </Chip>
                )}
              </div>
            )}

            {!!log.admin && (
              <div className="flex items-center gap-2">
                <Avatar
                  className="bg-content2"
                  classNames={{ icon: "text-content3" }}
                />
                <div>
                  <p className="text-default-800 text-sm">
                    {log.admin?.username}
                  </p>
                  {/* TODO: Backend <p className="text-default-500 text-xs">{log.admin.role}</p> */}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

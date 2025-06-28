import {
  Avatar,
  AvatarGroup,
  Button,
  Checkbox,
  CheckboxGroup,
  Tooltip,
} from "@heroui/react";
import { t } from "i18next";
import { ExpertRequestDetail } from "@/types/expert-requests";
import CopyButton from "@/components/shared/copy-button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { expertRequestsApi } from "@/apis/expert-requests";
import { useParams } from "react-router-dom";
import { exceptionHandler } from "@/apis/exception";

type RequestUserSpecialistProps = {
  lead_specialist: ExpertRequestDetail["lead_specialist"];
  owner: ExpertRequestDetail["owner"];
  unit: ExpertRequestDetail["unit"];
  reviewers: ExpertRequestDetail["reviewers"];
};

export default function RequestUserSpecialist({
  lead_specialist,
  owner,
  unit,
  reviewers,
}: RequestUserSpecialistProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const handleReminderClick = async () => {
    if (!selectedOptions.length) return;

    try {
      setIsLoading(true);
      await expertRequestsApi.reminder(id!, {
        send_sms: selectedOptions.includes("sms"),
        send_email: selectedOptions.includes("email"),
      });
    } catch (error) {
      exceptionHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="gap-4 grid grid-cols-2">
      <div className="col-span-2 xl:col-span-1">
        <h6 className="mb-2 text-default-600 text-xs">{t("shared.user")}</h6>

        <div className="flex flex-wrap items-center gap-4 bg-content1 mb-2 p-4 rounded-3xl">
          <Avatar
            size="lg"
            className="bg-foreground-200 rounded-large text-primary-foreground"
            classNames={{ icon: "drop-shadow-lg" }}
          />

          <div className="flex-1">
            <h6 className="mb-2 font-semibold">{owner.username}</h6>
            <div className="flex flex-wrap justify-between items-center gap-2">
              {owner.phoneNumber && (
                <div className="flex items-center gap-2">
                  <CopyButton
                    value={owner.phoneNumber}
                    btnFit
                    iconSize="12"
                    iconClassName="text-content4-foreground"
                  />
                  <p className="text-content2-foreground text-sm">
                    {owner.phoneNumber}
                  </p>
                </div>
              )}

              {owner.email && (
                <div className="flex items-center gap-2">
                  <CopyButton
                    value={owner.email}
                    btnFit
                    iconSize="12"
                    iconClassName="text-content4-foreground"
                  />
                  <p className="text-content2-foreground text-sm">
                    {owner.email}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-between items-center gap-2">
          <Button
            variant="flat"
            size="sm"
            startContent={<Icon icon="mingcute:send-fill" />}
            isLoading={isLoading}
            isDisabled={isLoading || !selectedOptions.length}
            onPress={handleReminderClick}
          >
            {t("expertRequests.sendReminderMessage")}
          </Button>

          <CheckboxGroup
            orientation="horizontal"
            size="sm"
            dir="ltr"
            value={selectedOptions}
            onChange={setSelectedOptions}
          >
            <Checkbox value="sms">SMS</Checkbox>
            <Checkbox value="email">Email</Checkbox>
          </CheckboxGroup>
        </div>
      </div>

      <div className="col-span-2 xl:col-span-1">
        <h6 className="mb-2 text-default-600 text-xs">
          {t("expertRequests.specialist")}
        </h6>

        <div className="flex flex-wrap items-center gap-4 bg-content1 mb-2 p-4 rounded-3xl">
          <Avatar
            size="lg"
            radius="full"
            className="bg-foreground-200 text-primary-foreground"
            classNames={{ icon: "drop-shadow-lg" }}
          />

          <div className="flex-1">
            <h6 className="font-semibold">{lead_specialist?.username}</h6>
            <div className="flex flex-wrap items-center gap-2 md:gap-6 mt-2 text-content2-foreground text-sm">
              <div className="flex items-center gap-2">
                <Icon
                  icon="solar:user-id-linear"
                  className="min-w-[18px] h-[18px] text-content4-foreground"
                />
                <p>{t("expertRequests.responsibleSpecialist")}</p>
              </div>

              {!!lead_specialist?.unit?.title && (
                <p>{lead_specialist.unit.title}</p>
              )}
            </div>
          </div>
        </div>

        {(!!unit || !!reviewers?.length) && (
          <div className="flex flex-wrap justify-between items-center gap-2">
            {unit && (
              <div>
                <p className="text-default-foreground text-xs">{unit.title}</p>
                <p className="text-content4-foreground text-xs">
                  {unit.parent?.title}
                </p>
              </div>
            )}

            {!!reviewers?.length && (
              <div className="flex items-center gap-2 ms-auto">
                <AvatarGroup>
                  {reviewers.map((reviewer) => (
                    <Tooltip
                      key={reviewer.owner.email}
                      content={`${reviewer.owner.username} - ${reviewer.unit?.title}`}
                    >
                      <Avatar
                        key={reviewer.owner.email}
                        size="sm"
                        radius="full"
                        classNames={{ icon: "text-content1" }}
                        className="bg-foreground-200"
                      />
                    </Tooltip>
                  ))}
                </AvatarGroup>

                {owner.username !== lead_specialist?.username && (
                  <Tooltip content={owner.username}>
                    <Avatar
                      key={owner.email}
                      size="sm"
                      radius="full"
                      classNames={{ icon: "text-foreground-400" }}
                      className="bg-foreground-200"
                    />
                  </Tooltip>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

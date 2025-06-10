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
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2 xl:col-span-1">
        <h6 className="text-default-600 text-xs mb-2">{t("shared.user")}</h6>

        <div className="p-4 flex flex-wrap items-center gap-4 bg-content1 rounded-3xl mb-2">
          <Avatar
            size="lg"
            className="rounded-large bg-foreground-200 text-primary-foreground"
            classNames={{ icon: "drop-shadow-lg" }}
          />

          <div className="flex-1">
            <h6 className="mb-2 font-semibold">{owner.userName}</h6>
            <div className="flex items-center justify-between flex-wrap gap-2">
              {owner.phoneNumber && (
                <div className="flex items-center gap-2">
                  <CopyButton
                    value={owner.phoneNumber}
                    btnFit
                    iconSize="12"
                    iconClassName="text-content4-foreground"
                  />
                  <p className="text-sm text-content2-foreground">
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
                  <p className="text-sm text-content2-foreground">
                    {owner.email}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center flex-wrap gap-2">
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
        <h6 className="text-default-600 text-xs mb-2">
          {t("expertRequests.specialist")}
        </h6>

        <div className="p-4 flex flex-wrap items-center gap-4 bg-content1 rounded-3xl mb-2">
          <Avatar
            size="lg"
            radius="full"
            className="bg-foreground-200 text-primary-foreground"
            classNames={{ icon: "drop-shadow-lg" }}
          />

          <div className="flex-1">
            <h6 className="font-semibold">{lead_specialist.userName}</h6>
            {!!lead_specialist.unit && (
              <div className="mt-2 flex items-center flex-wrap gap-2 md:gap-6 text-sm text-content2-foreground">
                {/* <div className="flex items-center gap-2">
                <Icon
                  icon="solar:user-id-linear"
                  className="text-content4-foreground min-w-[18px] h-[18px]"
                />
                <p>{t("expertRequests.responsibleSpecialist")}</p>
              </div> */}

                <p>{lead_specialist.unit?.title}</p>
              </div>
            )}
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
                      content={`${reviewer.owner.userName} - ${reviewer.unit?.title}`}
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

                {owner.userName !== lead_specialist.userName && (
                  <Tooltip content={owner.userName}>
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

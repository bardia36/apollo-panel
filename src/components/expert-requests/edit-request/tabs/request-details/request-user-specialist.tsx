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
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2 lg:col-span-1">
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
          {/* TODO: make checkbox required to send reminder message */}
          <Button
            variant="flat"
            size="sm"
            startContent={<Icon icon="mingcute:send-fill" />}
          >
            {t("expertRequests.sendReminderMessage")}
          </Button>

          <CheckboxGroup orientation="horizontal" size="sm" dir="ltr">
            <Checkbox value="sms">SMS</Checkbox>
            <Checkbox value="email">Email</Checkbox>
          </CheckboxGroup>
        </div>
      </div>

      <div className="col-span-2 lg:col-span-1">
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
            <h6 className="mb-2 font-semibold">{lead_specialist.userName}</h6>
            <div className="flex items-center flex-wrap gap-2 md:gap-6 text-sm text-content2-foreground">
              <div className="flex items-center gap-2">
                <Icon
                  icon="solar:user-id-linear"
                  className="text-content4-foreground min-w-[18px] h-[18px]"
                />
                <p>{t("expertRequests.responsibleSpecialist")}</p>
              </div>

              {/* TODO: get from backend */}
              {/* <p></p> */}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-2">
          <div>
            <p className="text-default-foreground text-xs">{unit.title}</p>
            <p className="text-content4-foreground text-xs">
              {unit.level.name}
            </p>
          </div>

          <AvatarGroup>
            {reviewers.map((reviewer) => (
              <Tooltip
                key={reviewer.owner.email}
                content={`${reviewer.owner.userName} - ${reviewer.unit.title}`}
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

          {/* TODO: get from backend when the creator is different from the lead specialist */}
          {/* <Tooltip
            content={`${} - ${}`}
          >
            <Avatar
              key={}
              size="sm"
              radius="full"
              classNames={{ icon: "text-foreground-400" }}
              className="bg-foreground-200"
            />
          </Tooltip> */}
        </div>
      </div>
    </div>
  );
}

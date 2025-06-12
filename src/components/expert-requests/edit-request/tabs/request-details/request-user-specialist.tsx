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
            <h6 className="mb-2 font-semibold">{lead_specialist.username}</h6>
            <div className="flex flex-wrap items-center gap-2 md:gap-6 text-content2-foreground text-sm">
              {/* <div className="flex items-center gap-2">
                <Icon
                  icon="solar:user-id-linear"
                  className="min-w-[18px] h-[18px] text-content4-foreground"
                />
                <p>{t("expertRequests.responsibleSpecialist")}</p>
              </div> */}

              {/* TODO: get from backend */}
              {/* <p></p> */}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-2">
          <div>
            <p className="text-default-foreground text-xs">{unit?.title}</p>
            {/* TODO: get from backend */}
            {/* <p className="text-content4-foreground text-xs">
              {unit.level.name}
            </p> */}
          </div>

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

          {/* TODO: get from backend when the owner is different from the lead specialist */}
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

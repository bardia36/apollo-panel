import { Chip } from "@heroui/react";
import { User } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import DateDisplay from "../../shared/date-display";
import { t } from "i18next";
import { ExpertRequest } from "@/types/expertRequests";
import { statusesMap } from "../constants";
import { copyToClipboard } from "@/utils/base";

// TODO: add copy to clipboard icon */
export const RenderOrderNumberCell = ({
  orderNumber,
}: {
  orderNumber: ExpertRequest["order_number"];
}) => (
  <div className="flex items-center gap-2">
    <span className="text-default-500">{orderNumber}</span>
    <Button
      isIconOnly
      variant="light"
      className="min-w-6 w-6 h-6"
      onPress={copyToClipboard(orderNumber)}
    >
      <Icon
        icon="solar:copy-linear"
        width={20}
        height={20}
        className="text-default-400"
      />
    </Button>
  </div>
);

export const RenderInspectionDataCell = ({
  inspectionData,
}: {
  inspectionData: ExpertRequest["inspection_data"];
}) => (
  <>
    <div className="text-default-foreground mb-1">
      {inspectionData.vehicle_model?.name_fa}
    </div>
    <div className="text-default-500">
      {inspectionData.vehicle_brand?.name_fa}
    </div>
  </>
);

export const RenderStatusCell = ({
  status,
}: {
  status: ExpertRequest["status"];
}) => (
  <Chip
    className={`bg-${statusesMap[status].bg} text-${statusesMap[status].text} h-8 gap-1`}
    size="sm"
    variant="flat"
    startContent={
      <Icon icon={statusesMap[status].icon} width={20} height={20} />
    }
  >
    <span className="font-semibold text-sm">{statusesMap[status].label}</span>
  </Chip>
);

export const RenderOwnerCell = ({
  owner,
}: {
  owner: ExpertRequest["owner"];
}) => (
  <User
    avatarProps={{
      radius: "md",
      src: owner.image,
      className: "bg-default-100 text-default-200",
    }}
    description={
      <div className="text-content4-foreground">{owner.phoneNumber}</div>
    }
    name={<div className="text-default-500 mb-1">{owner.userName}</div>}
  />
);

export const RenderUnitCell = ({ unit }: { unit: ExpertRequest["unit"] }) => (
  <div className="flex gap-1 text-default-foreground">
    <Icon
      icon="solar:users-group-rounded-bold"
      width={20}
      height={20}
      className="text-default-200"
    />
    {unit.title}
  </div>
);

export const RenderCreatedAtCell = ({
  createdAt,
}: {
  createdAt: ExpertRequest["createdAt"];
}) => <DateDisplay isoDate={createdAt} />;

export const RenderActionsCell = () => (
  <div className="relative flex justify-end items-center gap-2">
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly size="sm" variant="light">
          <Icon
            icon="mdi:dots-vertical"
            width={20}
            height={20}
            className="text-default-500"
          />
        </Button>
      </DropdownTrigger>

      <DropdownMenu>
        <DropdownItem key="edit">{t("shared.edit")}</DropdownItem>
        <DropdownItem key="delete">{t("shared.delete")}</DropdownItem>
      </DropdownMenu>
    </Dropdown>

    <Button
      isIconOnly
      size="sm"
      variant="solid"
      radius="full"
      className="bg-default bg-opacity-40"
    >
      <Icon icon="tabler:eye-filled" width={20} height={20} />
    </Button>
  </div>
);

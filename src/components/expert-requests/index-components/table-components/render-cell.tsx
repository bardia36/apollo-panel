import { Icon } from "@iconify/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Button,
} from "@heroui/react";
import { TwoLineDateDisplay } from "@/components/shared/date-display";
import { t } from "i18next";
import { ExpertRequestInfo } from "@/types/expert-requests";
import { statusesMap } from "../../constants";
import { Link } from "react-router-dom";
import { expertRequestsApi } from "@/apis/expert-requests";
import { useExpertRequests } from "../context/expert-requests-context";
import { exceptionHandler } from "@/apis/exception";
import CopyButton from "@/components/shared/copy-button";
import { truncateString } from "@/utils/base";

export const RenderCodeCell = ({
  code,
}: {
  code: ExpertRequestInfo["_id"];
}) => <span className="text-default-500 text-sm">{code}</span>;

export const RenderOrderNumberCell = ({
  orderNumber,
}: {
  orderNumber: ExpertRequestInfo["order_number"];
}) => (
  <div className="flex items-center gap-2">
    <span className="text-default-500 text-sm">{orderNumber}</span>
    <CopyButton
      value={orderNumber}
      size="6"
      iconSize="20"
      iconClassName="text-default-400"
    />
  </div>
);

export const RenderInspectionDataCell = ({
  inspectionData,
}: {
  inspectionData: ExpertRequestInfo["inspection_data"];
}) => (
  <>
    <div className="mb-1 text-default-foreground">
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
  status: ExpertRequestInfo["status"];
}) => {
  const statusMap = statusesMap[status];

  return (
    <Chip
      className={`bg-${statusMap.bg} text-${statusMap.text} h-8 gap-1`}
      size="sm"
      variant="flat"
      startContent={<Icon icon={statusMap.icon} width={20} height={20} />}
    >
      <span className="font-semibold text-sm">{statusMap.label}</span>
    </Chip>
  );
};

export const RenderOwnerCell = ({
  owner,
}: {
  owner: ExpertRequestInfo["owner"];
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
    name={<div className="mb-1 text-default-500">{owner.username}</div>}
  />
);

export const RenderCreatedAtCell = ({
  createdAt,
}: {
  createdAt: ExpertRequestInfo["createdAt"];
}) => <TwoLineDateDisplay isoDate={createdAt} />;

export const RenderUnitCell = ({
  unit,
}: {
  unit: ExpertRequestInfo["unit"];
}) => (
  <div className="flex gap-1 text-default-foreground">
    <Icon
      icon="solar:users-group-rounded-bold"
      width={20}
      height={20}
      className="text-default-200"
    />
    {unit?.title}
  </div>
);

// TODO: supervisor-cell,

export const RenderVinCell = ({ vin }: { vin: string }) => (
  <span className="text-default-foreground text-sm">{vin}</span>
);

export const RenderTagsCell = ({
  tags,
}: {
  tags: ExpertRequestInfo["tags"];
}) => (
  <>
    {!!tags?.length && (
      <div className="flex items-center gap-1">
        <Chip
          classNames={{
            base: "text-default-800 bg-default-100",
          }}
        >
          {truncateString(tags[0], 20)}
        </Chip>

        {tags.length > 1 && (
          <Chip
            classNames={{
              base: "text-default-800 bg-default-100",
            }}
          >
            {truncateString(tags[1], 20)}
          </Chip>
        )}

        {tags.length > 2 && (
          <Chip
            classNames={{
              base: "text-default-500 bg-default-100",
            }}
            radius="full"
          >
            +{tags.length - 1}
          </Chip>
        )}
      </div>
    )}
  </>
);

export const RenderActionsCell = ({ id }: { id: ExpertRequestInfo["_id"] }) => {
  const { refreshRequests } = useExpertRequests();

  const handleSendToArchive = async () => {
    try {
      await expertRequestsApi.deleteRequestById(id);
      await refreshRequests();
    } catch (err) {
      exceptionHandler(err);
    }
  };

  return (
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

        <DropdownMenu aria-label="Request item actions">
          <DropdownItem
            key="discard-selection"
            startContent={
              <Icon
                icon="solar:close-square-bold"
                width={18}
                height={18}
                className="text-default-600"
              />
            }
            className="hover:bg-default-200 text-default-foreground"
            onPress={() => console.log("discard")}
          >
            {t("shared.discardSelection")}
          </DropdownItem>

          <DropdownItem
            key="send-to-archive"
            startContent={
              <Icon
                icon="solar:bookmark-circle-bold"
                width={18}
                height={18}
                className="text-default-600"
              />
            }
            className="hover:bg-default-200 text-default-foreground"
            onPress={handleSendToArchive}
          >
            {t("expertRequests.sendToArchive")}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Button
        as={Link}
        to={`/expert-requests/${id}`}
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
};

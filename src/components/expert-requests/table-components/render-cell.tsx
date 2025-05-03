import { Chip } from "@heroui/chip";
import { User } from "@heroui/user";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import DateDisplay from "../../shared/date-display";
import { t } from "i18next";
import { ExpertRequest } from "@/types/expertRequests";
import { statusesMap } from "../constants";

export const RenderIdCell = ({ id }: { id: ExpertRequest["id"] }) => (
  <span className="text-default-500">{id}</span>
);

export const RenderModelCell = ({
  model,
}: {
  model: ExpertRequest["model"];
}) => (
  <>
    <div className="text-default-foreground mb-1">{model.name}</div>
    <div className="text-default-500">{model.brand}</div>
  </>
);

export const RenderStatusCell = ({
  status,
}: {
  status: ExpertRequest["status"];
}) => (
  <Chip
    className={`bg-${statusesMap[status].bg} text-${statusesMap[status].text}`}
    size="sm"
    variant="flat"
  >
    {statusesMap[status].label}
  </Chip>
);

export const RenderUserCell = ({ user }: { user: ExpertRequest["user"] }) => (
  <User
    avatarProps={{ radius: "md", src: user.image }}
    description={<div className="text-content4-foreground">{user.mobile}</div>}
    name={<div className="text-default-500 mb-1">{user.name}</div>}
  />
);

export const RenderBranchCell = ({
  branch,
}: {
  branch: ExpertRequest["branch"];
}) => (
  <div className="flex gap-1 text-default-foreground">
    <Icon
      icon="solar:users-group-rounded-bold"
      width={20}
      height={20}
      className="text-default-200"
    />
    {branch}
  </div>
);

export const RenderCreatedCell = ({
  created,
}: {
  created: ExpertRequest["created"];
}) => <DateDisplay isoDate={created} />;

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

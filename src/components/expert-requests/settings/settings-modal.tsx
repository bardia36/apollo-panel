import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Switch,
} from "@heroui/react";
import { t } from "i18next";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ReactNode, useState } from "react";
import { FieldChip } from "@/components/shared/field-chip";
import { TemplateField } from "@/types/templates";

// EditFieldRow: reusable row for edit/view mode fields
const EditFieldRow = ({
  label,
  description,
  editMode,
  viewContent,
  editContent,
  onEdit,
  onAccept,
}: {
  label: string;
  description: string;
  editMode: boolean;
  viewContent: ReactNode;
  editContent: ReactNode;
  onEdit: () => void;
  onAccept: () => void;
}) => (
  <div className="flex items-center gap-4 p-4 bg-default-100 rounded-xl">
    <div className="flex-1">
      <div className="text-foreground-700">{label}</div>
      <div className="md:block hidden text-sm text-foreground-500">
        {description}
      </div>
    </div>

    {editMode ? (
      <div className="flex items-center gap-2">
        {editContent}
        <Button
          isIconOnly
          radius="full"
          className="bg-primary text-foreground-50 shadow-lg shadow-neutral"
          onPress={onAccept}
        >
          <Icon
            icon="material-symbols:check"
            className="min-w-5"
            width={20}
            height={20}
          />
        </Button>
      </div>
    ) : (
      <Button
        variant="bordered"
        size="lg"
        radius="full"
        className="text-default-foreground min-w-[120px] justify-between px-4 font-semibold"
        startContent={
          <Icon
            icon="solar:pen-2-bold"
            width={20}
            height={20}
            className="text-default-400 min-w-5"
          />
        }
        onPress={onEdit}
      >
        {viewContent}
      </Button>
    )}
  </div>
);

// MoreInfoSection: modular section for more info fields
const MoreInfoSection = ({
  enabled,
  fields,
  label,
  description,
  onToggle,
  onToggleField,
}: {
  enabled: boolean;
  fields: TemplateField[];
  label: string;
  description: string;
  onToggle: (v: boolean) => void;
  onToggleField: (field: TemplateField) => void;
}) => (
  <div className="p-4 bg-default-100 rounded-xl">
    <div className="flex items-center gap-4 ">
      <div className="flex-1">
        <div className="text-foreground-700">{label}</div>
        <div className="text-sm text-foreground-500">{description}</div>
      </div>
      <Switch checked={enabled} onChange={(e) => onToggle(e.target.checked)} />
    </div>

    {enabled && (
      <div className="flex flex-wrap gap-2 mt-4">
        {fields.map((field) => (
          <FieldChip
            key={field._id}
            field={field}
            onClick={() => onToggleField(field)}
          />
        ))}
      </div>
    )}
  </div>
);

const REQUEST_EXPIRY_OPTIONS = [
  { label: "تا قبل از پایان روز", value: "end_of_day" },
  { label: "۲۴ ساعت", value: "24h" },
  { label: "۴۸ ساعت", value: "48h" },
  { label: "بدون انقضا", value: "no_expiry" },
];

const REQUEST_TIMEOUT_OPTIONS = [
  { label: "۵۰ ثانیه", value: "50" },
  { label: "۱۰۰ ثانیه", value: "100" },
  { label: "۱۵۰ ثانیه", value: "150" },
  { label: "۲۰۰ ثانیه", value: "200" },
];

const DEFAULT_FIELDS: TemplateField[] = [
  { _id: "1", title: "آدرس کاربر", type: "OTHER", active: true },
  { _id: "2", title: "تاریخ تولد", type: "OTHER", active: true },
  { _id: "3", title: "تلفن همراه", type: "OTHER", active: true },
  { _id: "4", title: "کد ملی", type: "OTHER", active: true },
  { _id: "5", title: "آدرس شرکت بیمه‌نامه", type: "OTHER", active: false },
];

type SettingsDropdownProps = {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  ariaLabel: string;
  className?: string;
};

const SettingsDropdown = ({
  options,
  value,
  onChange,
  ariaLabel,
  className = "",
}: SettingsDropdownProps) => (
  <Dropdown>
    <DropdownTrigger>
      <Button
        variant="faded"
        size="lg"
        className={`max-w-[110px] bg-default-50 border-default-200 text-foreground text-md justify-between shadow-sm shadow-neutral px-2 gap-2 ${className}`}
        endContent={
          <Icon
            icon="solar:alt-arrow-down-linear"
            width={20}
            height={20}
            className="text-default-400"
          />
        }
      >
        {options.find((o) => o.value === value)?.label}
      </Button>
    </DropdownTrigger>
    <DropdownMenu
      aria-label={ariaLabel}
      onAction={(key) => onChange(key as string)}
    >
      {options.map((opt) => (
        <DropdownItem key={opt.value}>{opt.label}</DropdownItem>
      ))}
    </DropdownMenu>
  </Dropdown>
);

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const SettingsModal = ({ isOpen, onClose }: Props) => {
  const [editExpiry, setEditExpiry] = useState(false);
  const [editTimeout, setEditTimeout] = useState(false);
  const [expiry, setExpiry] = useState("24h");
  const [timeout, setTimeout] = useState("50");
  const [randomImages, setRandomImages] = useState(true);
  const [moreInfoEnabled, setMoreInfoEnabled] = useState(false);
  const [fields, setFields] = useState<TemplateField[]>(DEFAULT_FIELDS);

  const handleToggleField = (field: TemplateField) => {
    setFields((prev) =>
      prev.map((f) => (f._id === field._id ? { ...f, active: !f.active } : f))
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      classNames={{ closeButton: "top-[1rem] md:top-[1.25rem] left-[1.5rem]" }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 md:pt-6">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <Icon
              icon="solar:settings-bold"
              width={20}
              height={20}
              className="text-default-foreground"
            />
            {t("expertRequests.requestsSettings")}
          </div>
        </ModalHeader>

        <ModalBody className="pb-6">
          <div className="space-y-4">
            <EditFieldRow
              label={t("expertRequests.requestExpiry")}
              description={t("expertRequests.requestExpiryDescription")}
              editMode={editExpiry}
              onEdit={() => setEditExpiry(true)}
              onAccept={() => setEditExpiry(false)}
              viewContent={
                REQUEST_EXPIRY_OPTIONS.find((o) => o.value === expiry)?.label
              }
              editContent={
                <SettingsDropdown
                  options={REQUEST_EXPIRY_OPTIONS}
                  value={expiry}
                  onChange={setExpiry}
                  ariaLabel="expiry-options"
                />
              }
            />

            <EditFieldRow
              label={t("expertRequests.photoTimeout")}
              description={t("expertRequests.photoTimeoutDescription")}
              editMode={editTimeout}
              onEdit={() => setEditTimeout(true)}
              onAccept={() => setEditTimeout(false)}
              viewContent={
                <>
                  {timeout} {t("shared.seconds")}
                </>
              }
              editContent={
                <SettingsDropdown
                  options={REQUEST_TIMEOUT_OPTIONS}
                  value={timeout}
                  onChange={setTimeout}
                  ariaLabel="timeout-options"
                />
              }
            />

            <div className="flex items-center gap-4 p-4 bg-default-100 rounded-xl">
              <div className="flex-1">
                <div className="text-foreground-700">
                  {t("expertRequests.randomImages")}
                </div>
                <div className="text-sm text-foreground-500">
                  {t("expertRequests.randomImagesDescription")}
                </div>
              </div>
              <Switch
                checked={randomImages}
                onChange={(e) => setRandomImages(e.target.checked)}
              />
            </div>

            <MoreInfoSection
              enabled={moreInfoEnabled}
              onToggle={setMoreInfoEnabled}
              fields={fields}
              onToggleField={handleToggleField}
              label={t("expertRequests.moreInfo")}
              description={t("expertRequests.moreInfoDescription")}
            />
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

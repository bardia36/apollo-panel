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
  Skeleton,
} from "@heroui/react";
import { t } from "i18next";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ReactNode, useState, useEffect } from "react";
import { FieldChip } from "@/components/shared/templates/field-chip";
import { expertRequestsApi } from "@/apis/expert-requests";
import {
  RequestsSetting,
  SettingExpirationTime,
  SettingPhotoDeadline,
} from "@/types/expert-requests";
import { TemplateField } from "@/types/templates";

const REQUEST_EXPIRY_OPTIONS = [
  {
    label: t("expertRequests.requestExpiryUntilDayEnd"),
    value: "UNTIL_DAY_END",
  },
  { label: t("expertRequests.requestExpiry24H"), value: "24H" },
  { label: t("expertRequests.requestExpiry48H"), value: "48H" },
  { label: t("expertRequests.requestExpiryUnlimited"), value: "UNLIMITED" },
];

const REQUEST_TIMEOUT_OPTIONS = [
  { label: `30 ${t("shared.seconds")}`, value: "30" },
  { label: `40 ${t("shared.seconds")}`, value: "40" },
  { label: `50 ${t("shared.seconds")}`, value: "50" },
  { label: `60 ${t("shared.seconds")}`, value: "60" },
  { label: `120 ${t("shared.seconds")}`, value: "120" },
  { label: `180 ${t("shared.seconds")}`, value: "180" },
];

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const SettingsModal = ({ isOpen, onClose }: Props) => {
  const [editExpiry, setEditExpiry] = useState(false);
  const [editTimeout, setEditTimeout] = useState(false);
  const [expiry, setExpiry] = useState<SettingExpirationTime>("24H");
  const [timeout, setTimeout] = useState<SettingPhotoDeadline>("50");
  const [randomPicture, setRandomPicture] = useState<boolean | undefined>(
    false
  );
  const [moreInfoEnabled, setMoreInfoEnabled] = useState(false);
  // static fields by default
  const [fields, setFields] = useState<RequestsSetting["more_fields"]>([
    { title: "نام کامل", type: "INPUT", active: false },
    { title: "آدرس کاربر", type: "INPUT", active: false },
    { title: "شماره موبایل", type: "INPUT", active: false },
    { title: "تاریخ تولد", type: "INPUT", active: false },
    { title: "کد ملی کاربر", type: "INPUT", active: false },
    { title: "کد پستی", type: "INPUT", active: false },
    { title: "ارزش مورد کارشناسی", type: "INPUT", active: false },
    { title: "تاریخ انقضای بیمه‌نامه قبلی", type: "INPUT", active: false },
  ]);
  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(false);
  const [originalExpiry, setOriginalExpiry] =
    useState<SettingExpirationTime>("24H");
  const [originalTimeout, setOriginalTimeout] =
    useState<SettingPhotoDeadline>("50");

  useEffect(() => {
    getSettings();
  }, [isOpen]);

  const getSettings = async () => {
    if (!isOpen) return;
    setInitLoading(true);
    expertRequestsApi
      .getRequestsSetting()
      .then((res) => {
        setExpiry(res?.expiration_time || "24H");
        setOriginalExpiry(res?.expiration_time || "24H");
        setTimeout(res?.photo_deadline || "50");
        setOriginalTimeout(res?.photo_deadline || "50");
        setRandomPicture(res?.random_picture);
        setMoreInfoEnabled(!!res?.more_fields?.length);
        setFields((prevFields) => {
          const serverFieldTitles = (res?.more_fields || []).map(
            (f) => f.title
          );
          return (prevFields || []).map((field) => ({
            ...field,
            active: serverFieldTitles.includes(field.title),
          }));
        });
      })
      .finally(() => setInitLoading(false));
  };

  const updateSetting = async (body: Partial<RequestsSetting>) => {
    setLoading(true);
    try {
      await expertRequestsApi.updateRequestsSetting({
        expiration_time: expiry,
        photo_deadline: timeout,
        random_picture: randomPicture,
        ...body,
        more_fields: prepareMoreFields(body),
      });
      await getSettings();
    } finally {
      setLoading(false);
    }
  };

  const prepareMoreFields = (body: Partial<RequestsSetting>) => {
    // Determine which fields to use - either from body or current state
    const fieldsToCheck = body.more_fields || fields || [];

    // Only send active fields, and only if there are any active ones
    const activeFields = fieldsToCheck
      .filter((field) => field.active)
      .map(({ title, type }) => ({ title, type }));

    return activeFields;
  };

  const handleAcceptExpiry = () => {
    setEditExpiry(false);
    updateSetting({ expiration_time: expiry });
  };

  const handleAcceptTimeout = () => {
    setEditTimeout(false);
    updateSetting({ photo_deadline: timeout });
  };

  const handleToggleField = (field: MoreField) => {
    setFields((prev) => {
      const updated = prev?.map((f) =>
        f.title === field.title ? { ...f, active: !f.active } : f
      );
      updateSetting({ more_fields: updated });
      return updated;
    });
  };

  const handleMoreInfoToggle = (enabled: boolean) => {
    setMoreInfoEnabled(enabled);
    if (!enabled) {
      // When disabling more info, clear the more_fields on the server
      updateSetting({ more_fields: [] });
    }
  };

  const handleRandomPicture = (val: boolean) => {
    setRandomPicture(val);
    updateSetting({ random_picture: val });
  };

  const onModalClose = () => {
    setEditExpiry(false);
    setEditTimeout(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onModalClose}
      size="xl"
      classNames={{ closeButton: "top-[1rem] md:top-[1.25rem] left-[1.5rem]" }}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
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
          {initLoading || loading ? (
            <div className="w-full space-y-4">
              <Skeleton className="h-20 rounded-xl bg-default-200" />
              <Skeleton className="h-20 rounded-xl bg-default-200" />
              <Skeleton className="h-20 rounded-xl bg-default-200" />
              <Skeleton className="h-20 rounded-xl bg-default-200" />
            </div>
          ) : (
            <div className="space-y-4">
              <EditFieldRow
                label={t("expertRequests.requestExpiry")}
                description={t("expertRequests.requestExpiryDescription")}
                editMode={editExpiry}
                onEdit={() => {
                  setOriginalExpiry(expiry);
                  setEditExpiry(true);
                }}
                onAccept={handleAcceptExpiry}
                viewContent={
                  REQUEST_EXPIRY_OPTIONS.find((o) => o.value === expiry)?.label
                }
                editContent={
                  <SettingsDropdown
                    options={REQUEST_EXPIRY_OPTIONS}
                    value={expiry}
                    ariaLabel="expiry-options"
                    onChange={(val) => setExpiry(val as SettingExpirationTime)}
                  />
                }
                showAccept={expiry !== originalExpiry}
              />

              <EditFieldRow
                label={t("expertRequests.photoTimeout")}
                description={t("expertRequests.photoTimeoutDescription")}
                editMode={editTimeout}
                onEdit={() => {
                  setOriginalTimeout(timeout);
                  setEditTimeout(true);
                }}
                onAccept={handleAcceptTimeout}
                viewContent={
                  <>
                    {timeout} {t("shared.seconds")}
                  </>
                }
                editContent={
                  <SettingsDropdown
                    options={REQUEST_TIMEOUT_OPTIONS}
                    value={timeout}
                    ariaLabel="timeout-options"
                    onChange={(val) => setTimeout(val as SettingPhotoDeadline)}
                  />
                }
                showAccept={timeout !== originalTimeout}
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
                  isSelected={randomPicture}
                  disabled={loading}
                  onChange={(e) => handleRandomPicture(e.target.checked)}
                />
              </div>

              <MoreInfoSection
                enabled={moreInfoEnabled}
                fields={fields}
                label={t("expertRequests.moreInfo")}
                description={t("expertRequests.moreInfoDescription")}
                onToggle={handleMoreInfoToggle}
                onToggleField={handleToggleField}
              />
            </div>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

// EditFieldRow: reusable row for edit/view mode fields
const EditFieldRow = ({
  label,
  description,
  editMode,
  viewContent,
  editContent,
  onEdit,
  onAccept,
  showAccept = false,
}: {
  label: string;
  description: string;
  editMode: boolean;
  viewContent: ReactNode;
  editContent: ReactNode;
  onEdit: () => void;
  onAccept: () => void;
  showAccept?: boolean;
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
        {showAccept && (
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
        )}
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

type SettingsDropdownProps = {
  options: { label: string; value: string }[];
  value: string;
  ariaLabel: string;
  className?: string;
  onChange: (value: string) => void;
};

const SettingsDropdown = ({
  options,
  value,
  ariaLabel,
  className,
  onChange,
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

type MoreField = NonNullable<RequestsSetting["more_fields"]>[number];

const convertToTemplateField = (field: MoreField): TemplateField => ({
  _id: field.title, // Using title as a unique identifier
  title: field.title,
  type: "CUSTOM",
  active: field.active,
});

const MoreInfoSection = ({
  enabled,
  fields,
  label,
  description,
  onToggle,
  onToggleField,
}: {
  enabled: boolean;
  fields: RequestsSetting["more_fields"];
  label: string;
  description: string;
  onToggle: (v: boolean) => void;
  onToggleField: (field: MoreField) => void;
}) => (
  <div className="p-4 bg-default-100 rounded-xl">
    <div className="flex items-center gap-4 ">
      <div className="flex-1">
        <div className="text-foreground-700">{label}</div>
        <div className="text-sm text-foreground-500">{description}</div>
      </div>
      <Switch
        isSelected={enabled}
        onChange={(e) => onToggle(e.target.checked)}
      />
    </div>

    {enabled && fields && (
      <div className="grid grid-cols-2 gap-2 mt-4">
        {fields.map((field) => (
          <FieldChip
            key={field.title}
            field={convertToTemplateField(field)}
            onClick={() => onToggleField(field)}
          />
        ))}
      </div>
    )}
  </div>
);

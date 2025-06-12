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
// import { FieldChip } from "@/components/shared/field-chip";
// import { TemplateField } from "@/types/templates";
import { expertRequestsApi } from "@/apis/expert-requests";
import {
  RequestsSetting,
  SettingExpirationTime,
  SettingPhotoDeadline,
} from "@/types/expert-requests";

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

// const DEFAULT_FIELDS: TemplateField[] = [
//   { _id: "1", title: "آدرس کاربر", type: "OTHER", active: true },
//   { _id: "2", title: "تاریخ تولد", type: "OTHER", active: true },
//   { _id: "3", title: "تلفن همراه", type: "OTHER", active: true },
//   { _id: "4", title: "کد ملی", type: "OTHER", active: true },
//   { _id: "5", title: "آدرس شرکت بیمه‌نامه", type: "OTHER", active: false },
// ];

// function filterValidFields(fields: TemplateField[]): {
//   title: string;
//   type: "INPUT" | "SELECT" | "CHECKBOX" | "RADIO" | "DATE" | "TIME";
// }[] {
//   return fields
//     .filter((f) =>
//       ["INPUT", "SELECT", "CHECKBOX", "RADIO", "DATE", "TIME"].includes(f.type)
//     )
//     .map((f) => ({ title: f.title, type: f.type }));
// }

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
  // const [moreInfoEnabled, setMoreInfoEnabled] = useState(false);
  // const [fields, setFields] = useState<RequestsSetting["more_fields"]>();
  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(false);

  useEffect(() => {
    getSettings();
  }, [isOpen]);

  const getSettings = async () => {
    if (!isOpen) return;
    setInitLoading(true);
    expertRequestsApi
      .getRequestsSetting()
      .then((settings) => {
        setExpiry(settings?.expiration_time || "24H");
        setTimeout(settings?.photo_deadline || "50");
        setRandomPicture(settings?.random_picture);
        // setMoreInfoEnabled(!!settings?.more_fields?.length);
        // if (settings?.more_fields) setFields(settings?.more_fields);
      })
      .finally(() => setInitLoading(false));
  };

  const updateSetting = async (overwriteBody: Partial<RequestsSetting>) => {
    setLoading(true);
    try {
      await expertRequestsApi.updateRequestsSetting({
        expiration_time: expiry,
        photo_deadline: timeout,
        random_picture: randomPicture,
        // more_fields: moreInfoEnabled ? filterValidFields(fields) : [],
        ...overwriteBody,
      });
      await getSettings();
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptExpiry = () => {
    setEditExpiry(false);
    updateSetting({ expiration_time: expiry });
  };

  const handleAcceptTimeout = () => {
    setEditTimeout(false);
    updateSetting({ photo_deadline: timeout });
  };

  const handleRandomPicture = (val: boolean) => {
    setRandomPicture(val);
    updateSetting({ random_picture: val });
  };

  // const handleToggleField = (field: TemplateField) => {
  //   setFields((prev) => {
  //     const updated = prev.map((f) =>
  //       f._id === field._id ? { ...f, active: !f.active } : f
  //     );
  //     updateSetting({ more_fields: updated });
  //     return updated;
  //   });
  // };

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
                onEdit={() => setEditExpiry(true)}
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
              />

              <EditFieldRow
                label={t("expertRequests.photoTimeout")}
                description={t("expertRequests.photoTimeoutDescription")}
                editMode={editTimeout}
                onEdit={() => setEditTimeout(true)}
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

              {/* <MoreInfoSection
                enabled={moreInfoEnabled}
                fields={fields}
                label={t("expertRequests.moreInfo")}
                description={t("expertRequests.moreInfoDescription")}
                onToggle={setMoreInfoEnabled}
                onToggleField={handleToggleField}
              /> */}
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

// MoreInfoSection: modular section for more info fields
// const MoreInfoSection = ({
//   enabled,
//   fields,
//   label,
//   description,
//   onToggle,
//   onToggleField,
// }: {
//   enabled: boolean;
//   fields: TemplateField[];
//   label: string;
//   description: string;
//   onToggle: (v: boolean) => void;
//   onToggleField: (field: TemplateField) => void;
// }) => (
//   <div className="p-4 bg-default-100 rounded-xl">
//     <div className="flex items-center gap-4 ">
//       <div className="flex-1">
//         <div className="text-foreground-700">{label}</div>
//         <div className="text-sm text-foreground-500">{description}</div>
//       </div>
//       <Switch checked={enabled} onChange={(e) => onToggle(e.target.checked)} />
//     </div>

//     {enabled && (
//       <div className="flex flex-wrap gap-2 mt-4">
//         {fields.map((field) => (
//           <FieldChip
//             key={field._id}
//             field={field}
//             onClick={() => onToggleField(field)}
//           />
//         ))}
//       </div>
//     )}
//   </div>
// );

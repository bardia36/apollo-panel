import { exceptionHandler } from "@/apis/exception";
import { expertRequestsApi } from "@/apis/expert-requests";
import {
  AppModal,
  AppModalRef,
} from "@/components/shared/app-components/app-modal";
import { Button, ButtonProps, cn } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { t } from "i18next";
import { useParams } from "react-router-dom";
import { useRef, useState } from "react";
import { ActionsHeader } from "./components/actions-header";
import { RequestCode } from "./components/request-code";
import { TemplateFields } from "@/components/shared/templates/template-fields";
import { TagInput } from "@/components/shared/tag-input";
import { TemplateField } from "@/types/templates";
import FieldsCountChip from "@/components/shared/templates/fields-count-chip";

type Props = {
  code: string;
  tags?: string[];
  fields?: TemplateField[];
  activatorVariant?: ButtonProps["variant"];
  activatorClassName?: ButtonProps["className"];
  activatorSize?: ButtonProps["size"];
  activatorIconClassName?: string;
};

export const LackOfEvidenceModal = ({
  code,
  tags = [],
  fields = [],
  activatorVariant,
  activatorClassName,
  activatorSize = "md",
  activatorIconClassName,
}: Props) => {
  const { id } = useParams();
  const modalRef = useRef<AppModalRef>(null);
  const queryClient = useQueryClient();
  const [selectedFields, setSelectedFields] = useState<TemplateField[]>(fields);
  const [selectedTags, setSelectedTags] = useState<string[]>(tags);

  const { mutate: requestEvidenceLack, isPending } = useMutation({
    mutationFn: async () =>
      expertRequestsApi.requestEvidenceLack(id as string, {
        required_fields: selectedFields.filter((field) => field.active),
        tags: selectedTags,
      }),
    onSuccess: () => {
      modalRef.current?.onClose();
      queryClient.invalidateQueries({ queryKey: ["expert-request", id] });
    },
    onError: (err) => exceptionHandler(err),
  });

  return (
    <AppModal
      ref={modalRef}
      activator={
        <Button
          variant={activatorVariant}
          className={activatorClassName}
          size={activatorSize}
        >
          <Icon
            icon="mdi:plus-circle"
            width={20}
            height={20}
            className={cn(activatorIconClassName, "min-w-5 h-5")}
          />
          {t("expertRequests.lackOfEvidence")}
        </Button>
      }
      size="xl"
      hideCloseButton={false}
    >
      <AppModal.Header>
        <ActionsHeader
          title={t("expertRequests.lackOfEvidence")}
          icon="mdi:plus-circle"
        />
      </AppModal.Header>

      <div className="flex flex-col gap-6">
        <RequestCode code={code} />

        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <h6 className="text-xs text-default-600">
              {t("expertRequests.wantedItems")}
            </h6>

            <FieldsCountChip
              activeFieldsCount={
                selectedFields.filter((field) => field.active).length
              }
            />
          </div>
          <TemplateFields
            templateFields={fields}
            onFieldsChange={setSelectedFields}
          />
        </div>

        <TagInput
          value={selectedTags}
          label={t("expertRequests.tag")}
          onChange={setSelectedTags}
        />
      </div>

      <AppModal.Footer>
        <Button
          onPress={() => modalRef.current?.onClose()}
          isLoading={isPending}
          variant="light"
          className="text-default-foreground me-2"
          startContent={
            <Icon icon="mynaui:arrow-right" className="min-w-5 h-5" />
          }
        >
          {t("shared.back")}
        </Button>

        <Button
          className="bg-foreground-900 text-default-50"
          isLoading={isPending}
          startContent={
            <Icon icon="carbon:send-filled" className="min-w-5 h-5" />
          }
          onPress={() => requestEvidenceLack()}
        >
          {t("shared.saveAndSend")}
        </Button>
      </AppModal.Footer>
    </AppModal>
  );
};

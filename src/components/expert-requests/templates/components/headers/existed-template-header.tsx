import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { t } from "i18next";
import { Template } from "@/types/templates";
import FieldsCountChip from "../fields-count-chip";
import { useTemplateFields } from "../useTemplateFields";

type ExistedTemplateDetailsHeaderProps = {
  template?: { name: Template["name"]; default: Template["default"] };
  onDeleteTemplate: () => void;
};
export const ExistedTemplateHeader = ({
  template,
  onDeleteTemplate,
}: ExistedTemplateDetailsHeaderProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { activeFieldsCount } = useTemplateFields();

  return (
    <>
      <div className="flex items-center gap-2">
        <h6 className="text-xs text-default-600">
          {t("expertRequests.templateDetails")}
        </h6>

        <h5 className="text-default-800 text-sm font-semibold me-auto">
          {template?.name}
        </h5>

        <FieldsCountChip activeFieldsCount={activeFieldsCount} />

        {!template?.default && (
          <Button
            variant="light"
            color="danger"
            className="px-2 h-8 text-xs"
            onPress={onOpen}
          >
            <Icon icon="solar:trash-bin-trash-bold" width={20} height={20} />
            {t("expertRequests.deleteTemplate")}
          </Button>
        )}
      </div>

      <DeleteConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        onDelete={onDeleteTemplate}
      />
    </>
  );
};

type DeleteConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
};
function DeleteConfirmModal({
  isOpen,
  onClose,
  onDelete,
}: DeleteConfirmModalProps) {
  return (
    <>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          hideCloseButton
          classNames={{
            backdrop: "z-[100001]",
            wrapper: "z-[100002]",
          }}
          // className="w-[615px] max-h-[90vh] my-auto"
          size="xs"
          onClose={onClose}
        >
          <ModalContent>
            {/* <ModalBody className="gap-0 overflow-y-auto pb-6"></ModalBody> */}
            <ModalBody className="px-4 pt-6 pb-4 gap-4">
              <div className="bg-danger-50 border-2 border-danger-100 rounded-full p-4 w-fit mx-auto">
                <Icon
                  icon="solar:trash-bin-trash-bold-duotone"
                  width={32}
                  height={32}
                  className="text-danger drop-shadow-lg"
                />
              </div>

              <h6 className="text-center text-default-foreground text-lg font-bold">
                {t("expertRequests.deleteTemplate")}
              </h6>

              <p className="text-center text-default-800 text-sm">
                {t("expertRequests.deleteTemplateDescription")}
              </p>
            </ModalBody>

            <ModalFooter className="justify-center px-4">
              <Button variant="light" fullWidth onPress={onClose}>
                {t("shared.cancel")}
              </Button>

              <Button
                className="bg-default-foreground text-content1"
                fullWidth
                variant="shadow"
                onPress={onDelete}
              >
                {t("shared.yesDelete")}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}

import { FC, ReactNode } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Button } from "@heroui/button";

interface TemplatesProps {
  activator: ReactNode;
}

export const Templates: FC<TemplatesProps> = ({ activator }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div onClick={onOpen} className="cursor-pointer">
        {activator}
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Templates</ModalHeader>

          <ModalBody>
            <p>Select a template to use for your expert request.</p>
            <div className="grid grid-cols-1 gap-4 mt-4">
              <div className="border border-default-200 rounded-lg p-4 hover:bg-default-100 cursor-pointer">
                Template 1
              </div>
              <div className="border border-default-200 rounded-lg p-4 hover:bg-default-100 cursor-pointer">
                Template 2
              </div>
              <div className="border border-default-200 rounded-lg p-4 hover:bg-default-100 cursor-pointer">
                Template 3
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" onPress={onClose}>
              Apply Template
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

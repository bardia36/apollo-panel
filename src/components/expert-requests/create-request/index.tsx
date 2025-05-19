import {
  cloneElement,
  FC,
  isValidElement,
  MouseEvent,
  ReactNode,
  useCallback,
} from "react";
import { Modal, ModalContent, ModalBody, useDisclosure } from "@heroui/react";
import StepsWrapper from "./steps-wrapper.tsx";
import { useBreakpoint } from "@/hook/useBreakpoint";
import { CreateRequestProvider } from "./context/create-request-context";

type Props = {
  activator: ReactNode;
};

export const CreateRequestModal: FC<Props> = ({ activator }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isMdAndUp } = useBreakpoint();

  const handleModalClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleActivatorClick = (e: MouseEvent<HTMLElement>) => {
    if (isValidElement(activator) && activator.props.onClick) {
      activator.props.onClick(e);
    }
    onOpen();
  };

  const activatorWithProps = isValidElement(activator) ? (
    cloneElement(activator, {
      ...(typeof activator.type === "string" &&
      activator.type.toLowerCase() === "button"
        ? { onPress: handleActivatorClick }
        : { onClick: handleActivatorClick }),
    })
  ) : (
    <span onClick={onOpen}>{activator}</span>
  );

  return (
    <>
      {activatorWithProps}

      {isOpen && (
        <Modal
          isOpen={isOpen}
          backdrop="blur"
          hideCloseButton={isMdAndUp ? true : false}
          isDismissable={false}
          className="xl:min-w-[1140px] md:max-h-[80vh] my-auto"
          size={isMdAndUp ? "5xl" : "full"}
          onClose={handleModalClose}
        >
          <ModalContent>
            <ModalBody className="p-4 overflow-y-auto">
              <CreateRequestProvider>
                <StepsWrapper onCloseModal={handleModalClose} />
              </CreateRequestProvider>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

import {
  cloneElement,
  FC,
  isValidElement,
  MouseEvent,
  ReactNode,
  useCallback,
} from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
  ModalProps,
  cn,
} from "@heroui/react";
import { useBreakpoint } from "@/hooks/useBreakpoint";

type Props = {
  activator: ReactNode;
  children: ReactNode;
  size?: ModalProps["size"];
  className?: string;
  isDismissable?: boolean;
  hideCloseButton?: boolean;
};

export const AppModal: FC<Props> = ({
  activator,
  children,
  size,
  className,
  isDismissable,
  hideCloseButton,
}) => {
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
          hideCloseButton={(hideCloseButton ?? isMdAndUp) ? true : false}
          isDismissable={isDismissable ?? false}
          className={cn(className, "my-auto")}
          size={isMdAndUp ? size : "full"}
          onClose={handleModalClose}
        >
          <ModalContent>
            <ModalBody className="p-4 overflow-y-auto">{children}</ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

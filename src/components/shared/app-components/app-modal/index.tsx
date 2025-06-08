import {
  cloneElement,
  isValidElement,
  MouseEvent,
  ReactNode,
  useCallback,
  useImperativeHandle,
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";
import {
  Modal,
  ModalContent,
  useDisclosure,
  ModalProps,
  cn,
  ModalHeader,
  ModalFooter,
} from "@heroui/react";
import { useBreakpoint } from "@/hooks/useBreakpoint";

export type AppModalRef = {
  onClose: () => void;
  onOpen: () => void;
  isOpen: boolean;
};

type AppModalHeaderProps = {
  children: ReactNode;
  className?: string;
};

const AppModalHeader = ({ children, className }: AppModalHeaderProps) => {
  return (
    <ModalHeader className={cn("flex items-center gap-2 p-0", className)}>
      {children}
    </ModalHeader>
  );
};

type AppModalFooterProps = {
  children: ReactNode;
  className?: string;
};

const AppModalFooter = ({ children, className }: AppModalFooterProps) => {
  return (
    <ModalFooter className={cn("pt-4 px-0 pb-0", className)}>
      {children}
    </ModalFooter>
  );
};

type AppModalProps = {
  activator?: ReactNode;
  children: ReactNode;
  size?: ModalProps["size"];
  className?: string;
  classNames?: ModalProps["classNames"];
  isDismissable?: boolean;
  hideCloseButton?: boolean;
};

interface AppModalComponent
  extends ForwardRefExoticComponent<
    AppModalProps & RefAttributes<AppModalRef>
  > {
  Header: typeof AppModalHeader;
  Footer: typeof AppModalFooter;
}

const AppModalBase = forwardRef<AppModalRef, AppModalProps>(
  (
    {
      activator,
      children,
      size,
      className,
      classNames,
      isDismissable,
      hideCloseButton,
    },
    ref
  ) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isMdAndUp } = useBreakpoint();

    useImperativeHandle(ref, () => ({
      isOpen,
      onOpen,
      onClose,
    }));

    const handleModalOpen = useCallback(() => {
      onOpen();
    }, [onOpen]);

    const handleModalClose = useCallback(() => {
      onClose();
    }, [onClose]);

    const handleActivatorClick = (e: MouseEvent<HTMLElement>) => {
      if (isValidElement(activator) && activator.props.onClick)
        activator.props.onClick(e);
      handleModalOpen();
    };

    const activatorWithProps = activator ? (
      isValidElement(activator) ? (
        cloneElement(activator, {
          ...(typeof activator.type === "string" &&
          activator.type.toLowerCase() === "button"
            ? { onPress: handleActivatorClick }
            : { onClick: handleActivatorClick }),
        })
      ) : (
        <span onClick={handleModalOpen}>{activator}</span>
      )
    ) : null;

    return (
      <>
        {activatorWithProps}

        {isOpen && (
          <Modal
            isOpen={isOpen}
            backdrop="blur"
            hideCloseButton={(hideCloseButton ?? isMdAndUp) ? true : false}
            isDismissable={isDismissable ?? false}
            classNames={{
              ...classNames,
              closeButton: `${classNames?.closeButton} ${"top-4 md:top-6 left-4 md:left-6"}`,
            }}
            className={cn(className, "my-auto")}
            size={isMdAndUp ? size : "full"}
            onClose={handleModalClose}
          >
            <ModalContent className="gap-6 p-4 md:p-6">{children}</ModalContent>
          </Modal>
        )}
      </>
    );
  }
);

export const AppModal = AppModalBase as AppModalComponent;
AppModal.Header = AppModalHeader;
AppModal.Footer = AppModalFooter;

import { Button, Chip } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { cn } from "@heroui/react";
import { TemplateField } from "@/types/templates";

type FieldChipProps = {
  field: TemplateField;
  className?: string;
  readonly?: boolean;
  onClick?: () => void;
};
export const FieldChip = ({
  field,
  className,
  readonly = false,
  onClick,
}: FieldChipProps) => {
  return (
    <Button
      variant="light"
      disableAnimation={readonly}
      disableRipple={readonly}
      className={cn(
        "p-0 w-fit h-fit min-w-fit",
        className,
        readonly && "cursor-default"
      )}
      onPress={() => !readonly && onClick?.()}
    >
      <Chip
        isDisabled={!field.active}
        classNames={{
          base: "text-default-foreground bg-default bg-opacity-40 min-h-7 h-auto",
          content: "flex items-center py-1",
        }}
      >
        <Icon
          icon={field.active ? "bi:check" : "clarity:minus-line"}
          width={20}
          height={20}
          className="min-w-5 min-h-5"
        />
        <span className="text-xs ms-1 text-wrap">{field.title}</span>
      </Chip>
    </Button>
  );
};

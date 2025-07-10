import { Button, Chip } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { t } from "i18next";
import { useBreakpoint } from "@/hooks/useBreakpoint";

type FloatingActionsProps = {
  selectedCount: number;
  onDownload?: () => void;
  onSendAgainRequest?: () => void;
};

export default function FloatingActions({
  selectedCount,
  onDownload,
  onSendAgainRequest,
}: FloatingActionsProps) {
  const { isMdAndUp } = useBreakpoint();

  if (!selectedCount) return null;

  return (
    <div className="bg-default-50 p-4 md:px-5 md:py-4 flex justify-between items-center flex-wrap gap-2 rounded-full md:gap-16 shadow-2xl shadow-neutral absolute start-4 end-4 md:start-auto md:end-10 bottom-4 z-[12]">
      <Chip
        variant="light"
        size={isMdAndUp ? "lg" : "md"}
        radius="full"
        className="font-semibold"
      >
        {selectedCount} {t("shared.selectedItem")}
      </Chip>

      <div className="flex gap-2">
        <Button
          variant="light"
          size="sm"
          radius="full"
          isIconOnly={isMdAndUp ? false : true}
          className="text-xs text-default-foreground"
          startContent={
            <Icon
              icon="solar:download-minimalistic-outline"
              className="min-w-5 h-5"
            />
          }
          onPress={onDownload}
        >
          <span className="hidden md:block">{t("shared.download")}</span>
        </Button>

        <Button
          variant="shadow"
          size="sm"
          color="primary"
          radius="full"
          className="text-xs"
          onPress={onSendAgainRequest}
        >
          {t("shared.sendAgainRequest")}
        </Button>
      </div>
    </div>
  );
}

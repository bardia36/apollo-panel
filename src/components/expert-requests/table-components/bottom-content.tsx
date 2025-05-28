import { useCallback } from "react";
import { Pagination } from "@heroui/react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { t } from "i18next";
import { ExpertRequestInfo } from "@/types/expert-requests";

type BottomContentProps = {
  page: number;
  selectedKeys: Set<string> | string;
  filteredItems: ExpertRequestInfo[];
  requests: { totalPage: number; hasNextPage: boolean; hasPrevPage: boolean };
  setPage: (value: number) => void;
};

export const BottomContent = ({
  page,
  selectedKeys,
  filteredItems,
  requests,
  setPage,
}: BottomContentProps) => {
  const onNextPage = useCallback(() => {
    if (requests && page < requests.totalPage) setPage(page + 1);
  }, [page, requests.totalPage]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) setPage(page - 1);
  }, [page]);

  return (
    <div className="py-2 px-2 flex justify-between items-center">
      <span className="w-[30%] text-small text-default-400">
        {selectedKeys === "all"
          ? t("shared.allItemsSelected")
          : t("shared.selectedItemsCount", {
              selectedItems:
                selectedKeys instanceof Set ? selectedKeys.size : 0,
              allItems: filteredItems.length,
            })}
      </span>

      <Pagination
        isCompact
        showControls
        page={page}
        total={requests.totalPage}
        isDisabled={requests.totalPage <= 1}
        classNames={{
          cursor: "bg-content1-foreground text-content1",
          prev: "rotate-180 rounded-s-none !rounded-e-lg",
          chevronNext: "rotate-0",
        }}
        onChange={setPage}
      />

      <div className="hidden md:flex w-[30%] justify-end gap-[0.625rem]">
        <Button
          isDisabled={!requests.hasPrevPage}
          size="sm"
          isIconOnly
          variant="flat"
          onPress={onPreviousPage}
        >
          <Icon icon="mynaui:chevron-right" />
        </Button>

        <Button
          isDisabled={!requests.hasNextPage}
          size="sm"
          variant="flat"
          endContent={<Icon icon="mynaui:chevron-left" />}
          onPress={onNextPage}
        >
          {t("shared.nextPage")}
        </Button>
      </div>
    </div>
  );
};

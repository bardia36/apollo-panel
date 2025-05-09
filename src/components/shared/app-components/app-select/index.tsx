import { useEffect, useState, useCallback } from "react";
import { Select, SelectItem } from "@heroui/react";
import { useInfiniteScroll } from "@heroui/use-infinite-scroll";

interface AppSelectProps {
  label: string;
  placeholder: string;
  errorMessage?: string;
  isInvalid?: boolean;
  value?: string;
  itemKey: string;
  itemLabel: string;
  limit?: number;
  classNames?: {
    trigger?: string;
    label?: string;
  };
  labelPlacement?: "inside" | "outside";
  onChange: (value: string) => void;
  fetchData: (params: { page: number; limit: number }) => Promise<any>;
}

export const AppSelect = ({
  label,
  placeholder,
  errorMessage,
  isInvalid,
  value,
  itemKey,
  itemLabel,
  limit = 20,
  classNames,
  labelPlacement = "outside",
  onChange,
  fetchData,
}: AppSelectProps) => {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(async () => {
    if (!hasMore || isLoading) return;

    setIsLoading(true);
    try {
      const page = Math.floor(items.length / limit) + 1;
      const response = await fetchData({
        page,
        limit,
      });

      const newItems = response.items || [];
      setItems((prev) => [...prev, ...newItems]);
      setHasMore(newItems.length === limit);
    } catch (error) {
      console.error("Error loading select data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchData, items.length, limit, hasMore, isLoading]);

  const [scrollRef] = useInfiniteScroll({
    hasMore,
    shouldUseLoader: true,
    isEnabled: !isLoading,
    onLoadMore: loadMore,
  });

  useEffect(() => {
    // Initial load
    const initialLoad = async () => {
      setIsLoading(true);
      try {
        const response = await fetchData({
          page: 1,
          limit,
        });

        setItems(response.items || []);
        setHasMore((response.items || []).length === limit);
      } catch (error) {
        console.error("Error loading initial select data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initialLoad();
  }, [fetchData, limit]);

  const handleSelectionChange = (selectedValue: string) => {
    onChange(selectedValue);
  };

  return (
    <Select
      label={label}
      labelPlacement={labelPlacement}
      placeholder={placeholder}
      errorMessage={errorMessage}
      isInvalid={isInvalid}
      value={value}
      hideEmptyContent
      classNames={classNames}
      onSelectionChange={(value) => handleSelectionChange(value as string)}
      scrollRef={scrollRef}
      isLoading={isLoading}
    >
      {items.map((item) => (
        <SelectItem key={item[itemKey]}>{item[itemLabel]}</SelectItem>
      ))}
    </Select>
  );
};

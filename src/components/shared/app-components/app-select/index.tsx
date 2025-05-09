import { useEffect, useState, useCallback } from "react";
import { Select, SelectItem } from "@heroui/react";
import { useInfiniteScroll } from "@heroui/use-infinite-scroll";

interface AppSelectProps<T> {
  label: string;
  placeholder: string;
  errorMessage?: string;
  isInvalid?: boolean;
  value?: string;
  itemKey?: keyof T & string;
  itemLabel?: keyof T & string;
  limit?: number;
  classNames?: {
    trigger?: string;
    label?: string;
  };
  labelPlacement?: "inside" | "outside";
  onChange: (value: string) => void;
  onItemSelect?: (item: T) => void;
  fetchData: (params: {
    page: number;
    limit: number;
  }) => Promise<{ items: T[] }>;
}

export function AppSelect<T>({
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
  onItemSelect,
  fetchData,
}: AppSelectProps<T>) {
  const [items, setItems] = useState<T[]>([]);
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

    if (onItemSelect) {
      // Extract the actual value from the Set-like structure if needed
      const actualValue =
        typeof selectedValue === "object" && selectedValue !== null
          ? Array.from(selectedValue as any)[0] // Extract first value from Set-like object
          : selectedValue;

      const selectedItem = items.find(
        (item) =>
          item && itemKey && String(item[itemKey as keyof T]) === actualValue
      );

      if (selectedItem) onItemSelect(selectedItem);
    }
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
        <SelectItem key={String(item[itemKey as keyof T])}>
          {String(item[itemLabel as keyof T])}
        </SelectItem>
      ))}
    </Select>
  );
}

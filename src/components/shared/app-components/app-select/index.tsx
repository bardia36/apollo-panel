import { useEffect, useState, useCallback } from "react";
import { Select, SelectItem } from "@heroui/react";
import { useInfiniteScroll } from "@heroui/use-infinite-scroll";
import { FieldError } from "react-hook-form";

interface AppSelectProps<T> {
  label: string;
  placeholder: string;
  errorMessage?: string;
  isInvalid?: boolean;
  error?: FieldError;
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
  error,
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

  // Handle error state properly
  const actualIsInvalid = error ? true : isInvalid;
  const actualErrorMessage = error?.message || errorMessage;

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

  const handleSelectionChange = (selectedValue: any) => {
    // Extract the key from the selection object
    let key: string;

    if (typeof selectedValue === "object" && selectedValue !== null) {
      // If it's an object like {anchorKey: "...", currentKey: "..."}
      if (selectedValue.currentKey) {
        key = selectedValue.currentKey;
      } else if (selectedValue.anchorKey) {
        key = selectedValue.anchorKey;
      } else {
        // If it's a Set-like object, extract the first value
        key = Array.from(selectedValue)[0] as string;
      }
    } else {
      // If it's already a string
      key = selectedValue;
    }

    // Pass only the key to the onChange handler
    onChange(key);

    if (onItemSelect && key) {
      const selectedItem = items.find(
        (item) => item && itemKey && String(item[itemKey as keyof T]) === key
      );

      if (selectedItem) onItemSelect(selectedItem);
    }
  };

  return (
    <Select
      label={label}
      labelPlacement={labelPlacement}
      placeholder={placeholder}
      errorMessage={actualErrorMessage}
      isInvalid={actualIsInvalid}
      value={value}
      hideEmptyContent
      classNames={{
        ...classNames,
        trigger: `${actualIsInvalid ? "border-danger" : ""} ${classNames?.trigger || ""}`,
        label: `${labelPlacement === "outside" ? "top-5" : ""} ${classNames?.label || ""}`,
        base: `${labelPlacement === "outside" ? "gap-1" : ""}`,
      }}
      onSelectionChange={(value) => handleSelectionChange(value)}
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

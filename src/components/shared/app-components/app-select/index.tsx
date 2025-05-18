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
  selectFirstItem?: boolean;
  defaultSelection?: {
    key: string;
    label: string;
  };
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
  selectFirstItem = false,
  defaultSelection,
}: AppSelectProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedValue, setSelectedValue] = useState<string | undefined>(value);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Handle error state properly
  const actualIsInvalid = error ? true : isInvalid;
  const actualErrorMessage = error?.message || errorMessage;

  // Update selectedValue when value prop changes
  useEffect(() => {
    if (!isInitialLoad) setSelectedValue(value);
  }, [value, isInitialLoad]);

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

  const handleSelectionChange = useCallback(
    (selectedValue: any) => {
      // Extract the key from the selection object
      let key: string;

      if (typeof selectedValue === "object" && selectedValue !== null) {
        // If it's an object like {anchorKey: "...", currentKey: "..."}
        if (selectedValue.currentKey) key = selectedValue.currentKey;
        else if (selectedValue.anchorKey) key = selectedValue.anchorKey;
        else {
          // If it's a Set-like object, extract the first value
          key = Array.from(selectedValue)[0] as string;
        }
      } else {
        // If it's already a string
        key = selectedValue;
      }

      setSelectedValue(key);
      onChange(key);

      if (onItemSelect && key) {
        const selectedItem = items.find(
          (item) => item && itemKey && String(item[itemKey as keyof T]) === key
        );

        if (selectedItem) onItemSelect(selectedItem);
      }
    },
    [items, itemKey, onChange, onItemSelect]
  );

  // Initial load effect
  useEffect(() => {
    let mounted = true;

    const initialLoad = async () => {
      if (!mounted) return;

      setIsLoading(true);
      try {
        const response = await fetchData({
          page: 1,
          limit,
        });

        let newItems = response.items || [];

        if (mounted) {
          // Handle default selection or first item selection
          if (!selectedValue) {
            if (defaultSelection) {
              newItems = [defaultSelection as T, ...newItems];
              handleSelectionChange(defaultSelection.key);
              onChange(defaultSelection.key);
              onItemSelect?.(defaultSelection as T);
            } else if (selectFirstItem && newItems.length > 0) {
              const firstItem = newItems[0];
              const firstItemKey = String(firstItem[itemKey as keyof T]);
              handleSelectionChange(firstItemKey);
              onChange(firstItemKey);
              onItemSelect?.(firstItem as T);
            }
          }

          setItems(newItems);
          setHasMore(newItems.length === limit);
          setIsInitialLoad(false);
        }
      } catch (error) {
        console.error("Error loading initial select data:", error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initialLoad();

    return () => {
      mounted = false;
    };
  }, []); // Empty dependency array since this should only run once

  return (
    <Select
      label={label}
      labelPlacement={labelPlacement}
      placeholder={placeholder}
      errorMessage={actualErrorMessage}
      isInvalid={actualIsInvalid}
      value={selectedValue}
      selectedKeys={selectedValue ? new Set([selectedValue]) : new Set()}
      hideEmptyContent
      classNames={{
        ...classNames,
        trigger: `${actualIsInvalid ? "border-danger" : ""} ${classNames?.trigger || ""}`,
        label: `${labelPlacement === "outside" ? "top-5" : ""} ${classNames?.label || ""}`,
        base: `${labelPlacement === "outside" ? "gap-1" : ""}`,
      }}
      onSelectionChange={handleSelectionChange}
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

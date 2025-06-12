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
    if (!isInitialLoad && value !== selectedValue) {
      setSelectedValue(value);
    }
  }, [value, isInitialLoad, selectedValue]);

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
      // Only update if new items are actually added
      if (newItems.length > 0) {
        setItems((prev) => {
          // Prevent duplicate items by key
          const prevKeys = new Set(
            prev.map((item) =>
              itemKey ? String(item[itemKey as keyof T]) : ""
            )
          );
          const filteredNewItems = newItems.filter((item) => {
            const key = itemKey ? String(item[itemKey as keyof T]) : "";
            return !prevKeys.has(key);
          });
          if (filteredNewItems.length === 0) return prev;
          return [...prev, ...filteredNewItems];
        });
      }
      setHasMore(newItems.length === limit);
    } catch (error) {
      console.error("Error loading select data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchData, items, limit, hasMore, isLoading, itemKey]);

  const [scrollRef] = useInfiniteScroll({
    hasMore,
    shouldUseLoader: true,
    isEnabled: !isLoading,
    onLoadMore: loadMore,
  });

  const handleSelectionChange = useCallback(
    (selected: any) => {
      // Extract the key from the selection object
      let key: string;

      if (typeof selected === "object" && selected !== null) {
        if (selected.currentKey) key = selected.currentKey;
        else if (selected.anchorKey) key = selected.anchorKey;
        else {
          key = Array.from(selected)[0] as string;
        }
      } else {
        key = selected;
      }

      if (key !== selectedValue) {
        setSelectedValue(key);
      }
      onChange(key);

      if (onItemSelect && key) {
        const selectedItem = items.find(
          (item) => item && itemKey && String(item[itemKey as keyof T]) === key
        );
        if (selectedItem) onItemSelect(selectedItem);
      }
    },
    [items, itemKey, onChange, onItemSelect, selectedValue]
  );

  useEffect(() => {
    const abortController = new AbortController();
    let mounted = true;

    const initialLoad = async () => {
      if (!mounted) return;

      setIsLoading(true);
      try {
        // Only pass signal if fetchData supports it
        const fetchParams: any = { page: 1, limit };
        if ("signal" in fetchData) {
          fetchParams.signal = abortController.signal;
        }
        const response = await fetchData(fetchParams);

        let newItems = response.items || [];

        if (mounted) {
          setItems((prev) => {
            if (
              prev.length === newItems.length &&
              prev.every((item, idx) => item === newItems[idx])
            ) {
              return prev;
            }
            return newItems;
          });
          setHasMore(newItems.length === limit);
          setIsInitialLoad(false);

          // Handle default selection or first item selection
          if (!selectedValue) {
            if (defaultSelection) {
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
        }
      } catch (error: any) {
        if (error.name !== "AbortError") {
          console.error("Error loading initial select data:", error);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initialLoad();

    return () => {
      mounted = false;
      abortController.abort();
    };
  }, []);

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

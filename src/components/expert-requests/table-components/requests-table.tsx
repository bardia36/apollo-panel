// modules
import { useCallback, useMemo, useState } from "react";
import { t } from "i18next";
// components
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import {
  RenderOrderNumberCell,
  RenderInspectionDataCell,
  RenderStatusCell,
  RenderOwnerCell,
  RenderUnitCell,
  RenderCreatedAtCell,
  RenderActionsCell,
} from "./render-cell";

// other
import {
  ExpertRequestInfo,
  ExpertRequestResponse,
} from "@/types/expert-requests";
import { AddOrReplaceKey } from "@/utils/base";
import { TopContent } from "./top-content";
import { BottomContent } from "./bottom-content";
import { columns, statusOptions } from "../constants";
import { Key } from "@react-types/shared";

type Props = {
  loading: boolean;
  requests: ExpertRequestResponse;
};

// TODO:
// 1. Add archived requests needs to the table
// 2. Change Table content by changing table-type-tabs component
// 3. Check filters and sort with backend
export default function RequestsTable({ requests, loading }: Props) {
  // states -
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Set<string> | string>(
    new Set([])
  );
  const [visibleColumns, setVisibleColumns] = useState<string | Key[]>("all");
  const [statusFilter, setStatusFilter] = useState<string | Key[]>("all");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDescriptor, setSortDescriptor] = useState<{
    column: keyof ExpertRequestInfo;
    direction: "ascending" | "descending";
  }>({
    column: "order_number",
    direction: "ascending",
  });
  // - states

  // variables -
  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredRequests = [...requests.docs];

    if (hasSearchFilter) {
      filteredRequests = filteredRequests.filter((request) =>
        request.inspection_data.vehicle_model?.name_en
          .toLowerCase()
          .includes(filterValue.toLowerCase())
      );
    }

    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredRequests = filteredRequests.filter((request) =>
        Array.from(statusFilter).includes(request.status.toLowerCase())
      );
    }

    return filteredRequests;
  }, [requests, filterValue, statusFilter]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    if (items) {
      return [...items].sort((a, b) => {
        const first = a[sortDescriptor.column];
        const second = b[sortDescriptor.column];
        const cmp =
          first && second ? (first < second ? -1 : first > second ? 1 : 0) : 0;

        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      });
    }
  }, [sortDescriptor, items]);
  // - variables

  // top content -
  const onRowsPerPageChange = useCallback((perPage: number) => {
    setRowsPerPage(perPage);
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else setFilterValue("");
  }, []);

  // const onClear = useCallback(() => {
  //   setFilterValue("");
  //   setPage(1);
  // }, []);

  const onSendToArchive = () => {
    // TODO: Send request to backend
    console.log(selectedKeys);
  };

  const topContentWrapper = useMemo(() => {
    return (
      <>
        <TopContent
          filterValue={filterValue}
          statusFilter={statusFilter}
          visibleColumns={visibleColumns}
          columns={columns}
          statusOptions={statusOptions}
          requestDocs={requests.docs}
          rowsPerPage={rowsPerPage}
          onSearchChange={setFilterValue}
          setStatusFilter={setStatusFilter}
          setVisibleColumns={setVisibleColumns}
          onRowsPerPageChange={setRowsPerPage}
          setSelectedKeys={setSelectedKeys}
          onSendToArchive={onSendToArchive}
        />
      </>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    requests.docs.length,
    onSearchChange,
    hasSearchFilter,
  ]);
  // - top content

  // bottom content -
  const bottomContentWrapper = useMemo(() => {
    return (
      <>
        <BottomContent
          page={page}
          setPage={setPage}
          selectedKeys={selectedKeys}
          filteredItems={filteredItems}
          requests={requests}
        />
      </>
    );
  }, [selectedKeys, items.length, page, requests.totalPage, hasSearchFilter]);
  // - bottom content

  // table data -
  const renderCell = useCallback(
    (
      request: ExpertRequestInfo,
      columnKey: keyof AddOrReplaceKey<ExpertRequestInfo, "actions", string>
    ) => {
      let cellValue: React.ReactNode;
      if (columnKey === "actions") cellValue = "actions";
      else cellValue = request[columnKey] as React.ReactNode;

      switch (columnKey) {
        case "order_number":
          return (
            <>
              {request.order_number && (
                <RenderOrderNumberCell orderNumber={request.order_number} />
              )}
            </>
          );

        case "inspection_data":
          return (
            <>
              {request.inspection_data && (
                <RenderInspectionDataCell
                  inspectionData={request.inspection_data}
                />
              )}
            </>
          );

        case "status":
          return <RenderStatusCell status={request.status} />;

        case "owner":
          return <RenderOwnerCell owner={request.owner} />;

        case "unit":
          return (
            <>{!!request.unit && <RenderUnitCell unit={request.unit} />}</>
          );

        case "createdAt":
          return <RenderCreatedAtCell createdAt={request.createdAt} />;

        case "actions":
          return <RenderActionsCell />;

        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <Table
      isHeaderSticky
      aria-label="Expert Requests Table"
      selectionMode="multiple"
      topContent={topContentWrapper}
      bottomContent={bottomContentWrapper}
      selectedKeys={selectedKeys}
      sortDescriptor={sortDescriptor}
      onSelectionChange={(keys) => setSelectedKeys(keys as Set<string>)}
      onSortChange={(descriptor) =>
        setSortDescriptor({
          column: descriptor.column as keyof ExpertRequestInfo,
          direction: descriptor.direction,
        })
      }
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody
        isLoading={loading}
        emptyContent={t("expertRequests.noRequestFound")}
        items={sortedItems}
      >
        {(item) => (
          <TableRow key={`${item.order_number} - ${item.createdAt}`}>
            {(columnKey) => (
              <TableCell>
                {renderCell(item, columnKey as keyof ExpertRequestInfo)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
  // - table data
}

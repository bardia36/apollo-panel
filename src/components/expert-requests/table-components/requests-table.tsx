// modules
import { useCallback, useEffect, useMemo, useState } from "react";
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
import { ExpertRequest, ExpertRequestResponse } from "@/types/expertRequests";
import { AddOrReplaceKey } from "@/utils/base";
import { expertRequestsApi } from "@/services/api/expert-requests";
import { exceptionHandler } from "@/services/api/exception";
import { TopContent } from "./top-content";
import { BottomContent } from "./bottom-content";
import { columns, statusOptions } from "../constants";
import { Key } from "@react-types/shared";

// TODO:
// 1. Add archived requests needs to the table
// 2. Change Table content by changing table-type-tabs component
// 3. Check filters and sort with backend
export default function RequestsTable() {
  // states -
  const [requests, setRequests] = useState<ExpertRequestResponse>({
    docs: [],
    hasNextPage: false,
    hasPrevPage: false,
    limit: 10,
    page: 1,
    totalDocs: 0,
    totalPage: 1,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Set<string> | string>(
    new Set([])
  );
  const [visibleColumns, setVisibleColumns] = useState<string | Key[]>("all");
  const [statusFilter, setStatusFilter] = useState<string | Key[]>("all");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState<{
    column: keyof ExpertRequest;
    direction: "ascending" | "descending";
  }>({
    column: "order_number",
    direction: "ascending",
  });
  // - states

  useEffect(() => {
    getRequests();
  }, []);

  async function getRequests() {
    setLoading(true);
    try {
      const res = await expertRequestsApi.getRequests({
        inspection_format: "PRE_INSURANCE_BODY_INSPECTION",
      });
      setRequests(res);
    } catch (err) {
      exceptionHandler(err);
    } finally {
      setLoading(false);
    }
  }

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
      request: ExpertRequest,
      columnKey: keyof AddOrReplaceKey<ExpertRequest, "actions", string>
    ) => {
      let cellValue: React.ReactNode;
      if (columnKey === "actions") cellValue = "actions";
      else cellValue = request[columnKey] as React.ReactNode;

      switch (columnKey) {
        case "order_number":
          return <RenderOrderNumberCell orderNumber={request.order_number} />;

        case "inspection_data":
          return (
            <RenderInspectionDataCell
              inspectionData={request.inspection_data}
            />
          );

        case "status":
          return <RenderStatusCell status={request.status} />;

        case "owner":
          return <RenderOwnerCell owner={request.owner} />;

        case "unit":
          return <RenderUnitCell unit={request.unit} />;

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
          column: descriptor.column as keyof ExpertRequest,
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
          <TableRow key={item._id}>
            {(columnKey) => (
              <TableCell>
                {renderCell(item, columnKey as keyof ExpertRequest)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
  // - table data
}

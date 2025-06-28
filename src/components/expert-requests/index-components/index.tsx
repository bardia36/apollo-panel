import {
  useCallback,
  useMemo,
  useState,
  useEffect,
  lazy,
  Suspense,
  Key as ReactKey,
} from "react";
import { t } from "i18next";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import { Key, SortDescriptor } from "@react-types/shared";
import {
  RenderCodeCell,
  RenderOrderNumberCell,
  RenderVehicleModelCell,
  RenderStatusCell,
  RenderOwnerCell,
  RenderLeadSpecialistCell,
  RenderCreatedAtCell,
  RenderActionsCell,
  RenderVinCell,
  RenderTagsCell,
} from "./table-components/render-cell";
import {
  ExpertRequestsProvider,
  useExpertRequests,
} from "./context/expert-requests-context";
import { ExpertRequestInfo } from "@/types/expert-requests";
import { AddOrReplaceKey } from "@/utils/base";
import { columns, statusOptions } from "../constants";

import { TopContent } from "./table-components/top-content";
import { BottomContent } from "./table-components/bottom-content";
import Loading from "@/components/shared/loading";
const TitleActions = lazy(() => import("./table-components/title-actions"));
const TableTypeTabs = lazy(() => import("./table-components/table-type-tabs"));

export type TableTab = "current" | "archive";

// TODO:
// Add archived requests needs to the table
function ExpertRequestsContent() {
  const [activeTab, setActiveTab] = useState<TableTab>("current");
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Set<string> | string>(
    new Set([])
  );
  const [visibleColumns, setVisibleColumns] = useState<string | Key[]>([
    "order_number",
    "inspection_data",
    "status",
    "owner",
    "lead_specialist",
    "createdAt",
    "actions",
  ]);
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

  const { requests, loading, refreshRequests } = useExpertRequests();

  const handlePageChange = useCallback(
    (newPage: number) => {
      setPage(newPage);
      refreshRequests({
        page: newPage,
        limit: rowsPerPage,
        is_archive:
          requests.docs.length > 0 && requests.docs[0].status === "ARCHIVED",
      });
    },
    [refreshRequests, rowsPerPage, requests.docs]
  );

  const handleRowsPerPageChange = useCallback(
    (perPage: number) => {
      setRowsPerPage(perPage);
      setPage(1);
      refreshRequests({
        page: 1,
        limit: perPage,
        is_archive:
          requests.docs.length > 0 && requests.docs[0].status === "ARCHIVED",
      });
    },
    [refreshRequests, requests.docs]
  );

  function onTabChange(key: ReactKey | null) {
    if (key === null) setActiveTab("current");
    else setActiveTab(key as TableTab);

    setPage(1);
    setRowsPerPage(10);
    setFilterValue("");
    setSelectedKeys(new Set([]));
    setStatusFilter("all");
    setSortDescriptor({
      column: "order_number",
      direction: "ascending",
    });

    refreshRequests({
      page: 1,
      limit: 10,
      is_archive: key === "archive",
    });
  }

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredRequests = [...requests.docs];

    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredRequests = filteredRequests.filter((request) =>
        Array.from(statusFilter).includes(request.status.toLowerCase())
      );
    }

    return filteredRequests;
  }, [requests, statusFilter]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  useEffect(() => {
    refreshRequests();
  }, [refreshRequests]);

  // top content -
  const onSearchChange = useCallback(
    (value: string) => {
      setFilterValue(value);
      refreshRequests({ keyword: value, page: 1, limit: rowsPerPage });
      setPage(1);
    },
    [refreshRequests, rowsPerPage]
  );

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
          requestDocs={requests.docs}
          rowsPerPage={rowsPerPage}
          onSearchChange={onSearchChange}
          setStatusFilter={setStatusFilter}
          setVisibleColumns={setVisibleColumns}
          onRowsPerPageChange={handleRowsPerPageChange}
          setSelectedKeys={setSelectedKeys}
          onSendToArchive={onSendToArchive}
        />
      </>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    handleRowsPerPageChange,
    requests.docs,
    onSearchChange,
  ]);
  // - top content

  // bottom content -
  const bottomContentWrapper = useMemo(() => {
    return (
      <>
        <BottomContent
          page={page}
          setPage={handlePageChange}
          selectedKeys={selectedKeys}
          filteredItems={filteredItems}
          requests={requests}
        />
      </>
    );
  }, [selectedKeys, items.length, page, requests.totalPage, handlePageChange]);
  // - bottom content

  // table data -
  const renderCell = useCallback(
    (
      request: ExpertRequestInfo,
      columnKey: keyof AddOrReplaceKey<
        ExpertRequestInfo,
        "actions" | "inspection_data.vin",
        string
      >
    ) => {
      let cellValue: React.ReactNode;
      if (columnKey === "actions") cellValue = "actions";
      else if (columnKey === "inspection_data.vin")
        cellValue = request.inspection_data?.vin;
      else cellValue = request[columnKey] as React.ReactNode;

      switch (columnKey) {
        case "_id":
          return <RenderCodeCell code={request._id} />;

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
                <RenderVehicleModelCell
                  id={request._id}
                  inspectionData={request.inspection_data}
                />
              )}
            </>
          );

        case "status":
          return <RenderStatusCell id={request._id} status={request.status} />;

        case "owner":
          return <RenderOwnerCell owner={request.owner} />;

        case "lead_specialist":
          return (
            <>
              {!!request.lead_specialist && (
                <RenderLeadSpecialistCell
                  leadSpecialist={request.lead_specialist}
                />
              )}
            </>
          );

        case "createdAt":
          return <RenderCreatedAtCell createdAt={request.createdAt} />;

        case "inspection_data.vin":
          return (
            <>
              {!!request.inspection_data?.vin && (
                <RenderVinCell vin={request.inspection_data.vin} />
              )}
            </>
          );

        case "tags":
          return <RenderTagsCell tags={request.tags} />;

        case "actions":
          return <RenderActionsCell id={request._id} activeTab={activeTab} />;

        default:
          return cellValue;
      }
    },
    [activeTab]
  );

  const handleSortChange = useCallback(
    (descriptor: SortDescriptor) => {
      const column = descriptor.column as string;
      setSortDescriptor({
        column: column as keyof ExpertRequestInfo,
        direction: descriptor.direction,
      });
      refreshRequests({
        page: page,
        limit: rowsPerPage,
        sortColumn: column,
        sortValue: descriptor.direction === "ascending" ? "1" : "-1",
      });
    },
    [refreshRequests, page, rowsPerPage]
  );

  return (
    <>
      <div className="lg:px-4">
        <Suspense fallback={<Loading />}>
          <TitleActions requestsCount={requests.totalDocs} />
          <TableTypeTabs activeTab={activeTab} onChange={onTabChange} />
        </Suspense>
      </div>

      <Table
        isHeaderSticky
        aria-label="Expert Requests Table"
        selectionMode="multiple"
        topContent={topContentWrapper}
        bottomContent={bottomContentWrapper}
        selectedKeys={selectedKeys}
        sortDescriptor={sortDescriptor}
        onSelectionChange={(keys) => setSelectedKeys(keys as Set<string>)}
        onSortChange={handleSortChange}
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
          items={filteredItems}
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
    </>
  );
  // - table data
}

export default function ExpertRequests() {
  return (
    <ExpertRequestsProvider>
      <ExpertRequestsContent />
    </ExpertRequestsProvider>
  );
}

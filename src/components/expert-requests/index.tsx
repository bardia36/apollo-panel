import { Key, useState } from "react";
import TitleActions from "./title-actions";
import TableTypeTabs from "./table-components/table-type-tabs";
import RequestsTable from "./table-components/requests-table";

export default function ExpertRequests() {
  const [activeTab, setActiveTab] = useState("current");

  function onTabChange(key: Key) {
    setActiveTab(key as string);
  }

  return (
    <>
      <div className="lg:px-4">
        <TitleActions />
        <TableTypeTabs activeTab={activeTab} onChange={onTabChange} />
      </div>
      <RequestsTable />
    </>
  );
}

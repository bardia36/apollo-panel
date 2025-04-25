import TitleActions from "./title-actions";
import TableTypeTabs from "./table-type-tabs";
import { useState } from "react";

export default function ExpertRequests() {
  const [activeTab, setActiveTab] = useState("current");

  function onTabChange(tab: string) {
    setActiveTab(tab);
  }

  return (
    <>
      <TitleActions />
      <TableTypeTabs activeTab={activeTab} onChange={onTabChange} />
    </>
  );
}

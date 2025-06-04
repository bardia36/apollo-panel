import { useEffect } from "react";
import { t } from "i18next";
import { useBreadcrumb } from "@/contexts/breadcrumbContext";
import Workspaces from "@/components/workspaces";

export default function WorkspacesPage() {
  const { setLinks } = useBreadcrumb();

  useEffect(() => {
    setLinks([{ name: t("title.workspaces"), url: "/workspaces" }]);
  }, [setLinks]);

  return <Workspaces />;
}

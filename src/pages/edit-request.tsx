import { useEffect } from "react";
import { t } from "i18next";
import { useBreadcrumb } from "@/contexts/breadcrumbContext";
import EditRequest from "@/components/expert-requests/edit-request";

export default function EditExpertRequestPage() {
  const { setLinks } = useBreadcrumb();

  useEffect(() => {
    setLinks([
      { name: t("title.expertRequests"), url: "/expert-requests" },
      { name: t("title.editRequest"), url: "/expert-requests/:id" },
    ]);
  }, [setLinks]);

  return <EditRequest />;
}

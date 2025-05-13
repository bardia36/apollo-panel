import { useEffect } from "react";
import { useBreadcrumb } from "@/context/breadcrumbContext";

export default function IndexPage() {
  const { setLinks } = useBreadcrumb();

  useEffect(() => setLinks([]), [setLinks]);

  return <div>Dashboardaa</div>;
}

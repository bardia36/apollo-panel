import { BreadcrumbLink } from "@/types/breadcrumb";
import { createContext, useContext, useState, FC, ReactNode } from "react";

type BreadcrumbContextType = {
  links: BreadcrumbLink[];
  setLinks: (links: BreadcrumbLink[]) => void;
};

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(
  undefined
);

export const BreadcrumbProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [links, setLinks] = useState<BreadcrumbLink[]>([]);

  return (
    <BreadcrumbContext.Provider value={{ links, setLinks }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};

export const useBreadcrumb = (): BreadcrumbContextType => {
  const context = useContext(BreadcrumbContext);
  if (!context) {
    throw new Error("useBreadcrumb must be used within a BreadcrumbProvider");
  }
  return context;
};

import { createContext, useContext, useState, ReactNode } from "react";
import {
  RegisterRequestResponse,
  UpdateRequestFinalBody,
  InspectionDataItem,
} from "@/types/expert-requests";
import { Template, TemplateField } from "@/types/templates";

type CreateRequestContextType = {
  requestData: RegisterRequestResponse | null;
  stepThreeData: UpdateRequestFinalBody | null;
  requestId: string | null;
  activeFormat: InspectionDataItem | null;
  activeTemplate: Template | null;
  modifiedTemplateFields: Record<string, TemplateField[]>;
  setRequestData: (data: RegisterRequestResponse) => void;
  setStepThreeData: (data: UpdateRequestFinalBody) => void;
  setRequestId: (id: string) => void;
  setActiveFormat: (format: InspectionDataItem | null) => void;
  setActiveTemplate: (template: Template | null) => void;
  setModifiedTemplateFields: (fields: Record<string, TemplateField[]>) => void;
  resetData: () => void;
};

const CreateRequestContext = createContext<
  CreateRequestContextType | undefined
>(undefined);

export function CreateRequestProvider({ children }: { children: ReactNode }) {
  const [requestData, setRequestData] =
    useState<RegisterRequestResponse | null>(null);
  const [stepThreeData, setStepThreeData] =
    useState<UpdateRequestFinalBody | null>(null);
  const [requestId, setRequestId] = useState<string | null>(null);
  const [activeFormat, setActiveFormat] = useState<InspectionDataItem | null>(
    null
  );
  const [activeTemplate, setActiveTemplate] = useState<Template | null>(null);
  const [modifiedTemplateFields, setModifiedTemplateFields] = useState<
    Record<string, TemplateField[]>
  >({});

  const resetData = () => {
    setRequestData(null);
    setStepThreeData(null);
    setRequestId(null);
    setActiveFormat(null);
    setActiveTemplate(null);
    setModifiedTemplateFields({});
  };

  return (
    <CreateRequestContext.Provider
      value={{
        requestData,
        stepThreeData,
        requestId,
        activeFormat,
        activeTemplate,
        modifiedTemplateFields,
        setRequestData,
        setStepThreeData,
        setRequestId,
        setActiveFormat,
        setActiveTemplate,
        setModifiedTemplateFields,
        resetData,
      }}
    >
      {children}
    </CreateRequestContext.Provider>
  );
}

export function useCreateRequest() {
  const context = useContext(CreateRequestContext);
  if (context === undefined) {
    throw new Error(
      "useCreateRequest must be used within a CreateRequestProvider"
    );
  }
  return context;
}

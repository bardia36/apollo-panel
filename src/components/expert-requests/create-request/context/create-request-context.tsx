import { createContext, useContext, useState, ReactNode } from "react";
import {
  CreateRequestBody,
  UpdateRequestLinkBody,
  UpdateRequestFinalBody,
} from "@/types/expertRequests";

type CreateRequestContextType = {
  stepOneData: CreateRequestBody | null;
  stepTwoData: UpdateRequestLinkBody | null;
  stepThreeData: UpdateRequestFinalBody | null;
  requestId: string | null;
  setStepOneData: (data: CreateRequestBody) => void;
  setStepTwoData: (data: UpdateRequestLinkBody) => void;
  setStepThreeData: (data: UpdateRequestFinalBody) => void;
  setRequestId: (id: string) => void;
  resetData: () => void;
};

const CreateRequestContext = createContext<
  CreateRequestContextType | undefined
>(undefined);

export function CreateRequestProvider({ children }: { children: ReactNode }) {
  const [stepOneData, setStepOneData] = useState<CreateRequestBody | null>(
    null
  );
  const [stepTwoData, setStepTwoData] = useState<UpdateRequestLinkBody | null>(
    null
  );
  const [stepThreeData, setStepThreeData] =
    useState<UpdateRequestFinalBody | null>(null);
  const [requestId, setRequestId] = useState<string | null>(null);

  const resetData = () => {
    setStepOneData(null);
    setStepTwoData(null);
    setStepThreeData(null);
    setRequestId(null);
  };

  return (
    <CreateRequestContext.Provider
      value={{
        stepOneData,
        stepTwoData,
        stepThreeData,
        requestId,
        setStepOneData,
        setStepTwoData,
        setStepThreeData,
        setRequestId,
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

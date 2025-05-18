import { createContext, useContext, useState, ReactNode } from "react";
import {
  RegisterRequestResponse,
  UpdateRequestFinalBody,
} from "@/types/expertRequests";

type CreateRequestContextType = {
  requestData: RegisterRequestResponse | null;
  stepThreeData: UpdateRequestFinalBody | null;
  requestId: string | null;
  setRequestData: (data: RegisterRequestResponse) => void;
  setStepThreeData: (data: UpdateRequestFinalBody) => void;
  setRequestId: (id: string) => void;
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

  const resetData = () => {
    setRequestData(null);
    setStepThreeData(null);
    setRequestId(null);
  };

  return (
    <CreateRequestContext.Provider
      value={{
        requestData,
        stepThreeData,
        requestId,
        setRequestData,
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

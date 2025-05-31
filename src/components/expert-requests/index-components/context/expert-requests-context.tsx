import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useCallback,
} from "react";
import {
  ExpertRequestResponse,
  GetRequestsParams,
} from "@/types/expert-requests";
import { expertRequestsApi } from "@/apis/expert-requests";
import { exceptionHandler } from "@/apis/exception";

interface ExpertRequestsContextType {
  requests: ExpertRequestResponse;
  loading: boolean;
  refreshRequests: (params?: {
    keyword?: string;
    page?: number;
    limit?: number;
    sortColumn?: string;
    sortValue?: GetRequestsParams["sortValue"];
  }) => Promise<void>;
}

const ExpertRequestsContext = createContext<
  ExpertRequestsContextType | undefined
>(undefined);

export const ExpertRequestsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [requests, setRequests] = useState<ExpertRequestResponse>({
    docs: [],
    hasNextPage: false,
    hasPrevPage: false,
    limit: 10,
    page: 1,
    totalDocs: 0,
    totalPage: 1,
  });

  const refreshRequests = useCallback(
    async (params?: {
      keyword?: string;
      page?: number;
      limit?: number;
      sortColumn?: string;
      sortValue?: GetRequestsParams["sortValue"];
    }) => {
      setLoading(true);
      try {
        const res = await expertRequestsApi.getRequests({
          keyword: params?.keyword,
          page: params?.page ?? 1,
          limit: params?.limit ?? 10,
          sortColumn: params?.sortColumn?? 'order_number',
          sortValue: params?.sortValue?? '1',
        });
        setRequests(res);
      } catch (err) {
        exceptionHandler(err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return (
    <ExpertRequestsContext.Provider
      value={{ requests, loading, refreshRequests }}
    >
      {children}
    </ExpertRequestsContext.Provider>
  );
};

export const useExpertRequests = () => {
  const context = useContext(ExpertRequestsContext);
  if (context === undefined) {
    throw new Error(
      "useExpertRequests must be used within an ExpertRequestsProvider"
    );
  }
  return context;
};

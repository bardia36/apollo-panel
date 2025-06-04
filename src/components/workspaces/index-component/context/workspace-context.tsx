import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useCallback,
} from "react";
import type { Workspace } from "@/types/workspace";
import { workspaceApi } from "@/apis/workspace";
import { exceptionHandler } from "@/apis/exception";

interface WorkspaceContextType {
  workspace: Workspace | null;
  loading: boolean;
  refreshWorkspace: (id: string) => Promise<void>;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(
  undefined
);

export const WorkspaceProvider = ({ children }: { children: ReactNode }) => {
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [loading, setLoading] = useState(false);

  const refreshWorkspace = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const response = await workspaceApi.getWorkspaceById(id);
      setWorkspace(response);
    } catch (error) {
      exceptionHandler(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <WorkspaceContext.Provider value={{ workspace, loading, refreshWorkspace }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
};

import { Workspace } from "@/types/workspace";
import { create } from "zustand";

type WorkspaceStore = {
  workspace: Workspace | null;
  workspaceSlug: string | null;
  setWorkspace: (workspace: Workspace) => void;
  removeWorkspace: () => void;
  setWorkspaceSlug: (workspaceSlug: string) => void;
  removeWorkspaceSlug: () => void;
};

const useWorkspaceStore = create<WorkspaceStore>((set) => ({
  workspace: null,
  workspaceSlug: null,
  setWorkspace: (workspace) => set({ workspace }),
  removeWorkspace: () => set({ workspace: null }),
  setWorkspaceSlug: (workspaceSlug) => set({ workspaceSlug }),
  removeWorkspaceSlug: () => set({ workspaceSlug: null }),
}));

export default useWorkspaceStore;

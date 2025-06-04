import { Workspace } from "@/types/workspace";
import { create } from "zustand";

type WorkspaceStore = {
  workspace: Workspace | null;
  setWorkspace: (workspace: Workspace) => void;
  removeWorkspace: () => void;
};

const useWorkspaceStore = create<WorkspaceStore>((set) => ({
  workspace: null,
  setWorkspace: (workspace) => set({ workspace }),
  removeWorkspace: () => set({ workspace: null }),
}));

export default useWorkspaceStore;

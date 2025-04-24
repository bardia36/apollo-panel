// Components
import Nav from "./nav";
import Workspace from "./workspace";
import Account from "./account";
import ProPlan from "./pro-plan";

export function Sidebar() {
  return (
    <div className="hidden sm:flex h-full max-w-[321px] min-w-[288px] overflow-x-hidden overflow-y-auto sm:p-4 rounded-lg">
      <div className="relative flex h-full w-72 flex-col p-6 transition-width bg-content1 rounded-large">
        <SidebarContent />
      </div>
    </div>
  );
}

export function SidebarContent() {
  return (
    <>
      <Workspace />

      <Nav />

      <div className="mt-auto">
        <ProPlan />

        <Account />
      </div>
    </>
  );
}

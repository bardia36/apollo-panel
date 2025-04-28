// Components
import Nav from "./nav";
import Workspace from "./workspace";
import Account from "./account";
import ProPlan from "./pro-plan";

export function Sidebar() {
  return (
    <div className="hidden lg:flex h-full max-w-[321px] min-w-[288px] overflow-x-hidden overflow-y-auto rounded-lg">
      <div className="flex flex-col w-72 p-6 transition-width bg-content1 rounded-large">
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

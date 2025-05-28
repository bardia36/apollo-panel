// Components
import Nav from "./nav";
import Workspace from "./workspace";
import Account from "./account";
import ProPlan from "./pro-plan";

export function Sidebar() {
  return (
    <aside className="hidden lg:flex h-full max-w-[321px] min-w-[288px] overflow-x-hidden overflow-y-auto rounded-lg">
      <div className="relative flex h-full w-72 flex-col p-6 transition-width bg-content1 rounded-large">
        <SidebarContent />
      </div>
    </aside>
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

// Components
import Nav from "./nav";
import Workspace from "./workspace";
import Account from "./account";
import ProPlan from "./pro-plan";

export default function Sidebar() {
  return (
    <div className="hidden h-full max-w-[321px] overflow-x-hidden overflow-y-auto sm:flex min-w-[288px] p-4 rounded-lg">
      <div className="will-change relative flex h-full w-72 flex-col p-6 transition-width bg-content1 rounded-large">
        <Workspace />

        <Nav />

        <div className="mt-auto">
          <ProPlan />

          <Account />
        </div>
      </div>
    </div>
  );
}

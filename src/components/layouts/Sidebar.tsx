import Nav from "./nav";

export default function Sidebar() {
  return (
    <div className="hidden h-full max-w-[321px] overflow-x-hidden overflow-y-auto sm:flex min-w-[288px] rounded-lg">
      <div className="will-change relative flex h-full w-72 flex-col p-6 transition-width">
        <Nav />
      </div>
    </div>
  );
}

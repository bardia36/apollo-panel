import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

export default function Nav() {
  return (
    <div className="w-full relative flex flex-col gap-1 p-1 overflow-clip list-none">
      <nav className="w-full flex flex-col gap-0.5 outline-none items-center">
        <Link
          className="flex group gap-2 items-center justify-between relative py-1.5 w-full box-border subpixel-antialiased cursor-pointer tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:dark:ring-offset-background-content1 data-[hover=true]:transition-colors data-[hover=true]:bg-default/40 data-[hover=true]:text-default-foreground data-[selectable=true]:focus:bg-default/40 data-[selectable=true]:focus:text-default-foreground min-h-11 h-[44px] data-[selected=true]:bg-default-100 px-3 rounded-large data-[selected=true]:!bg-foreground"
          to="/dashboard"
        >
          <Icon icon="solar:home-2-outline" width={20} height={20} />

          <span className="flex-1 truncate text-small font-medium text-default-500 group-data-[selected=true]:text-default-50">
            پیشخوان
          </span>
        </Link>

        <Link
          className="flex group gap-2 items-center justify-between relative py-1.5 w-full box-border subpixel-antialiased cursor-pointer tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:dark:ring-offset-background-content1 data-[hover=true]:transition-colors data-[hover=true]:bg-default/40 data-[hover=true]:text-default-foreground data-[selectable=true]:focus:bg-default/40 data-[selectable=true]:focus:text-default-foreground min-h-11 h-[44px] data-[selected=true]:bg-default-100 px-3 rounded-large data-[selected=true]:!bg-foreground"
          to="/dashboard"
        >
          <Icon icon="solar:inbox-linear" fontSize={20} />

          <span className="flex-1 truncate text-small font-medium text-default-500 group-data-[selected=true]:text-default-50">
            پیشخوان
          </span>
        </Link>
      </nav>
    </div>
  );
}

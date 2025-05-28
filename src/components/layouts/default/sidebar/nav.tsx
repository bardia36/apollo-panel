import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import { nav } from "@/layouts/nav";
import { cn } from "@heroui/react";

export default function Nav() {
  return (
    <div className="w-full relative flex flex-col overflow-clip list-none">
      <nav className="w-full flex flex-col gap-0.5 outline-none items-center" role="navigation">
        {nav.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className={cn(
              item.href === useLocation().pathname &&
                "bg-default-200 text-default-700",
              "flex group gap-2 items-center justify-between relative py-2.5 mb-2 w-full box-border subpixel-antialiased cursor-pointer tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:dark:ring-offset-background-content1 data-[hover=true]:transition-colors data-[hover=true]:bg-default/40 data-[hover=true]:text-default-foreground data-[selectable=true]:focus:bg-default/40 data-[selectable=true]:focus:text-default-foreground min-h-11 h-[44px]  px-3 rounded-large data-[selected=true]:!bg-foreground"
            )}
          >
            <Icon icon={item.icon} width={24} height={24} />

            <span
              className={cn(
                item.href === useLocation().pathname && "text-default-700",
                "flex-1 truncate text-small font-medium text-default-500 group-data-[selected=true]:text-default-50"
              )}
            >
              {item.label}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

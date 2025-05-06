import { LogoIcon } from "@/components/shared/logo";
import UserImage from "@/components/shared/user-image";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useTheme } from "@heroui/use-theme";
import { Drawer, DrawerContent, DrawerBody } from "@heroui/drawer";
import { useState } from "react";
import { SidebarContent } from "../sidebar";

export default function MobileHeader() {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="flex lg:hidden items-center justify-between w-full h-12 mb-4">
      <div className="flex items-center">
        <UserImage imgClass="w-8 h-8" />
        <div className="p-2">
          <Icon
            icon="lineicons:gear-1"
            width="24"
            height="24"
            className={theme === "dark" ? "text-zinc-400" : "text-zinc-500"}
          />
        </div>
      </div>

      <div className="flex items-center">
        <LogoIcon classNames={{ img: "h-[2.625rem]" }} />

        <button
          className="p-2.5 ms-2"
          aria-label="menu toggle"
          aria-haspopup="true"
          aria-expanded="false"
          aria-controls="menu"
        >
          <Icon
            icon="material-symbols:menu-rounded"
            width="20"
            height="20"
            onClick={() => setIsOpen(true)}
          />
        </button>

        <Drawer
          isOpen={isOpen}
          placement="left"
          backdrop="blur"
          closeButton={<></>}
          className="w-[288px] m-4 rounded-[14px]"
          shadow="lg"
          onOpenChange={(open) => setIsOpen(open)}
        >
          <DrawerContent>
            <DrawerBody>
              <SidebarContent />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}

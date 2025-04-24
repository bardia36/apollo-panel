import { Outlet } from "react-router-dom";
import { useTheme } from "@heroui/use-theme";
import useIsMobile from "@/hook/useIsMobile";

// components
import { Image } from "@heroui/image";

import NewRelease from "@/components/layouts/auth/new-release";

export default function AuthLayout() {
  const isMobile = useIsMobile();
  const { theme } = useTheme();

  return (
    <div className="overflow-auto h-dvh">
      <div className="grid h-full grid-cols-12">
        {!isMobile && (
          <div className="col-span-4 xl:col-span-3">
            <div className="relative p-4 h-dvh">
              <Image
                src={
                  theme === "dark"
                    ? "/images/auth/auth-dark.png"
                    : "/images/auth/auth-light.png"
                }
                alt="Auth Light"
                removeWrapper
                classNames={{ img: "h-full object-cover w-full rounded-large" }}
              />

              <NewRelease />
            </div>
          </div>
        )}

        <div
          className={`col-span-12 px-4 md:col-span-8 xl:col-span-9 md:px-0 h-full ${(isMobile && "flex flex-col justify-center") || ""}`}
        >
          <Outlet />

          {isMobile && <NewRelease />}
        </div>
      </div>
    </div>
  );
}

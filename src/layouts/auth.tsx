import { Outlet } from "react-router-dom";
import { useTheme } from "@heroui/use-theme";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { Image } from "@heroui/react";
import NewRelease from "@/components/layouts/auth/new-release";
import authLightImg from "@/assets/images/auth/auth-light.png";
import authDarkImg from "@/assets/images/auth/auth-dark.png";

export default function AuthLayout() {
  const { isMdAndDown } = useBreakpoint();
  const { theme } = useTheme();

  return (
    <div className="overflow-auto h-dvh">
      <div className="grid h-full grid-cols-12">
        {!isMdAndDown && (
          <div className="col-span-4 xl:col-span-3">
            <div className="relative p-4 h-dvh">
              <Image
                src={theme === "dark" ? authDarkImg : authLightImg}
                alt="Auth side background"
                removeWrapper
                classNames={{ img: "h-full object-cover w-full rounded-large" }}
              />

              <NewRelease />
            </div>
          </div>
        )}

        <div
          className={`col-span-12 px-4 md:col-span-8 xl:col-span-9 md:px-0 h-full ${(isMdAndDown && "flex flex-col justify-center") || ""}`}
        >
          <Outlet />

          {isMdAndDown && <NewRelease />}
        </div>
      </div>
    </div>
  );
}

import { Outlet } from "react-router-dom";
import { Image } from "@heroui/image";
import { useIsMobile } from "@/hook/useIsMobile";

// components
import NewRelease from "@/components/layouts/auth/new-release";

export default function AuthLayout() {
  const { isMobile } = useIsMobile();
  return (
    <div className="overflow-auto h-dvh">
      <div className="grid h-full grid-cols-11">
        {!isMobile && (
          <div className="col-span-3">
            <div className="relative p-4 h-dvh">
              <Image
                src="/images/auth/auth-light.png"
                alt="Auth Light"
                removeWrapper
                classNames={{ img: "h-full object-cover w-full rounded-large" }}
              />

              <NewRelease />
            </div>
          </div>
        )}

        <div className="col-span-11 px-4 md:col-span-8 md:px-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

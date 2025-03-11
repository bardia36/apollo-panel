import { Outlet } from "react-router-dom";
import { Image } from "@heroui/image";
import { useIsMobile } from "@/hook/useIsMobile";

export default function AuthLayout() {
  const { isMobile } = useIsMobile();
  return (
    <div className="h-dvh overflow-hidden">
      <div className="grid grid-cols-7 h-full">
        {!isMobile && (
          <div className="col-span-2">
            <Image
              src="/images/auth/auth-light.png"
              alt="Auth Light"
              removeWrapper
              classNames={{ img: "h-dvh object-cover w-fit p-4" }}
            />
          </div>
        )}

        <div className="col-span-7 md:col-span-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

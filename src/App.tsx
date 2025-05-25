// Modules
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useTheme } from "@heroui/use-theme";

// Stores
import useAuthStore from "@/stores/auth-store";

// Components
import Loading from "@/components/shared/loading";
import { RouterProvider } from "@/routes/RouterProvider";

// Contexts
import { BreadcrumbProvider } from "@/contexts/breadcrumbContext";
import { CookieValues } from "./types/auth";

function App() {
  const [cookie] = useCookies<"AUTH", CookieValues>(["AUTH"]);
  const [initializing, setInitializing] = useState(true);
  const { setTheme } = useTheme();
  const { setAuth } = useAuthStore();

  useEffect(() => {
    setAccount();
  }, []);

  async function setAccount() {
    detectBrowserTheme();
    setAuth(cookie.AUTH);
    setInitializing(false);
  }

  function detectBrowserTheme() {
    // TODO: Uncomment this when we have a theme changer btn
    // if (
    //   window.matchMedia &&
    //   window.matchMedia("(prefers-color-scheme: dark)").matches
    // )
    //   setTheme("dark");
    // else setTheme("light");
    setTheme("light");
  }

  return (
    <>
      {initializing ? (
        <Loading />
      ) : (
        <div className="text-foreground bg-background">
          <BreadcrumbProvider>
            <RouterProvider />
          </BreadcrumbProvider>
        </div>
      )}
    </>
  );
}

export default App;

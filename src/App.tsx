// Modules
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useTheme } from "@heroui/use-theme";

// Stores
import useAuthStore from "@/stores/auth-store";

// Components
import Loading from "@/components/shared/loading";
import { RouterProvider, RouteTitleHandler } from "@/routes/RouterProvider";

// Contexts
import { BreadcrumbProvider } from "@/contexts/breadcrumbContext";
import { CookieValues } from "./types/auth";
import { useLocalizedDigits } from "@/hooks/useLocalizedDigits";

function App() {
  const [cookie] = useCookies<"AUTH", CookieValues>(["AUTH"]);
  const [initializing, setInitializing] = useState(true);
  const { setTheme } = useTheme();
  const { setAuth } = useAuthStore();

  useLocalizedDigits();

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
            <RouteTitleHandler />
            <RouterProvider />
          </BreadcrumbProvider>
        </div>
      )}
    </>
  );
}

export default App;

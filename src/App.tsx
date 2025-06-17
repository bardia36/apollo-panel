// Modules
import { useEffect, useState } from "react";
import { useTheme } from "@heroui/use-theme";

// Stores
import useAuthStore from "@/stores/auth-store";

// Components
import Loading from "@/components/shared/loading";
import { useCookies } from "react-cookie";
import { RouterProvider, RouteTitleHandler } from "@/routes/RouterProvider";

// Contexts
import { BreadcrumbProvider } from "@/contexts/breadcrumbContext";
import { useLocalizedDigits } from "@/hooks/useLocalizedDigits";
import { CookieValues } from "./types/auth";

function App() {
  const [initializing, setInitializing] = useState(true);
  const [cookie] = useCookies<"AUTH", CookieValues>(["AUTH"]);
  const { setTheme } = useTheme();
  const { setAuth } = useAuthStore();

  useLocalizedDigits();

  useEffect(() => {
    setAccount();
    setBrowserTheme();
  }, []);

  async function setAccount() {
    setAuth(cookie.AUTH);
    setInitializing(false);
  }

  async function setBrowserTheme() {
    detectBrowserTheme();
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
        <div className="bg-background text-foreground">
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

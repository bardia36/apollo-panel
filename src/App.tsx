// Modules
import { useEffect, useState } from "react";
import { useTheme } from "@heroui/use-theme";

// Stores
import useAuthStore from "@/stores/auth-store";

// Components
import Loading from "@/components/shared/loading";
import { RouterProvider, RouteTitleHandler } from "@/routes/RouterProvider";

// Contexts
import { BreadcrumbProvider } from "@/contexts/breadcrumbContext";
import { useLocalizedDigits } from "@/hooks/useLocalizedDigits";
import { accountApi } from "./apis/auth";

function App() {
  const [initializing, setInitializing] = useState(true);
  const { setTheme } = useTheme();
  const { setAuth } = useAuthStore();

  useLocalizedDigits();

  useEffect(() => {
    setAccount();
    setBrowserTheme();
  }, []);

  async function setAccount() {
    const account = await accountApi.getAccount();
    setAuth(account);
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

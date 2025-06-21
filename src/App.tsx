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
import { WorkspaceCookieValues } from "./types/workspace";
import useWorkspaceStore from "./stores/workspace-store";

function App() {
  const [initializing, setInitializing] = useState(true);
  const [cookie] = useCookies<"AUTH", CookieValues>(["AUTH"]);
  const [workspaceCookie] = useCookies<"WORKSPACE", WorkspaceCookieValues>(["WORKSPACE"]);
  const { setTheme } = useTheme();
  const { setAuth } = useAuthStore();
  const { setWorkspaceSlug } = useWorkspaceStore();

  useLocalizedDigits();

  useEffect(() => {
    setAccount();
    setBrowserTheme();
  }, []);

  async function setAccount() {
    setAuth(cookie.AUTH);
    setWorkspaceSlug(workspaceCookie.WORKSPACE ?? "");
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

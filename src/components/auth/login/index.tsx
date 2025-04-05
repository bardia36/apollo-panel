import { Image } from "@heroui/image";
import LoginForm from "./login-form";
import { useTheme } from "@heroui/use-theme";

export default function Login() {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Image
        src={theme === "dark" ? "/images/logo-dark.png" : "/images/logo.svg"}
        alt="Logo"
        classNames={{ wrapper: "mb-6" }}
      />

      <LoginForm />
    </div>
  );
}

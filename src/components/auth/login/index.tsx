import { Image } from "@heroui/image";
import LoginForm from "./login-form";

export default function Login() {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Image
        src="/images/logo.svg"
        alt="Logo"
        classNames={{ wrapper: "mb-6" }}
      />

      <LoginForm />
    </div>
  );
}

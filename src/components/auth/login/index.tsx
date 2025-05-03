import LoginForm from "./login-form";
import { FullLogo } from "@/components/shared/logo";

export default function Login() {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <FullLogo classNames={{ wrapper: "mb-6" }} />

      <LoginForm />
    </div>
  );
}

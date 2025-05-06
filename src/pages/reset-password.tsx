import { useNavigate } from "react-router-dom";
import ResetPasswordComponent from "@/components/auth/reset-password";
import { useCookies } from "react-cookie";
type CookieValues = {
  AUTH_EMAIL?: string;
  FORGET_PASS_TOKEN?: string;
};

export default function ResetPassword() {
  let navigate = useNavigate();
  const [cookies, _, removeCookie] = useCookies<"AUTH_EMAIL", CookieValues>([
    "AUTH_EMAIL",
  ]);

  const [forgetPassCookies, __, removeForgetPassCookie] = useCookies<
    "FORGET_PASS_TOKEN",
    CookieValues
  >(["FORGET_PASS_TOKEN"]);

  if (!cookies.AUTH_EMAIL || !forgetPassCookies.FORGET_PASS_TOKEN)
    navigate("/login");
  else {
    removeCookie("AUTH_EMAIL");
    removeForgetPassCookie("FORGET_PASS_TOKEN");
  }

  return (
    <div className="flex items-center justify-center w-full md:h-full">
      <ResetPasswordComponent email={cookies.AUTH_EMAIL} />
    </div>
  );
}

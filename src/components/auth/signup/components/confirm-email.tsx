import ConfirmMessage from "@/components/shared/confirm-message";
import { accountApi } from "@/services/api/auth";
import { exceptionHandler } from "@/services/api/exception";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  email: string;
  setCurrentComponent: Dispatch<SetStateAction<"confirmEmail" | "form">>;
};

export default function ConfirmEmail({ setCurrentComponent, email }: Props) {
  const [progressing, setProgressing] = useState(false);

  async function sendConfirmEmail() {
    try {
      setProgressing(true);
      await accountApi.sendConfirmEmail({ email });
    } catch (err) {
      exceptionHandler(err);
    } finally {
      setProgressing(false);
    }
  }

  return (
    <ConfirmMessage
      isRegister
      progressing={progressing}
      retrieveRequest={sendConfirmEmail}
      changeComponent={setCurrentComponent}
    />
  );
}

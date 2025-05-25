import ConfirmMessage from "@/components/shared/confirm-message";
import { accountApi } from "@/apis/auth";
import { exceptionHandler } from "@/apis/exception";
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
      await accountApi.forgetPassword({ email });
    } catch (err) {
      exceptionHandler(err);
    } finally {
      setProgressing(false);
    }
  }

  return (
    <div>
      <ConfirmMessage
        progressing={progressing}
        retrieveRequest={sendConfirmEmail}
        changeComponent={setCurrentComponent}
      />
    </div>
  );
}

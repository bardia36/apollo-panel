import { t } from "i18next";

export default function StepOneHeader() {
  return (
    <div className="text-center mb-6">
      <h2 className="text-default-foreground text-3xl font-black mb-2">
        {t("expertRequests.createReviewRequest")}
      </h2>
      <p className="text-default-500">
        {t("expertRequests.createReviewRequestDescription")}
      </p>
    </div>
  );
}

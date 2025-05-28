import { useTranslation } from "react-i18next";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { Accordion, AccordionItem } from "@heroui/react";
import { Image } from "@heroui/react";
import { Link } from "@heroui/react";
import newReleaseImg from "@/assets/images/auth/new-release.webp";
import corporateImg from "@/assets/images/auth/corporate.webp";

export default function NewRelease() {
  const { t } = useTranslation();
  const { isMdAndDown } = useBreakpoint();

  return (
    <div className="z-50 mt-4 mb-4 md:mt-0 md:absolute md:left-8 md:bottom-6 md:right-8">
      <Accordion className="mb-4 bg-content1 rounded-large text-small">
        <AccordionItem
          classNames={{
            indicator: "text-foreground-500",
            base: "p-4",
            trigger: "py-0",
            content: "pt-4 pb-0",
          }}
          title={t("auth.releaseTitle")}
        >
          <div className="grid grid-cols-12 gap-3">
            <Image
              src={newReleaseImg}
              alt={t("auth.releaseTitle")}
              width={115}
              removeWrapper
              className="col-span-2 md:col-span-4 lg:col-span-4"
            />

            <div className="col-span-10 md:col-span-12 lg:col-span-8">
              <div className="flex items-center justify-between">
                <p className="text-small text-foreground-600">نگارش ۲٫۱٫۴</p>

                <p className="text-xs text-foreground-600">۱ فروردین, ۱۴۰۴</p>
              </div>

              <ul className="mb-2 ms-3">
                <li className="text-xs list-disc text-foreground-600">
                  بهبود تجربه‌کاربری در بخش ایجاد درخواست
                </li>

                <li className="text-xs list-disc text-foreground-600">
                  افزودن قابلیت ایجاد محیط کار 🔥
                </li>

                <li className="text-xs list-disc text-foreground-600">
                  اصلاح باگ‌ها و مشکلات جزئی پنل مدیریت
                </li>
              </ul>

              <div className="w-full text-end">
                <Link dir="ltr" href="#" isExternal showAnchorIcon>
                  {t("shared.continue")}
                </Link>
              </div>
            </div>
          </div>
        </AccordionItem>
      </Accordion>

      {!isMdAndDown && (
        <div className="flex items-center justify-center w-full">
          <Image
            src={corporateImg}
            alt={t("auth.releaseCopyRight")}
            width={18}
            height={12}
            className="mb-1 pe-1"
          />

          <p className="text-xs text-foreground-500">
            {t("auth.releaseCopyRight")}
          </p>
        </div>
      )}
    </div>
  );
}

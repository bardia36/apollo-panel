import { useTranslation } from "react-i18next";
import { useIsMobile } from "@/hook/useIsMobile";

// components
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Image } from "@heroui/image";
import { Link } from "@heroui/link";

export default function NewRelease() {
  const { t } = useTranslation();
  const { isMobile } = useIsMobile();

  return (
    <div className="mt-4 md:mt-0 md:absolute z-50 md:left-8 md:bottom-6 md:right-8 mb-4">
      <Accordion className="bg-content1 rounded-large text-small mb-4">
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
              src="/images/auth/new-release.png"
              alt={t("auth.releaseTitle")}
              width={115}
              height={115}
              removeWrapper
              className="col-span-4"
            />

            <div className="col-span-8">
              <div className="flex items-center justify-between">
                <p className="text-small text-foreground-600">نگارش ۲٫۱٫۴</p>

                <p className="text-xs text-foreground-600">۱ فروردین, ۱۴۰۴</p>
              </div>

              <ul className="mb-2 ms-3">
                <li className="text-xs list-disc text-foreground-600">
                  بهبود تجربه‌کابری در بخش ایجاد درخواست
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

      {!isMobile && (
        <div className="flex justify-center items-center w-full">
          <Image
            src="/images/auth/corporate.svg"
            alt={t("auth.releaseCopyRight")}
            width={18}
            height={12}
            className="pe-1 mb-1"
          />

          <p className="text-xs text-foreground-500">
            {t("auth.releaseCopyRight")}
          </p>
        </div>
      )}
    </div>
  );
}

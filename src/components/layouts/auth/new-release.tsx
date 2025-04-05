import { useTranslation } from "react-i18next";

// components
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Image } from "@heroui/image";
import { Link } from "@heroui/link";

export default function NewRelease() {
  const { t } = useTranslation();
  return (
    <div className="mt-2 md:mt-0 md:absolute z-50 md:left-8 md:bottom-12 md:right-8">
      <Accordion className="md:bg-white md:rounded-large text-small">
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
    </div>
  );
}

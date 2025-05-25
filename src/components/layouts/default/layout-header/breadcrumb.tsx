import { Icon } from "@iconify/react/dist/iconify.js";
import { t } from "i18next";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useBreadcrumb } from "@/contexts/breadcrumbContext";

export default function Breadcrumb() {
  const { links } = useBreadcrumb();

  return (
    <nav
      aria-label="Breadcrumb"
      className="text-sm text-gray-600 flex items-center space-x-2"
    >
      <div>
        <Link
          to="/dashboard"
          className="text-foreground-400 hover:text-foreground-600 me-2"
          aria-current={links.length === 0 ? "page" : undefined}
        >
          {t("title.dashboard")}
        </Link>
      </div>

      {links.map((link, index) => (
        <Fragment key={index}>
          <Icon
            icon="heroicons:chevron-left"
            aria-hidden="true"
            className="w-4 h-4"
          />

          <div>
            {index === links.length - 1 ? (
              <span aria-current="page" className="text-foreground-800">
                {link.name}
              </span>
            ) : (
              <Link
                to={link.url}
                className="text-foreground-400 hover:text-foreground-600"
                aria-current={undefined}
              >
                {link.name}
              </Link>
            )}
          </div>
        </Fragment>
      ))}
    </nav>
  );
}

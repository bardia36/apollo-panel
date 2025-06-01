import { useEffect } from "react";

type SupportedLang = "fa" | "ar" | "en";

const digitMaps: Record<SupportedLang, string[]> = {
  fa: ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"],
  ar: ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"],
  en: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], // fallback (no transformation)
};

/**
 * Detects the current language from the <html lang="..."> tag
 * and maps it to 'fa', 'ar', or 'en' as fallback.
 */
const detectLang = (): SupportedLang => {
  const lang = document.documentElement.lang?.toLowerCase();
  if (lang.startsWith("fa")) return "fa";
  if (lang.startsWith("ar")) return "ar";
  return "en";
};

/**
 * Converts Latin digits (0-9) to localized digits based on target language.
 */
const convertDigits = (text: string, lang: SupportedLang): string => {
  if (lang === "en") return text;
  return text.replace(/\d/g, (d) => digitMaps[lang][parseInt(d)]);
};

/**
 * Recursively converts text content inside a DOM node based on the given language.
 */
const convertDigitsInNode = (node: Node, lang: SupportedLang): void => {
  if (node.nodeType === Node.TEXT_NODE && node.nodeValue) {
    node.nodeValue = convertDigits(node.nodeValue, lang);
  } else if (node.nodeType === Node.ELEMENT_NODE && node.childNodes) {
    node.childNodes.forEach((child) => convertDigitsInNode(child, lang));
  }
};

/**
 * Hook that observes DOM and converts all numeric text to the appropriate
 * localized digit system based on document language.
 */
export const useLocalizedDigits = (): void => {
  useEffect(() => {
    const lang = detectLang();

    const convertAll = () => convertDigitsInNode(document.body, lang);
    convertAll();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach(({ addedNodes }) => {
        addedNodes.forEach((node) => convertDigitsInNode(node, lang));
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);
};

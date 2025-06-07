import { t } from "i18next";
import jalaali from "jalaali-js";

export function fancyTimeFormat(duration: number) {
  // Hours, minutes and seconds
  const hrs = ~~(duration / 3600);
  const mins = ~~((duration % 3600) / 60);
  const secs = ~~duration % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  let ret = "";

  if (hrs > 0) {
    ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
  }

  ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;

  return ret;
}

/**
 * A utility type that creates a new type by adding or replacing a specific key with a new value type.
 * @template T The original type
 * @template K The key to add or replace (must be a string)
 * @template V The value type for the new key
 * @returns A new type with the specified key added or replaced
 * @example
 * type User = { name: string; age: number };
 * type UserWithEmail = AddOrReplaceKey<User, 'email', string>;
 * Results in type { name: string; age: number; email: string }
 */
export type AddOrReplaceKey<T, K extends string, V> = Omit<T, K> & {
  [P in K]: V;
};

/**
 * Splits a number into groups of three digits, separated by a specified splitter.
 * @param num The number to be split
 * @param splitter The character used to separate groups of digits
 * @returns A string with the number split into groups of three digits
 * @example
 * numberSplitter(1234567, ',') // returns "1,234,567"
 */
export function numberSplitter(
  num: number | string,
  splitter: string = "."
): string {
  const numStr = typeof num === "number" ? num.toString() : num;
  const parts = [];

  for (let i = numStr.length; i > 0; i -= 3) {
    const start = Math.max(i - 3, 0);
    parts.unshift(numStr.slice(start, i));
  }

  return parts.join(splitter);
}

export function truncateString(str: string, maxLength: number) {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + "...";
}

export function copyToClipboard(text: string) {
  return () => {
    navigator.clipboard.writeText(text);
  };
}

/**
 * Converts Persian/Arabic numbers to English numbers
 * @param input String containing Persian/Arabic numbers
 * @returns String with converted English numbers
 */
export function convertPersianToEnglishNumbers(input: string): string {
  if (!input) return input;

  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

  let result = input;

  // Replace Persian digits
  for (let i = 0; i < 10; i++) {
    const regex = new RegExp(persianDigits[i], "g");
    result = result.replace(regex, i.toString());
  }

  // Replace Arabic digits
  for (let i = 0; i < 10; i++) {
    const regex = new RegExp(arabicDigits[i], "g");
    result = result.replace(regex, i.toString());
  }

  return result;
}

export interface FormattedDateTime {
  formattedDate: string; // YYYY/MM/DD
  formattedTime: string; // HH:mm
  formattedWeekDay: string; // Persian weekday name
}

const PERSIAN_WEEKDAYS = [
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنجشنبه",
  "جمعه",
  "شنبه",
];

// TODO: Support English and Arabic later
/**
 * Formats an ISO date string to Jalali date and time
 * @param isoDate ISO date string
 * @returns Object containing formatted date (YYYY/MM/DD), time (HH:mm), and weekday name in Persian
 */
export const formatDate = (isoDate: string): FormattedDateTime => {
  const date = new Date(isoDate);

  // Convert to Jalali
  const jDate = jalaali.toJalaali(date);

  // Format date (YYYY/MM/DD)
  const formattedDate = `${jDate.jy}/${jDate.jm.toString().padStart(2, "0")}/${jDate.jd.toString().padStart(2, "0")}`;

  // Format time (HH:mm)
  const formattedTime = `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;

  // Get weekday name
  const formattedWeekDay = PERSIAN_WEEKDAYS[date.getDay()];

  return {
    formattedDate,
    formattedTime,
    formattedWeekDay,
  };
};

export function getTimeDistance(date: Date | string) {
  const now = new Date();
  const targetDate = typeof date === "string" ? new Date(date) : date;

  const diffInMinutes = Math.floor(
    (now.getTime() - targetDate.getTime()) / (1000 * 60)
  );
  const days = Math.floor(diffInMinutes / (24 * 60));
  const hours = Math.floor((diffInMinutes % (24 * 60)) / 60);
  const minutes = diffInMinutes % 60;

  if (days === 0 && hours === 0 && minutes === 0) return t("shared.justNow");

  const parts: string[] = [];

  if (days > 0) parts.push(`${days} ${t("shared.day")}`);
  if (hours > 0) parts.push(`${hours} ${t("shared.hour")}`);
  if (minutes > 0 && days === 0) parts.push(`${minutes} ${t("shared.minute")}`);

  return parts.join(` ${t("shared.and")} `);
}

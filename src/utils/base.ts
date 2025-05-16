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

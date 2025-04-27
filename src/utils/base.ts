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

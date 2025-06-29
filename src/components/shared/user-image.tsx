import { Avatar, SlotsToClasses } from "@heroui/react";

export default function ({
  classNames,
}: {
  classNames?:
    | SlotsToClasses<"base" | "img" | "name" | "icon" | "fallback">
    | undefined;
}) {
  return (
    // TODO: get user image and name from auth store
    <div className="p-2">
      <Avatar alt="user's image" classNames={classNames} />
    </div>
  );
}

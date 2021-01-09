export type TimeStamp = number;

export default function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export enum IndicatorType {
  Ok = 1,
  Issue = 2,
  Error = 3,
}

export type IconColor = "green-500" | "yellow-500" | "red-500";
export type IconStyle = "text-green-500" | "text-yellow-500" | "text-red-500";

export type IconName =
  | "check"
  | "cross"
  | "exclamation"
  | "power"
  | "temp"
  | "chevronRight"
  | "chevronDown"
  | "moon"
  | "sun"
  | "git";

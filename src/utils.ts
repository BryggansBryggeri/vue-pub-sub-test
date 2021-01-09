export type TimeStamp = number;

export enum IndicatorType {
  Ok = 1,
  Issue = 2,
  Error = 3,
}

export default function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

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

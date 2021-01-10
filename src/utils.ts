export type TimeStamp = number;

export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hasKey<O>(obj: O, key: keyof any): key is keyof O {
  return key in obj;
}

export enum IndicatorType {
  Ok = 1,
  Issue = 2,
  Error = 3,
}

export type ToggleType = "ManAuto" | "OnOff";

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

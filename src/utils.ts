export default function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export type IconName = "check" | "cross" | "exclamation";

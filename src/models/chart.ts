/**
 * Data (Label with values)
 */
export interface Data {
  label: string;
  data: Value[];
}

/**
 * Value
 */
export interface Value {
  x: Date;
  y: number;
}

export interface SensorMsg {
  id: string;
  timestamp: number;
  meas: number | null;
  err: string | null;
}

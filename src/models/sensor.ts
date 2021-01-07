import { Result, newErr, newOk } from "@/models/result";

export interface SensorMsg {
  id: string;
  timestamp: number;
  meas: number | null;
  err: string | null;
}

export type Meas = number;
export type MeasErr = string;
export type TimeStamp = number;

export type MeasResult = Result<[Meas, TimeStamp], [MeasErr, TimeStamp]>;

export function newMeasOk(meas: Meas, ts: TimeStamp): MeasResult {
  return newOk([meas, ts]);
}

export function newMeasErr(err: MeasErr, ts: TimeStamp): MeasResult {
  return newErr([err, ts]);
}

export function measResultFromMsg(msg: SensorMsg): MeasResult {
  if (msg.meas) {
    return newMeasOk(msg.meas, msg.timestamp);
  }
  if (msg.err) {
    return newMeasErr(msg.err, msg.timestamp);
  }
  return newErr(["Incorrect msg", msg.timestamp]);
}

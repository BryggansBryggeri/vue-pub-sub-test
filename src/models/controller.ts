import { Result, newErr, newOk } from "@/models/result";
import { TimeStamp } from "@/utils";

export default interface ControllerProps {
  id: string;
  actorId: string;
  sensorId: string;
}

export interface ContrMsg {
  id: string;
  timestamp: number;
  target: number | null;
  err: string | null;
}

export type Signal = number;
export type SignalErr = string;

export type ContrResult = Result<[Signal, TimeStamp], [SignalErr, TimeStamp]>;

export function newContrResultOk(meas: Signal, ts: TimeStamp): ContrResult {
  return newOk([meas, ts]);
}

export function newContrResultErr(err: SignalErr, ts: TimeStamp): ContrResult {
  return newErr([err, ts]);
}

export function contrResultFromMsg(msg: ContrMsg): ContrResult {
  if (msg.target) {
    return newContrResultOk(msg.target, msg.timestamp);
  }
  if (msg.err) {
    return newContrResultErr(msg.err, msg.timestamp);
  }
  return newErr(["Incorrect msg", msg.timestamp]);
}

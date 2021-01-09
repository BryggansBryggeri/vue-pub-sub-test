import { Result, newErr, newOk } from "@/models/result";
import { TimeStamp } from "@/utils";

export interface ActorMsg {
  id: string;
  timestamp: number;
  signal: Signal | null;
  err: string | null;
}

export type Signal = number;
export type SignalErr = string;

export type ActorResult = Result<[Signal, TimeStamp], [SignalErr, TimeStamp]>;

export function newActorResultOk(meas: Signal, ts: TimeStamp): ActorResult {
  return newOk([meas, ts]);
}

export function newActorResultErr(err: SignalErr, ts: TimeStamp): ActorResult {
  return newErr([err, ts]);
}

export function actorResultFromMsg(msg: ActorMsg): ActorResult {
  if (msg.signal) {
    return newActorResultOk(msg.signal, msg.timestamp);
  }
  if (msg.err) {
    return newActorResultErr(msg.err, msg.timestamp);
  }
  return newErr(["Incorrect msg", msg.timestamp]);
}
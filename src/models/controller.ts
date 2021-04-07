import { Result, newErr, newOk } from "@/models/result";
import { TimeStamp } from "@/utils";

type ContrType =
  | "manual"
  | { hysteresis: { offset_on: number; offset_off: number } }
  | { pid: { kp: number; ki: number; kd: number } };

export interface ControllerProps {
  controllerId: string;
  actorId: string;
  sensorId: string;
  type: ContrType;
}

// Manual serialization, stupid but don't know how to do it otherwise
export function propsAndTargetToJson(props: ControllerProps, newTarget: Target): JSON {
  const config = {
    // eslint-disable-next-line @typescript-eslint/camelcase
    controller_id: props.controllerId,
    // eslint-disable-next-line @typescript-eslint/camelcase
    actor_id: props.actorId,
    // eslint-disable-next-line @typescript-eslint/camelcase
    sensor_id: props.sensorId,
    // eslint-disable-next-line @typescript-eslint/camelcase
    type: props.type,
  };
  const contrData = {
    config,
    // eslint-disable-next-line @typescript-eslint/camelcase
    new_target: newTarget,
  };
  return JSON.parse(JSON.stringify(contrData));
}

export interface NewContrData {
  config: ControllerProps;
  new_target: Target;
}

export type ContrErr = string;
export type Target = number;
export enum Mode {
  Man = 0,
  Auto = 1,
}

export interface ContrStatusMsg {
  status: {
    id: string;
    timestamp: TimeStamp;
    target: Target;
    type: string;
  };
}

function modeFromType(type: string): Mode {
  if (type === "manual") {
    return Mode.Man;
  }
  return Mode.Auto;
}

export function typeFromMode(mode: Mode): ContrType {
  switch (mode) {
    case Mode.Man:
      return "manual";
    case Mode.Auto:
      // eslint-disable-next-line @typescript-eslint/camelcase
      // return { hysteresis: { offset_on: 10.0, offset_off: 5.0 } };
      return { pid: { kp: 0.7, ki: 0.0, kd: 0.0 } };
    default:
      throw new Error("Unreachable typeFromMode");
  }
}

export interface ContrStatus {
  target: Target;
  mode: Mode;
  timestamp: TimeStamp;
}

export type ContrResult = Result<ContrStatus, [ContrErr, TimeStamp]>;

export function newContrResultOk(contr: ContrStatus): ContrResult {
  return newOk(contr);
}

export function newContrResultErr(err: ContrErr, ts: TimeStamp): ContrResult {
  return newErr([err, ts]);
}

export function contrResultFromMsg(msg: ContrStatusMsg): ContrResult {
  const { status } = msg;
  const data: ContrStatus = {
    target: status.target,
    mode: modeFromType(status.type),
    timestamp: status.timestamp,
  };
  return newContrResultOk(data);
}

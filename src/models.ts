//export default interface UiConfig {
//  breweryName: string;
//  vessels: {
//        [key: string]: VesselProp
//    };
//}

export default interface VesselProp {
  id: string;
  mainActor: string;
  mainSensor: string;
  maxVolume: number;
}

//export default interface UiConfig {
//  breweryName: string;
//  vessels: {
//        [key: string]: VesselProp
//    };
//}

export default interface VesselProp {
  name: string;
  mainActor: string;
  mainSensor: string;
  maxVolume: number;
  vesselController: string;
}

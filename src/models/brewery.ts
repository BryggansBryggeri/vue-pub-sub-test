export class Brewery {
    private name!: string;
  
    private vessels!: {
      [key: string]: Vessel;
    };
  }
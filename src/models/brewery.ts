console.log("hi");
import Vessel from "@/models/vessel";
export class Brewery {
  private name!: string;

  private vessels!: {
    [key: string]: Vessel;
  };

  constructor(name: string, vessels: string[]) {
    this.name = name;
    const tmp = vessels.map((id) => [id, new Vessel(id)]);
    this.vessels = tmp;
  }
}

const brew = new Brewery("aba", ["boil", "mash"]);

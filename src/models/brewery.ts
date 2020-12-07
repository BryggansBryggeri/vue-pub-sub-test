console.log("hi");
import Vessel from "@/models/vessel";
export class Brewery {
  private name!: string;

  private vessels!: Map<string, Vessel>;

  constructor(name: string, vessels: string[]) {
    this.name = name;
    const tmp: [string, Vessel][] = vessels.map((id) => [id, new Vessel(id)]);
    this.vessels = new Map(tmp);
  }
}

const brew = new Brewery("aba", ["boil", "mash"]);

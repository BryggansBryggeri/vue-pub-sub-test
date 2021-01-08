import Vessel from "@/models/vessel";

console.log("hi");
export class Brewery {
  public name!: string;

  private vessels!: Map<string, Vessel>;

  constructor(name: string, vessels: string[]) {
    this.name = name;
    const tmp: [string, Vessel][] = vessels.map((id) => [id, new Vessel(id)]);
    this.vessels = new Map(tmp);
  }
}

export const brew = new Brewery("BBBBB", ["mash", "manifold", "boil"]);

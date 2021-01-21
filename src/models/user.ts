import { alpha, required, minLength } from "@rxweb/reactive-forms";

export class User {
    @alpha()
    @minLength({ value: 5 })
    @required()
    userName!: string;
}
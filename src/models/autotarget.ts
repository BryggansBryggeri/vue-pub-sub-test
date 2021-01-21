import { alpha, required, NumericValueType, minLength, numeric, range } from "@rxweb/reactive-forms";

export class AutoTarget {
    @numeric({acceptValue:NumericValueType.PositiveNumber, allowDecimal:true})
    @range({minimumNumber:0.0  ,maximumNumber:101.0  ,message:'Target can be set between 0 and 101.' })
    @required()
    newTarget!: number;
}
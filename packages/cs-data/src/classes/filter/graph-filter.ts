export type ValueOperatorType = ">" | ">=" | "<" | "<=" | "==" | "!=";

export class GraphFilter {
    public hasIncomingTypeRelation?: any;
    public hasObjectTypeRelation?: any;
    public hasObjectRelation?: any;
    public hasObjectProperties?: GraphPropertyFilter[];
}

export class GraphPropertyFilter {
    public property?: any;
    public operator!: ValueOperatorType;
    public value?: any;
}
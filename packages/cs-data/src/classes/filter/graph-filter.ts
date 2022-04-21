import { PropertyType } from '../..';

export type ValueOperatorType = ">" | ">=" | "<" | "<=" | "==" | "!=" | 'set' | 'not set' | 'includes';

export class GraphFilter {
    public hasIncomingTypeRelation?: any;
    public hasObjectTypeRelation?: any;
    public hasObjectRelation?: any;
    public hasElementRelation?: GraphElementFilter;
    public hasObjectProperties?: GraphPropertyFilter[];
}

export class GraphElementFilter {
    public property?: any;
    public elementId?: string;
}

export class GraphPropertyFilter {
    public property?: any;
    public operator!: ValueOperatorType;
    public value?: any | any[];
    public _property?: PropertyType;
}
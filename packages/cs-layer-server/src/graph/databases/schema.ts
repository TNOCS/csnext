import { FeatureType } from "@csnext/cs-data";

export class GraphSchema {
    
    public entities!: GraphEntity[];
}

export class GraphRelation {
    public entityId!: string;
    public countIn?: number;
    public countOut?: number;
    public direction!: 'IN' | 'OUT';
}

export class GraphEntity {
    public id!: string;
    public type! : 'node' | 'edge';
    public count?: number;
    public properties?: GraphProperty[];
    public relations?: GraphRelation[];
    public labels?: string[];
}

export class GraphProperty {
    public id!: string;
    public type! : 'STRING'| 'FLOAT';
    public isArray?: boolean;
}

export class ObservationType extends FeatureType {
    public typeId?: string;            
    public _collapsed?: boolean;
    public _nlpType?: string;   
    public title?: string;     

}
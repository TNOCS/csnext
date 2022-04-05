import { GraphElement, TextRelation } from '../..';

export class MetaEntity {
    public type?: string;
    public text?: string;    
    public id?: string;   
    public kg_id?: string;    
    public _node?: GraphElement;
    public _edge?: GraphElement;
    public _included?: boolean;
    public _approved?: boolean;    
    // public _relations?: TextRelation[];    
}
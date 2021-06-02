import { FeatureType, GraphElement } from '../..';

export class TextRelation {
    public triple_subject?: string;
    public triple_object?: string;
    public triple_relation?: string;
    public relation_id?: string;
    public subj_entity_id?: string;
    public subj_entity_class?: string;
    public obj_entity_id?: string;
    public obj_entity_class?: string;
    public _subject_entity?: TextEntity;
    public _object_entity?: TextEntity;    
    public _observation?: FeatureType;
}

export class TextEntity {
    public text?: string;
    public position_start?: number;
    public position_end?: number;
    public entity_class?: string;
    public '@id'?: string;
    public '@context'?: any;
    public '@type'?: string;
    public entity_idx?: string;
    public class?: string;
    public view_class?: string;
    public node_id?: string;    
    public _highlight?: boolean;
    public _node?: GraphElement;
    public _edge?: GraphElement;
    public id?: string;
    public _key?: string;
    public _included?: boolean;
    public _approved?: boolean;    
    public _relations?: TextRelation[];
    public _docEntity?: any;
}
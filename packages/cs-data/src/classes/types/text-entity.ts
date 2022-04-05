import { FeatureType, GraphElement, MetaEntity } from '../..';

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

export class TextEntity extends MetaEntity {
    public spacy_label?: string; 
    public projection?: string;
    public converted?: string;
    public suggested_by?: string;
    public suggested_time?: number;
    public _highlight?: boolean;
    public _key?: string;    
    public _location?: string;
    public _date?: string;
}
import { FeatureType, TextEntity, TextRelation, GraphElement, BaseElementProperties } from '@csnext/cs-data';
import { guidGenerator } from '@csnext/cs-core';
import { EntityType, Observation } from '..';

export class DocElementProperties extends BaseElementProperties {
  public doc?: any;
  public text?: any;
  public editor_mode?: 'VIEW' | 'EDIT' | 'LEARN';
  public learn_mode?: 'REVIEW' | 'LEARN'
  public hide_unknowns?: boolean;
}

export class GraphDocument extends GraphElement<DocElementProperties> {
    public editedText?: string;
    public _entities?: TextEntity[];
    // public relations?: TextRelation[];
    public observations?: Observation[];
    public suggestedObservation?: FeatureType[] = [];
    public _entityTypes: { [id: string]: EntityType } = {};
    public activeLearningType? : FeatureType;
    
    public get doc() : any {
        if (!this.properties) { this.properties = {}}
        if (!this.properties.doc) { this.properties.doc = {
        type: "doc",
        content: [    
        ],
        }}
        return this.properties.doc;
    }


    public get name() : string {
        return this.properties?.name ?? '';
    }
    constructor(element?: GraphElement) {
        super();
        
        if (element) {
            Object.assign(this, element);
        }

        if (!this.properties) { this.properties = {}};
        this.properties.id = this.properties.id ?? guidGenerator();
        this.properties.editor_mode = this.properties?.editor_mode ?? 'VIEW';
        this.properties.created_time = this.properties.created_time ?? new Date().getTime();        
        this.properties.updated_time = this.properties.updated_time ?? new Date().getTime();        
    }

    public get _node() : GraphElement {
        return this;
    }

    public getNode(): GraphElement {
        return {
            id: this.id, type: 'node', title: this.name, classId: 'input', properties: {
                name: this.name }            
        } as GraphElement;
    }
}


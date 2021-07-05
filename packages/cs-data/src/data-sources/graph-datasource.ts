import { TimeDataSource, MessageBusManager, Topics, guidGenerator, IFormOptions } from '@csnext/cs-core';
import { DataSource, FeatureType, FeatureTypes, FeatureTypeStat, GraphElement, GraphSettings, PropertyType, PropertyValueType, WktUtils } from '../';
// import { DiagramAction, GraphAction, DiagramElement, ObservationTypes } from "./../classes/";
// import { AppState } from '@csnext/cs-client';
import throttle from 'lodash.throttle';
import Fuse from 'fuse.js';

export type GraphObject = { [key: string]: GraphElement };
export type ValueOperatorType = ">" | ">=" | "<" | "<=" | "==" | "!=";

export class GraphFilter {
    public hasIncomingTypeRelation?: any;
    public hasObjectTypeRelation?: any;
    public hasObjectRelation?: any;
}

export class GraphDatasource extends DataSource {
    public static GRAPH_EVENTS = 'graph-events';
    public static GRAPH_UPDATED = 'graph-updated';
    public static GRAPH_LOADED = 'graph-loaded';
    public static ELEMENT_UPDATED = 'element-updated';

    public activeId = '';
    public graph: GraphObject = {};    
    public activeElement?: GraphElement;
    public graphSettings: GraphSettings = new GraphSettings();
    public timesource?: TimeDataSource;
    public busManager = new MessageBusManager();    
    private _nodeTypes?: GraphElement[];
    private _edgeTypes?: { [key: string]: PropertyType };
    private _availableColors: string[] = [];
    public typeStats: { [key: string]: FeatureTypeStat } = {};
    public fuse?: Fuse<any>;
    public fuseOptions?: Fuse.IFuseOptions<any> = {};

    public get observationTypes(): FeatureTypes | undefined {
        return this.featureTypes;
    }

    public get featureTypes(): FeatureTypes | undefined {
        return this._meta;
    }

    public set featureTypes(value: FeatureTypes | undefined) {
        this._meta = value;
    }

    constructor() {
        super();
        this.fuse = new Fuse([], { ignoreLocation: true, threshold: 0.3, keys: [{ name: 'properties.name', weight: 1 }, { name: 'properties.description', weight: 0.5 }, { name: 'properties.aliases', weight: 0.7 }], includeScore: true });
    }

    public getColor(): string {
        if (this._availableColors.length === 0) {
            this._availableColors = ["#4e79a7", "#f28e2c", "#e15759", "#76b7b2", "#59a14f", "#edc949", "#af7aa1", "#ff9da7", "#9c755f", "#bab0ab"];
        }
        const color = this._availableColors.pop();
        if (color) {
            return color;
        } else {
            return 'lightgray';
        }
    }

    public nodeTypes: GraphElement[] = [
    ];

    public findObservation(type: string): FeatureType | undefined {
        if (!this.featureTypes) { return undefined; }
        return this.featureTypes[type] ?? undefined;
    }

    public initFeatureType(ft: FeatureType) {
        if (!ft.attributes) { ft.attributes = {} }
        if (!ft.attributes.color) {
            ft.attributes.color = this.getColor();
        }
    }

    public mergeFeatureTypes() {
        if (this.featureTypes) {
            FeatureType.initFeatureTypes(this.featureTypes);
            for (const ft of Object.values(this.featureTypes)) {
                this.initFeatureType(ft);
            }
            this.featureTypes = FeatureType.mergeFeatureTypes(this.featureTypes) as FeatureTypes;                      
            for (const type of Object.values(this.featureTypes)) {
                this.updateFeatureTypePropertyMap(type);
            }            
        } else {
            // this.observationTypes = {};
        }
    }

    public updateFeatureTypeStats() {
        if (!this.featureTypes) { return; }
        this.typeStats = {};
        for (const type in this.featureTypes) {
            this.typeStats[type] = { type: this.featureTypes[type]!, elements: [], elementCount: 0, includedCount: 0 }
        }
        for (const element of Object.values(this.graph)) {
            if (element._featureType ?.type) {
                const stat = this.typeStats[element._featureType.type];
                if (stat) {
                    stat.elementCount += 1;
                }
            }
        }
    }


    public initElement(el: GraphElement) {
        // find featuretype                    
        if (el.classId && this.featureTypes) {
            el._featureType = this.findObservation(el.classId); //.find(ft => ft.type === el.classId);            
            if (!el._featureType) {
                el._featureType = Object.values(this.featureTypes)[0];
            }
        }

        if (el.properties) {
            if (el.properties.latitude && !el.properties.lat) { el.properties.lat = el.properties.latitude; }
            if (el.properties.longitude && !el.properties.lon) { el.properties.lon = el.properties.longitude; }

            if (el.properties.hasOwnProperty('alternatives') && el.properties.alternatives.length > 0) {
                el._alternatives = el.properties.alternatives ?.split(',');
            }
            if (el.properties.hasOwnProperty('point_in_time')) {
                let pit = el.properties['point_in_time'];
                if (Number.isInteger(pit)) {
                    let date = new Date(pit);
                    el._startDate = date;
                    // el.properties.start_time = date; // = `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`
                } else {
                    let date = el.properties['point_in_time'].split('T')[0].split('-');
                    el.properties.start = `${date[2]}-${date[1]}-${date[0]}`;
                }
            }
            if (el.properties.hasOwnProperty('start_time')) {
                let date = el.properties['start_time'].split('T')[0].split('-');
                el.properties.start = `${date[2]}-${date[1]}-${date[0]}`;
            }
            if (el.properties.hasOwnProperty('end_time')) {
                let date = el.properties['end_time'].split('T')[0].split('-');
                el.properties.end = `${date[2]}-${date[1]}-${date[0]}`;
            }
            if (el.properties.hasOwnProperty('location')) {
                const values = WktUtils.PointParser(el.properties['location']);
                if (values && values.length === 2) {
                    el.properties['lat'] = values[0];
                    el.properties['lon'] = values[1];

                } else {
                    // console.log(el.properties['coordinate_location']);
                }
            }

            if (el.properties.hasOwnProperty('coordinate location')) {

                const values = el.properties['coordinate location'].replace('Point(', '').replace(')', '').split(' ');
                if (values.length === 2) {
                    el.properties['lat'] = values[1];
                    el.properties['lon'] = values[0];
                } else {
                    // console.log(el.properties['coordinate location']);
                }
            }
        }
    }

    public get availableEdgeTypes(): { [key: string]: PropertyType } {
        if (!this.featureTypes) { return {} }
        if (this._edgeTypes !== undefined) { return this._edgeTypes; }
        let res: { [key: string]: PropertyType } = {};
        for (const type of Object.values(this.featureTypes)) {
            if (type.properties) {
                for (const prop of type.properties ?.filter(t => (t.type === PropertyValueType.relation && t.relation ?.type))) {
                    if (!res.hasOwnProperty(prop.relation ?.type!)) {
                        res[prop.relation!.type!] = { ...prop }; //, ...{_visible: false}};
                        res[prop.relation!.type!]._visible = true;

                    }
                }
            }
        }
        // if (this.graph) {          
        //   for (const key in this.graph) {
        //     if (this.graph.hasOwnProperty(key)) {
        //       const el = this.graph[key];         
        //     //   el._hidden = this.getHidden(el);
        //       if (
        //         el.isType &&
        //         el.properties?.classId && 
        //         el.type === "edge" &&
        //         !res.hasOwnProperty(el.properties.classId)
        //       ) {
        //         el._visible = true;
        //         res[el.properties.classId] = el;
        //       }
        //     }
        //   }
        // }
        this._edgeTypes = res;
        return res;
    }

    public get availableNodeTypes(): GraphElement[] {
        if (this._nodeTypes !== undefined) { return this._nodeTypes; }
        let res: GraphElement[] = [];
        if (this.graph) {
            for (const key of Object.keys(this.graph)) {
                const el = this.graph[key];
                el._hidden = this.getHidden(el);
                el._visible = true;
                if (el.type === "node" && (res.findIndex(e => e.id === el.id) === -1)) {
                    res.push(el);
                }
            }
        }
        this._nodeTypes = res;
        return res;
    }

    public getHidden(e: GraphElement, filters?: GraphSettings): boolean {
        if (!filters || !e.classId) { return false; }
        if (e.class) {
            if (!e.class._visible) { e.class._visible = true; }
            return !e.class._visible;
        } else return false;
    }

    public getElement(id: string): GraphElement | undefined {
        if (this.graph.hasOwnProperty(id)) { return this.graph[id]; }
        return;
    }

    public getElementsByTitle(title: string): GraphElement[] {
        let res: GraphElement[] = Object.values(this.graph).filter(c => GraphElement.getTitle(c) === title);
        return res;
    }

    public getElementsByProperty(property: string, value: any): GraphElement[] {
        let res: GraphElement[] = Object.values(this.graph).filter(c => {
            let propVal = (c.properties && c.properties[property]) || c[property];
            if (propVal != undefined) return propVal == value;
        });
        return res;
    }

    public getElementsByPropertyAndOperator(property: string, searchValue: any, operator: ValueOperatorType, skipRelations: boolean = false): GraphElement[] {
        let relationVals: GraphElement[] = [];
        let res: GraphElement[] = Object.values(this.graph).filter(c => {
            let propVal = this.getValueFromElement(property, c);
            if (propVal != undefined) {
                return this.compareOperator(propVal, searchValue, operator);
            }
            if (!skipRelations) {
                relationVals = relationVals.concat((c._incomming?.filter(i => {
                    if (i.classId === property) {
                        let propVal = this.getValueFromElement('title', i.to);
                        return this.compareOperator(propVal, searchValue, operator);
                    }
                }) || []).map(e => e.from!));
                relationVals = relationVals.concat((c._outgoing?.filter(i => {
                    if (i.classId === property) {
                        let propVal = this.getValueFromElement('title', i.to);
                        return this.compareOperator(propVal, searchValue, operator);
                    }
                }) || []).map(e => e.from!));
            }
            return false;
        });
        if (relationVals.length > 0) {
            return res.concat(relationVals);
        } else {
            return res;
        }
    }

    private getValueFromElement(property: string, c?: GraphElement) {
        if (!c) return undefined;
        return (c.properties && c.properties[property]) || c[property];
    }

    private compareOperator(propVal: any, searchValue: any, operator: ValueOperatorType): boolean {
        switch (operator) {
            case '==':
                return propVal == searchValue;
            case '>=':
                return propVal >= searchValue;
            case '>':
                return propVal > searchValue;
            case '<=':
                return propVal <= searchValue;
            case '<':
                return propVal < searchValue;
            case '!=':
                return propVal != searchValue;
            default:
                console.log(`Unknown ValueOperatorType ${operator}`);
                return false;
        }
    }

    public getClassElements(classId: string, traversal?: boolean, filter?: GraphFilter): GraphElement[] {
        let res: GraphElement[] = [];
        if (traversal) {
            res = Object.values(this.graph).filter(c => c._featureType ?._inheritedTypes ?.includes(classId));
        } else {
            res = Object.values(this.graph).filter(c => c.classId === classId);
        }
        if (filter) {
            if (filter.hasObjectTypeRelation) {
                res = res.filter(o => o._outgoing && o._outgoing ?.find(r => {
                    for (const field in filter.hasObjectTypeRelation) {
                        if (Object.prototype.hasOwnProperty.call(filter.hasObjectTypeRelation, field)) {
                            const value = filter.hasObjectTypeRelation[field];
                            if (r.classId === field && r.to ?.id === value) {
                                return true;
                            }
                        }
                    }
                    return false;
                }));
            } else if (filter.hasIncomingTypeRelation) {
                res = res.filter(o => o._incomming && o._incomming ?.find(r => {
                    for (const field in filter.hasIncomingTypeRelation) {
                        if (Object.prototype.hasOwnProperty.call(filter.hasIncomingTypeRelation, field)) {
                            const value = filter.hasIncomingTypeRelation[field];
                            const v = (typeof value === 'function') ? value() : value;
                            if (r.classId === field && r.from ?.id === v) {
                                return true;
                            }
                        }
                    }
                    return false;
                }));
            }
            else if (filter.hasObjectRelation) {
                res = res.filter(o => o._outgoing && o._outgoing ?.find(r => {
                    if (r.to ?.id === filter.hasObjectRelation) {
                        return true;
                    }

                    return false;
                }));
            }
        }
        return res;
    }

    public addNode(element: GraphElement, classId?: string) {
        let res = this;
        if (!element.id) { element.id = element._title; }
        if (!element._title && element.properties ?.name) { element._title = element.properties.name; }
        if (!element._title && element.id) { element._title = element.id; }
        element.type = 'node';
        if (classId) { element.classId = classId; }
        // if (element.classId) {
        //     res = res.addElement(element,stepId).addEdge({ fromId: element.id, toId: element.classId, _firstStep: stepId, classId: 'is', properties: { verified: true} }, stepId) as any;
        // } else {
        //     res = res.addElement(element, stepId);
        // }        
        if (!element._featureType && element.classId && this.featureTypes && this.featureTypes.hasOwnProperty(element.classId)) {
            element._featureType = this.featureTypes[element.classId];
        }

        res = res.addElement(element);
        if (this.fuse) { this.fuse.add(element); }
        return this;
    }

    public createEdge(element: GraphElement, classId?: string): GraphElement {
        element.type = 'edge';
        if (!element.properties) {
            element.properties = {};
        }        
        if (element.classId === undefined) {
            element.classId = classId;
        }
        element.properties.classId = element.classId;

        if (!element.id) {
            element.id = 'edge-' + guidGenerator(); //element.fromId + '-' + element.toId + '-' + element.classId;
        }
        element.properties.id = element.id;
        // if (element.toId && !element.to) {
        //     element.to = this.getElement(element.toId);
        // }
        if (element.to && !element.to._incomming) {
            element.to._incomming = [];
        }
        if (element.to ?._incomming && !element.to._incomming.includes(element)) {
            element.to._incomming.push(element);
        }
        // if (element.fromId && !element.from) {
        //     element.from = this.getElement(element.fromId);
        // }
        if (element.from && !element.from._outgoing) {
            element.from._outgoing = [];
        }
        if (element.from ?._outgoing && !element.from._outgoing.includes(element)) {
            element.from._outgoing.push(element);
        }
        return element;
    }

    public addEdge(element: GraphElement, classId?: string) : Promise<boolean> {
        return new Promise(async (resolve, reject) => {            
            if (element.toId && element.fromId) {                
                element = this.createEdge(element, classId);
                this.updateElementEdges(element);
                this.addElement(element);
                resolve(true);
            } else {
                reject('edge is missing to/from ids');
            }
        });
    }

    public removeNodeById(id: string, relations = false): Promise<boolean> {
        if (this.graph && this.graph.hasOwnProperty(id)) {
            delete this.graph[id];
            return Promise.resolve(true);
        } else {
            return Promise.reject('element not found');
        }
    }

    public removeEdge(edge: GraphElement): Promise<boolean> {
        return new Promise((resolve, reject) => {
            // remove incoming/outgoing from all related entities
            if (edge.from ?._outgoing) {
                edge.from._outgoing = edge.from._outgoing ?.filter(e => e.id !== edge.id);
            }
            if (edge.to ?._incomming) {
                edge.to._incomming = edge.to._incomming ?.filter(e => e.id !== edge.id);
            }
            if (edge.id && this.graph.hasOwnProperty(edge.id)) {
                delete this.graph[edge.id];
            }
            resolve(true);
        })
    }

    public removeEdgeById(id: string): Promise<boolean> {
        const edge = this.getElement(id);
        if (!edge) { return Promise.reject('edge not found') }
        return this.removeEdge(edge);
    }

    private stringToDate(_date: string, _format: string, _delimiter: string): Date {
        var formatLowerCase = _format.toLowerCase();
        var formatItems = formatLowerCase.split(_delimiter);
        var dateItems = _date.split(_delimiter);
        var monthIndex = formatItems.indexOf("mm");
        var dayIndex = formatItems.indexOf("dd");
        var yearIndex = formatItems.indexOf("yyyy");
        var month = parseInt(dateItems[monthIndex]);
        month -= 1;
        var formatedDate = new Date(dateItems[yearIndex] as any, month, dateItems[dayIndex] as any);
        return formatedDate;
    }

    public updateStartEnd(element: GraphElement, force = false) {
        if ((!element._startDate || force) && element.properties ?.hasOwnProperty('start')) {
            if (typeof element.properties.start === 'string') {
                element._startDate = this.stringToDate(element.properties!.start, 'dd-mm-yyyy', '-');
            }
            if (typeof element.properties.start === 'number') {
                element._startDate = new Date(element.properties.start);
            }
        }
        if ((!element._endDate || force) && element.properties ?.hasOwnProperty('end')) {
            if (typeof element.properties.end === 'string') {
                element._endDate = this.stringToDate(element.properties!.end, 'dd-mm-yyyy', '-');
            }
            if (typeof element.properties.end === 'number') {
                element._endDate = new Date(element.properties.end);
            }
        }
    }


    public addElement(element: GraphElement) {
        element = { ...new GraphElement(), ...element };
        // if (source && !element.properties!.hasOwnProperty('source')) {
        //     element.properties!.source = source;
        // }
        this.updateStartEnd(element);
        // if (!element.backgroundColor) {
        //     element.backgroundColor = this.getColor();
        // }
        if (element.id) {
            this.graph[element.id] = element;
        }
        return this;
    }

    public reset() : Promise<boolean> {        
        return new Promise((resolve, reject) => {
            this.graph = {};
            resolve(true);
        })
        
    }

    public triggerUpdateGraph(element?: GraphElement) {
        this.bus.publish(GraphDatasource.GRAPH_EVENTS, GraphDatasource.GRAPH_UPDATED, element);
    }

    private debounceUpdateTimeGraph = throttle(() => {
        this.updateTimeGraph();
    }, 500, { leading: false, trailing: true });

    private updateTimeGraph() {
        // if (this.diagram.o)
        this.triggerUpdateGraph();
    }

    public initTimeDatasource() {
        if (!this.timesource) { return; }
        this.busManager.subscribe(this.timesource.events, Topics.TIME_TOPIC, (a, e) => {
            switch (a) {
                case Topics.TIMELINE_MOVING:
                    this.graphSettings.focusDate = e;
                    this.debounceUpdateTimeGraph(); break;
                case Topics.TIMELINE_MOVED:
                    this.graphSettings.focusDate = e;
                    this.updateTimeGraph();
                    break;
            }
        });
    }

    public updateElementEdges(e: GraphElement, clean = false) {
        if (e.toId && !e.to) {
            e.to = this.getElement(e.toId);
            if (e.to && e.classId !== 'is' && e.classId !== 'source' && e.classId !== 'hasSource') {
                if (!e.to._incomming) {
                    e.to._incomming = [e];
                } else {
                    // if (e.to._incomming.findIndex(o => o.id === e.id) === -1) {
                    e.to._incomming.push(e);
                    // }
                }

            }
        }
        if (e.fromId && !e.from) {
            e.from = this.getElement(e.fromId);
            if (e.from && e.classId !== 'is' && e.classId !== 'source' && e.classId !== 'hasSource') {
                if (!e.from._outgoing) {
                    e.from._outgoing = [e];
                } else {
                    // if (e.from._outgoing.findIndex(o => o.id === e.id) === -1) {
                    e.from._outgoing.push(e);
                    // }
                }
            }
        }
        if (!e._title || clean) {
            e._title = GraphElement.getTitle(e, true);
        }
        if (!e._search || clean) {
            e._search = e._title;
            if (e.class && e.class._title) {
                e._search += e.class._title;
            }
        }
    }

    public updateEdges(clean = false) {
        for (const e of Object.values(this.graph).filter(g => g.type === 'edge')) {            
            this.updateElementEdges(e);
        }
    }

    public emptyGraph(trigger = true) {
        for (const el of Object.values(this.graph)) {
            el._included = false;
        }
        if (trigger) {
            this.triggerUpdateGraph();
        }
    }

    public updateNode(e: GraphElement, clean = false) {
        if (e.type === 'node') {
            if (!e._title || clean) {
                e._title = GraphElement.getTitle(e, clean);
            }
            GraphElement.updateOriginals(e);           
        }
    }

    public updateNodes(clean = false) {
        for (const e of Object.values(this.graph)) {
            this.updateNode(e, clean);
        }
    }

    public updateSearchIndex() {
        if (!this.fuse) { return; }
        this.fuse ?.setCollection(Object.values(this.graph).filter(e => e.type === 'node'));
    }

    public execute(): Promise<GraphDatasource> {
        return new Promise((resolve) => {
            resolve(this);
        })
    }
}
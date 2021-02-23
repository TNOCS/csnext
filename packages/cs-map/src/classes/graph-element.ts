import { FeatureType } from '@csnext/cs-data';

export class Source {

}


export class GraphSettings {
    public showDataModel?= false;
    public showInstance?= true;
    public showReliability?= false;
    public filterTimeline?= false;
    public filterStep?= false;
    public showExternal?= false;
    public focusDate?: Date;
    public autoFocus?= true;
    public showAllOnMap?= true;    
    public showAllOnTimeline?= false;    
}

export class LinkInfo {
    public direction: "to" | "from" = "to";
    public element?: GraphElement;
    public link?: GraphElement;
  }

export class GraphElement {
    public title?: string;
    public id?: string;
    public type?: 'node' | 'edge' = 'node';
    public isType?= false;
    public classId?: string;
    public class?: GraphElement;
    public toId?: string;
    public group?: string;
    public to?: GraphElement;
    public fromId?: string;
    public shape?: string;
    public from?: GraphElement;
    public aliases?: string;
    public _alternatives?: string[] = [];
    public alternatives?: string;    
    public kb_source?: string;
    public kb_time?: number;    
    public _source?: GraphElement;
    public _included?: boolean = false;
    public _startDate?: Date;
    public _endDate?: Date;    
    public _hidden?: boolean = false;    
        
    public _visible?: boolean = false;
    public _collapsed?: boolean = false;
    public _firstStep?: string;
    public _title?: string;
    public _instances?: LinkInfo[];
    public _search?: string;
    public _group?: string;
    public _isEditting?: boolean;
    public _featureType?: FeatureType;
    // public _parent?: GraphElement;
    // public relations?: GraphElement[];
    public _derivatives?: GraphElement[];
    public sources?: GraphElement[];
    public properties?: {
        [key: string]: any;
    } = {};

    public _incomming?: GraphElement[];
    public _outgoing?: GraphElement[];
    public backgroundColor?: string;

    public static outOfRange(e: GraphElement, date: Date) {
        if (e._startDate) {
            if (e._startDate >= date) {
                return true;
            }
            if (e._endDate && e._endDate <= date)
                return true;
        }
        return false;
    }

   

    public static getGroup(e: GraphElement): string | undefined {        
        if (e.group !== undefined) {
            return e.group;
        }
        else if (e.class !== undefined) {
            return GraphElement.getGroup(e.class);
        }
        else {
            if (e.type === 'edge' && e.from) {
                return GraphElement.getGroup(e.from);
            } else {                
                return undefined;
            }
        }
    }


    public static getBackgroundColor(e: GraphElement, activated?: boolean): string {
        if (e.backgroundColor !== undefined) {
            if (activated !== null) {
                if (!activated) {
                    return e.backgroundColor;
                }
            }
            return e.backgroundColor;
        }
        else if (e.class !== undefined) {
            return GraphElement.getBackgroundColor(e.class, activated);
        }
        else {
            if (e.type === 'edge' && e.from) {
                return GraphElement.getBackgroundColor(e.from, activated);
            } else {
                return 'blue';
            }
        }
    }
    public static getTitle(e: GraphElement, clean = false): string {
        if (e.properties && e.properties.hasOwnProperty('name')) { return e.properties.name; }
        if (e.properties && e.properties.hasOwnProperty('title')) { return e.properties.title; }
        if (e.title !== undefined) {
            return (clean) ? e.title : e.title.toLowerCase().split('_').join(' ');
        }
        else if (e.class) {
            return GraphElement.getTitle(e.class);
        }
        else {
            return e.id || '';
        }
    }

    public static getTimeVisibility(e: GraphElement, date: Date): boolean {
        return !GraphElement.outOfRange(e, date);
    }

 

    public static getDerivatives(element: GraphElement, classId?: string[], res: GraphElement[] = [], checked: string[] = [], depth = 0): GraphElement[] {
        if (!element.id || checked.indexOf(element.id) >= 0 || depth > 3) { return res; }

        checked.push(element.id);
        if (element._outgoing) {
            for (const outRel of element._outgoing) {
                if (outRel.id && !outRel.isType && (classId === undefined || (outRel.classId && classId.indexOf(outRel.classId) >= 0)) && outRel.to) {
                    // let id = outRel.id + element.id;
                    // if (res.findIndex(e => e.id === id) === -1) {
                    if (depth >= 0 && (outRel.classId === 'locatedIn' || outRel.classId === 'writtenBy' || outRel.classId === 'recognized' || outRel.classId === 'leaderOf' || outRel.classId === 'contains')) {
                        let rel = { id: outRel.id + element.id, type: "edge", class: outRel.class, to: outRel.to, from: element, classId: outRel.classId, _parent: element, properties: outRel.properties } as GraphElement;
                        if (!rel.properties) { outRel.properties = {} };
                        if (rel.properties && !rel.properties.hasOwnProperty('reliability') && rel.to && rel.to.properties && rel.to.properties.hasOwnProperty('reliability')) {
                            rel.properties.reliability = rel.to.properties.reliability;
                        }
                        res.push(rel);
                    }
                    GraphElement.getDerivatives(outRel.to, ['locatedIn', 'detectedEvent', 'writtenBy', 'leaderOf', 'participantOf', 'contains', 'partOf'], res, checked, depth + 1);
                    // }
                }

            }

        }

        if (element._incomming) {
            for (const inRel of element._incomming) {
                if (!inRel.isType && (classId === undefined || (inRel.classId && classId.indexOf(inRel.classId) >= 0)) && inRel.to) {
                    // let id = inRel.id + element.id;
                    // if (res.findIndex(e => e.id === id) === -1) {
                    if (depth >= 0 && (inRel.classId === 'recognized' || inRel.classId === 'participantOf' || inRel.classId === 'detectedEvent')) {
                        let rel = { id: inRel.id + element.id, type: "edge", class: inRel.class, to: element, from: inRel.from, classId: inRel.classId, _parent: element } as GraphElement;
                        // if (inRel.properties !== undefined) // && inRel.properties.hasOwnProperty('reliability')) {

                        // }
                        rel.properties = inRel.properties;

                        res.push(rel);
                    } else {
                        console.log(inRel.classId);
                    }
                    GraphElement.getDerivatives(inRel.to, ['recognized', 'participantOf', 'partOf', 'detectedEvent', 'contains'], res, checked, depth + 1);
                    // }
                }
            }
        }
        return res;

    }

    public static updateDerivatives(element: GraphElement) {
        element._derivatives = GraphElement.getDerivatives(element, undefined, []);
        console.log('Update derivatives');
    }

    public static getVisibility(e: GraphElement, filters?: GraphSettings): boolean {
        if (e._included) {
            return true;
        }

        if (filters) {
            if (e.classId) {
                if (e.classId === 'instance' && !filters.showInstance) {
                    return false;
                }

                if (e.classId === 'INSTANCE_OF' && !filters.showInstance) {
                    return false;
                }
            }
            if (!filters.showExternal && e.properties && e.properties.external) {
                return false;
            }
            if (filters.filterTimeline && filters.focusDate) {
                if (!GraphElement.getTimeVisibility(e, filters.focusDate)) {
                    return false;
                }
            }
        }
        if (filters && filters.filterTimeline && filters.focusDate) {
            if (!GraphElement.getTimeVisibility(e, filters.focusDate)) {
                return false;
            }
        }
        if (e._visible !== undefined && e._visible === false) {
            return false;
        }
        if (e.class) {
            return GraphElement.getVisibility(e.class, filters);
        }
        if (e._visible === undefined) {
            return true;
        } else return e._visible;

    }
}

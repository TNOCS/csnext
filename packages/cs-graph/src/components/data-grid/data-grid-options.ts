
import { WidgetOptions } from "@csnext/cs-core";
import { GraphElement, GraphFilter } from "@csnext/cs-data";

export enum GridView {
    table,
    cards,    
    calendar,
    tree    
}

export class NewRelation {
    public key?: string;
    public toId?: string;
    public fromId?: string;
}

export class DataGridRelationToggle {
    public enabled?: boolean;
    public classId?: string;
    public relationClassId?: string;
    public toId?: string;
    public fromId?: string;
}

export class DataGridCalendarOptions {
    public type?: string;
}

export class DataGridOptions extends WidgetOptions {
    public baseType?: string;
    public askForName?: boolean;
    public askForNewForm?: boolean;
    public graphSelect?: boolean;
    public selectedHeaders?: DataGridHeader[];
    public showHeader = true;
    public showRowIcon = true;
    public onSelect?: (element: GraphElement)=>{};
    public onAfterAdded?: (element: GraphElement)=> Promise<any>;
    public defaultView : GridView = GridView.table;    
    public treeStructure?: string[];
    public parentProperty?: string;
    public baseTreeItem?: GraphElement;
    public groupId?: string;
    public canDelete?: boolean;
    public relationToggle?: DataGridRelationToggle;    
    public calendarOptions?: DataGridCalendarOptions;

    public filter?: GraphFilter;
    public newItem?: any;
    public newRelations?: any[];
}

export class DataGridFilter {
    public key?: string;
    public value?: string;
}

export class DataGridHeader {
    public key?: string;
    public width?: string | number;
}
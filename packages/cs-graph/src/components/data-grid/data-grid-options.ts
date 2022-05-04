import { IMenu, IWidget, WidgetOptions, CardSize } from '@csnext/cs-core';
import { GraphElement, GraphFilter, IGraphFilter, NodeRule, PropertyType } from '@csnext/cs-data';
import { DocDatasource, ISuggestionEngine } from '../..';

export enum GridView {
  list = 'list',
  table = 'table',
  cards = 'cards',
  calendar = 'calendar',
  tree = 'tree',
  news = 'news',
  grid = 'grid',
  kanban = 'kanban',  
  timeline_vertical = 'timeline_vertical',
  timeline = 'timeline'
}

export enum SplitView {
  disabled = 'disabled',
  horizontal = 'horizontal',
  vertical = 'vertical'
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
  public editProperties?: boolean;
}

export class DataGridCalendarOptions {
  public type?: string;
}

export class LinkOptions {
  public key?: string;
  public id?: string;

  // feature type id
  public baseTypeId?: string;
}

export class DataGridNewsOptions {
  sourceElement?: string;
  sourceProperty?: string;
  dateProperty?: string;
  itemHeight?: number;
}

export class DataGridGridOptions {
  public display?: 'card' | 'media';  
  public cols?: number;
  public imageProperty?: string;
  public contentTypeProperty?: string;
  public imagePreviewProperty?: string;
}


export class DataGridKanbanOptions {
  public columnProperty?: string;  
  public columnRelation?: string;
  public undefinedSupported?: boolean;
  public columnPropertySelection?: string[];
  public componentView?: boolean;
  public columnWidth?: string | number;
  public cardHeight?: string | number;
}

export class TimelineOptions {

}

export type NewRelationDefinition = {
  key: string;
  relationClassId?: string;
  toId?: string;
  fromId?: Function | string;
}


export class DataGridTableOptions {
  public selectedHeaders?: DataGridHeader[];
  public showHeader? = true;
  public showRowIcon? = true;  
}

export class GroupOptions {
  public enabled?: boolean;
  public property?: string;
  public _propertyType?: PropertyType;
}

export class DataGridTreeOptions {
  public treeStructure?: string[];
  public parentProperty?: string;
  public baseTreeItem?: GraphElement;
}

export class DataGridCardsOptions {
  public cardSize?: 'small' | 'medium' | 'large';  
}

export class DataGridOptions extends WidgetOptions {
  public baseType?: string;
  public addNodesWithTimeseries?: boolean;
  public askForName?: boolean;
  public askForNewForm?: boolean;
  public graphSelect?: boolean;
  public splitView?: SplitView = SplitView.disabled;
  public splitWidget?: IWidget;
  public splitWidgetLocations?: string[];
  
  public hideFilter? = false;
  public hideViewSwitch? = false;
  public onSelect?: (element: GraphElement) => void;
  public onAfterAdded?: (element: GraphElement) => Promise<any>;
  public defaultView: GridView = GridView.table;
  
  public graphPresetId?: string;
  public customSort?: (a: GraphElement, b: GraphElement) => number;
  
  public grouping?: GroupOptions;
  
  public canDelete? = true;
  public canAdd?: boolean;
  public editNewItem?: boolean;
  public editorDialog?: IWidget;
  public canEdit? = true;
  public canSearch? = true;
  public canLink? = false;
  public searchFilter?: string;
  public canSort? = false;
  public canGraph? = true;
  public canFilter? = false;
  public relationToggle?: DataGridRelationToggle;
  public calendarOptions?: DataGridCalendarOptions;
  public tableOptions?: DataGridTableOptions;
  public checkboxProperty?: string;
  public syncMode?: 'normal' | 'follow' = 'normal';
  public linkOptions?: LinkOptions;
  public newsOptions?: DataGridNewsOptions;
  public kanbanOptions?: DataGridKanbanOptions;
  public timelineOptions?: TimelineOptions;
  public treeOptions?: DataGridTreeOptions;
  public gridOptions?: DataGridGridOptions;
  public cardOptions?: DataGridCardsOptions;
  
  
  public hideHeader?: boolean = false;

  public nodeRules?: NodeRule[] = [];

  /* This is a list of potential properties that are used to filter the data. */
  public filterProperties?: string[];
  public filterProperty?: string;
  public filterValue?: any
  
  public radialProperty?: string;
  public horizontalProperty?: string;
  public preset?: string;

  public filter?: GraphFilter;  
  public newItem?: any;
  public newRelations?: NewRelationDefinition[];
  // ids of actions that will be visible on card or list
  public prominentActions?: string[];

  // list of additional actions available within datagrid
  public additionalActions?: IMenu[] | getActions;

  // engine that can suggest items for the datagrid
  public suggestionEngines?: ISuggestionEngine[];
}

export type getActions = (e: GraphElement, src: DocDatasource) => IMenu[];

export class DataGridHeader {
  public key?: string;
  public width?: string | number;
}

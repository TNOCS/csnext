import { IMenu, WidgetOptions } from '@csnext/cs-core';
import { GraphElement, GraphFilter, IGraphFilter } from '@csnext/cs-data';

export enum GridView {
  table = 'table',
  cards = 'cards',
  calendar = 'calendar',
  tree = 'tree',
  news = 'news',
  kanban = 'kanban'
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

export class DataGridNewsOptions {
  sourceElement?: string;
  sourceProperty?: string;
  dateProperty?: string;
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

export type NewRelationDefinition = {
  key: string;
  relationClassId?: string;
  toId?: string;
  fromId?: Function | string;
}

export class DataGridOptions extends WidgetOptions {
  public baseType?: string;
  public addNodesWithTimeseries?: boolean;
  public askForName?: boolean;
  public askForNewForm?: boolean;
  public graphSelect?: boolean;
  public selectedHeaders?: DataGridHeader[];
  public showHeader = true;
  public hideFilter? = false;
  public hideViewSwitch? = false;
  public showRowIcon? = true;
  public onSelect?: (element: GraphElement) => {};
  public onAfterAdded?: (element: GraphElement) => Promise<any>;
  public defaultView: GridView = GridView.table;
  public treeStructure?: string[];
  public parentProperty?: string;
  public graphPresetId?: string;
  public customSort?: (a: GraphElement, b: GraphElement) => number;
  public baseTreeItem?: GraphElement;
  public groupId?: string;
  public canDelete? = true;
  public canAdd?: boolean;
  public canEdit? = true;
  public canSort? = false;
  public canGraph? = true;
  public canFilter? = false;
  public relationToggle?: DataGridRelationToggle;
  public calendarOptions?: DataGridCalendarOptions;
  public checkboxProperty?: string;
  public syncMode?: 'normal' | 'follow' = 'normal';
  public newsOptions?: DataGridNewsOptions;
  public kanbanOptions?: DataGridKanbanOptions;

  /* This is a list of potential properties that are used to filter the data. */
  public filterProperties?: string[];
  public filterProperty?: string;
  public filterValue?: any
  
  public radialProperty?: string;
  public horizontalProperty?: string;
  

  public filter?: GraphFilter;
  public newItem?: any;
  public newRelations?: NewRelationDefinition[];
  public additionalActions?: IMenu[];
}

export class DataGridHeader {
  public key?: string;
  public width?: string | number;
}

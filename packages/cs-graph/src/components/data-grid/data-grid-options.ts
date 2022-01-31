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
  public canGraph? = true;
  public relationToggle?: DataGridRelationToggle;
  public calendarOptions?: DataGridCalendarOptions;
  public checkboxProperty?: string;
  public syncMode?: 'normal' | 'follow' = 'normal';
  public newsOptions?: DataGridNewsOptions;
  public kanbanOptions?: DataGridKanbanOptions;

  public filter?: GraphFilter;
  public newItem?: any;
  public newRelations?: any[];
  public additionalActions?: IMenu[];
}

export class DataGridHeader {
  public key?: string;
  public width?: string | number;
}

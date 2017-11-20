import { DashboardOptions } from './dashboardoptions';
import { SidebarOptions } from './project';
import { Widget, WidgetOptions } from './widget';
import { Page } from './page';



export class Dashboard {
    // dashboard id
    public id?: string;

    // router path
    public path?: string;

    // dashboard title
    public title?: string;

    // manager that is responsible for layout
    public manager?: string;

    public options?: DashboardOptions;

    // list of widgets
    public widgets: Widget[] = [];
    public active?: boolean;

    public icon?: string;

    public defaultWidgetOptions?: WidgetOptions;

    public leftSidebar?: SidebarOptions = {};

    // optional list of sub dashboards
    public dashboards?: Dashboard[];
    
}
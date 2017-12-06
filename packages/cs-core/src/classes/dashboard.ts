import { IDashboardOptions } from './dashboardoptions';
import { SidebarOptions } from './project';
import { IWidget, IWidgetOptions } from './widget';
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

    public options?: any; // IDashboardOptions;

    // list of widgets
    public widgets: IWidget[] = [];
    public active?: boolean;

    public icon?: string;

    public defaultWidgetOptions?: IWidgetOptions;

    public leftSidebar?: SidebarOptions = {};

    // optional list of sub dashboards
    public dashboards?: Dashboard[];
}

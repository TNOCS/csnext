import { IDashboardOptions } from './dashboardoptions';
import { SidebarOptions } from './sidebaroptions';
import { IWidget, IWidgetOptions } from './widget';
import { Page } from './page';
import { IDashboardManager } from '../index';

export class Dashboard {
    // dashboard id
    public id?: string;

    // router path
    public path?: string;

    // dashboard title
    public title?: string;

    // manager that is responsible for layout
    public layout?: string;

    // manager id that is responsible for managing dashboard
    public manager?: string;

    // active dashboard manager (if set in manager)
    // tslint:disable-next-line:variable-name
    public _manager?: IDashboardManager;

    public options?: any; // IDashboardOptions;

    // list of widgets
    public widgets?: IWidget[] = [];
    public active?: boolean;

    public icon?: string;

    // id of default datasource
    public datasource?: string;

    // if datasource is set, result will be available in content
    public content?: any;

    public defaultWidgetOptions?: IWidgetOptions;

    public leftSidebar?: SidebarOptions = {};

    // optional list of sub dashboards
    public dashboards?: Dashboard[];

}

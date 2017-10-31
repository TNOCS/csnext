import { Dashboard } from './dashboard';
import { IDataSource } from './datastore';
import { IServiceConfig } from "./serviceconfig";

export class Project {

    public id?: string;
    public title?: string;
    public navigation?: NavigationOptions = {};
    public footer?: FooterOptions = {};
    public dataSources? : { [id : string] : IDataSource} = {};
    public dashboards?: Dashboard[] =[];
    public services? : { [id: string] : IServiceConfig} = {};
    public leftSidebar? : SidebarOptions = { };
    public theme? : AppTheme;
    
    public constructor() {                    
    }
}

// Application look and feel
export class AppTheme {
    dark = false;
    primary = "red";
}

export class SidebarOptions {
    public open?: boolean;
    public title?: string;
    public component?: any;
    public mini?: boolean;
    public clipped?: boolean;
}

export class NavigationOptions {
    public style?: string;
}

export class FooterOptions {
    public enabled?: boolean;
    public text?: string;
    public absolute?: boolean;
}




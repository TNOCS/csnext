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

export class AppTheme {
    dark = false;
    primary =  "$blue.darken-2"
    accent = "$blue.accent-2"
    secondary = "$grey.darken-3"
    info = "$blue.base"
    warning= "$amber.base"
    error = "$red.base"
    success = "$green.base"
}

export class SidebarOptions {
    public open?: boolean;
    public title?: string;
    public component?: any;
    public mini?: boolean;
}

export class NavigationOptions {
    public style?: string;
}

export class FooterOptions {
    public enabled?: boolean;
    public text?: string;
    public absolute?: boolean;
}




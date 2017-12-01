import { IDatasource, Dashboard, IServiceConfig } from './../index';

export class Project {

    public id?: string;
    public title?: string;
    public logo?: string;
    public navigation?: NavigationOptions = {};
    public footer?: FooterOptions = {};
    public dataSources?: { [id: string]: IDatasource } = {};
    public dashboards?: Dashboard[] = [];
    public services?: { [id: string]: IServiceConfig } = {};
    public leftSidebar?: SidebarOptions = {};
    public rightSidebar?: SidebarOptions = {};
    public theme?: AppTheme;
    public constructor() {
    }
}

export class ThemeColors {
    primary = '#1976D2';
    secondary = '#424242';
    accent = '#82B1FF';
    error = '#FF5252';
    info = '#2196F3';
    success = '#4CAF50';
    warning = '#FFC107';
}

// Application look and feel
export class AppTheme {
    dark?: boolean;
    colors?: ThemeColors;

}


export class SidebarOptions {
    public open?: boolean;
    public title?: string;
    public component?: any;
    public permanent?: boolean;
    public persistent?: boolean;
    public temporary?: boolean;
    public floating?: boolean;
    public mini?: boolean;
    public clipped?: boolean;
}

export class NavigationOptions {
    public style?: string;
    public hideTitle?: boolean;
    public hideMenuToggle?: boolean;
    public floating?: boolean;
}

export class FooterOptions {
    public enabled?: boolean;
    public text?: string;
    public absolute?: boolean;
}




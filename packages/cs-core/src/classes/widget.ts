export enum WidgetType {
    component,
    html
}

export interface Widget {
    id?: string;
    title?: string;
    type?: WidgetType;
    reference?: string;
    component?: any;
    data?: any;
    sideBar?: 'left' | 'right';
}
import { IMenu, INotification } from '@csnext/cs-core';
import { GraphElement } from '@csnext/cs-data';
import { DocDatasource } from './..'

export interface ISearchPlugin {
    id: string;
    title: string;
    description?: string;
    component?: any;
    image: string;
    options?: any;
    createDialog?(source: DocDatasource, element?: GraphElement, options?: any, actions?: IMenu[]) : INotification;
    actions?(element: GraphElement, source: DocDatasource, options?: any) : IMenu[];
    callSearch?(text: string, source?: DocDatasource, options?: any) : Promise<ISearchPluginResult>;
}

export interface ISearchPluginResult {    
    results?: GraphElement[];
    error?: string;
}



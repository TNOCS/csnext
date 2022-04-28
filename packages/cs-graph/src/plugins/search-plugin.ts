import { IMenu } from '@csnext/cs-core';
import { GraphElement } from '@csnext/cs-data';
import { DocDatasource } from './..'

export interface ISearchPlugin {
    id: string;
    title: string;
    description?: string;
    component?: any;
    image: string;
    options?: any;
    actions(element: GraphElement, source: DocDatasource) : IMenu[];
    callSearch?(text: string) : Promise<ISearchPluginResult>;
}

export interface ISearchPluginResult {    
    results?: GraphElement[];
    error?: string;
}



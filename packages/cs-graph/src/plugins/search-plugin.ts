import { GraphElement } from '@csnext/cs-data';

export interface ISearchPlugin {
    id: string;
    title: string;
    description?: string;
    component?: any;
    image: string;
    options?: any;
    callSearch?(text: string) : Promise<ISearchPluginResult>;
}

export interface ISearchPluginResult {    
    results?: GraphElement[];
    error?: string;
}



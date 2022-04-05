import { GraphElement } from '@csnext/cs-data';

export interface IActionPlugin {
    id: string;
    title: string;
    description?: string;
    component?: any;
    image: string;
    options?: any;
    // callSearch?(text: string) : Promise<ISearchPluginResult>;
    
}

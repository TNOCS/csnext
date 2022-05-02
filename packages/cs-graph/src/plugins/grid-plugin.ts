import { IMenu } from '@csnext/cs-core';

export interface IGridPlugin {
    id: string;
    title: string;
    description?: string;
    component?: any;
    icon: string;
    optionsId?: string;
    options?: any;
    actions?: IMenu[];    
}




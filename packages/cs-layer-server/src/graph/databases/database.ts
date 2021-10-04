import { GraphDatasource, GraphElement } from '@csnext/cs-data';
import { Request } from 'express';
import { Link } from './link';
import { GraphSchema, ObservationType } from './schema';

export interface IQuery {
    query: string;
    params: any;
    result?: any;
}

export interface IData {
    type: 'n' | 'e';
    document: any;
    id: string;
    class: string;
    result?: any;
    to?: string;
    from?: string;
}

export interface IAllOptions {
    type?: string;
    flat?: boolean;
    object?: boolean;
}

export interface IDatabase {
    init(source: GraphDatasource): Promise<boolean>;
    reset(): Promise<boolean>;
    store(data: IData, source?: string, updatedTime?: number): Promise<any>;
    remove(id: string): Promise<boolean>;
    storeMultiple(data: IData[], source?: string, updatedTime?: number): Promise<any>;
    appendMultiple?(data: IData[], source?: string, updatedTime?: number): Promise<any>;
    storeArray(documents: any[], idProp: string, type?: string): Promise<any>;
    all?(options?: IAllOptions): Promise<any>;
    loadAll?(): Promise<any>;    
    loadGraph?(graph: {[key: string]: GraphElement}) : Promise<boolean>;
    schema?(): Promise<GraphSchema>;
    types?(): Promise<ObservationType[]>;
    
    link(link: Link): Promise<any>;
    unlinkId?(id: string): Promise<boolean>;
    query(query: any): Promise<any>;
    isRunning?: boolean;
}
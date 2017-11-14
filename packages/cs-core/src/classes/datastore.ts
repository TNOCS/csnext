
export interface IDataSource {
    id?: string;
    handler?: string;
    source?: string;
    data?: any;   
    options?: any;
}

export interface IDataSourceHandler { 
    id : string;
    load(handler : IDataSource): Promise<any>;
    save(): Promise<any>;
}


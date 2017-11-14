
import { IDataSource, IDataSourceHandler } from '@csnext/cs-core';
import { AppState } from './../index';
import axios from 'axios';

export interface WebRequestOptions {
    url: string;
    interval?: number;
}

export class WebRequestDataSourceHandler implements IDataSourceHandler {
    id = "webrequest";

    save(): Promise<any> {
        throw new Error("Method not implemented.");
    }

    static Create(options: WebRequestOptions): IDataSource {
        let wds: IDataSource = {};
        wds.handler = 'webrequest';
        wds.options = options;
        wds.source = options.url;
        return wds;
    }

    load(ds: IDataSource): Promise<any> {
        return new Promise((resolve, reject) => {
            if (ds.source === undefined) { reject('No source defined'); return; }
            axios.get(ds.source).catch(e => { reject(e) }).then(response => {
                if (response) {
                    ds.data = response.data;
                    resolve(ds.data);
                }
            });
        });
    }
}

AppState.Instance.AddDataSourceHandler(new WebRequestDataSourceHandler());
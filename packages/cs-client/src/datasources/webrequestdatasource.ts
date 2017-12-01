
import { IDatasource, IDatasourceHandler, IDatasourceProcessor } from '@csnext/cs-core';
import { AppState } from './../index';
import axios from 'axios';

export interface WebRequestOptions {
    url: string;
    interval?: number;
}

export class WebRequestDatasourceProcessor implements IDatasourceProcessor {
    id = "webrequest";

    // static Create(options: WebRequestOptions): IDatasource {
    //     let wds: IDatasource = {};
    //     wds.handler = 'webrequest';
    //     wds.options = options;
    //     wds.source = options.url;
    //     return wds;
    // }


    execute(ds: IDatasource): Promise<any> {
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

AppState.Instance.projectManager.datasourceManager.add(new WebRequestDatasourceProcessor());
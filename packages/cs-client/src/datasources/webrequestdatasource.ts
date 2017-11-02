
import { IDataSource, IDataSourceHandler } from '@csnext/cs-core';
import axios from 'axios';

export class WebRequestDataSourceHandler implements IDataSourceHandler {
    id = "webrequest";

    save(): Promise<any> {
        throw new Error("Method not implemented.");
    }

    static Create(url: string): IDataSource {
        let wds: IDataSource = {};
        wds.handler = 'webrequest';
        wds.source = url;
        return wds;
    }

    load(ds: IDataSource): Promise<any> {
        return new Promise((resolve, reject) => {
            if (ds.source === undefined) { reject('No source defined'); return; }
            axios
                .get(ds.source)
                .catch(e => {
                    reject(e)
                })
                .then(response => {
                    if (response) {
                        ds.data = response.data;
                    }
                    resolve(ds.data);
                });
        });
    }
}
import { Injectable, Logger } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';

import { IOfflineOptions } from '../classes/offline-options';
import { join } from 'path';
import fs from 'fs';
import scrape from 'website-scraper';

@Injectable()
export class OfflineService extends AggregateRoot {

    public options: IOfflineOptions;
    public absolutePath: string;

    public ads = ['doubleclick', 'adsystem', 'webstats', 'analytics', 'pagead', 'tracker', 'visualwebsiteoptimizer']

    public init(options: IOfflineOptions) {
        this.options = options;        
        this.absolutePath = this.options.path;
        Logger.log('Offline server initialized', 'offline-server');
        Logger.log(`File server path: ${this.absolutePath}`, 'offline-server');        
    }

    public store(url: string) : Promise<any> {
        return new Promise(async (resolve, reject) => {
            Logger.log(`Storing ${url}`, 'offline')

            const folderName = url.replace(/:\/\//g, '').replace(/\./g, '');
  
            const options = {
                urls: [url],
                urlFilter: (url) => {
                    for (const ad of this.ads) {
                        if (url.indexOf(ad) >= 0) { return false;}                        
                    }
                    return true;                    
                  },
                directory: join(this.absolutePath, folderName)
                };
            scrape(options).then(r => {
                Logger.log(`Storing completed`, 'offline');
                resolve({result: 'OK'});
            }).catch(e => {
                Logger.error(e);
                resolve({result: 'NOTOK'});
                                
            });            
        })

    }

}
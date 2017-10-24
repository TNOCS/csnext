import { ServerConfig } from './config';
import * as express from 'express';
import * as core from '@csnext/cs-core';
import * as cors from 'cors';
import * as httpProxy from 'http-proxy'
import * as request from 'request';
import * as Winston from 'winston';

export class Server {
    public app: express.Express;

    public constructor(public config?: ServerConfig) {
        if (!this.config) {            
            this.config = <ServerConfig>{
                port: 8003
            }
        }
    }

    public Start() {

    }

    public apiProxy(host, port) {
        return
    }

    public Init(callback: Function) {
        Winston.info('Init server');
        this.app = express();
        if (this.config.cors) { 
            Winston.info('Cors enabled');
            this.app.use(cors()); 
        }


        this.app.listen(this.config.port, () => {
            if (this.config.staticFolder) {
                Winston.info('Static folder enabled: ' + this.config.staticFolder);
                this.app.use('/', express.static(this.config.staticFolder));
            };
            if (callback) { callback(); }
            Winston.info('Server listening on port ' + this.config.port);
        });

    }

}

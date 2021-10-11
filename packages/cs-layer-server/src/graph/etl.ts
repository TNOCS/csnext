import { join } from "path";
import fs from 'fs';
import axios from 'axios';
import unzip, { Extract } from 'unzipper';
import { unzipSync } from "zlib";

export class etl {

    public static openJson(path: string): Promise<any | undefined> {
        return new Promise((resolve, reject) => {
            let data = JSON.parse(fs.readFileSync(path).toString());
            resolve(data);
        })
    }

    public static getPath(source: string, file: string, path: string): string {
        let s = join(path, source); //join(__dirname, './../../', 'data', source);
        console.log(s);
        if (!fs.existsSync(s)) {
            fs.mkdirSync(s);
        }
        return join(s, file);
    }

    public static generateHash(text: string) {
        var hash = 0, i, chr;
        if (text.length === 0) return hash;
        for (i = 0; i < text.length; i++) {
            chr = text.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }

    
    public static downloadFileCache2(url: string, path: string, headers?: any, sleep?: number, method: 'GET' | 'POST' = 'GET', body?: string): Promise<string | undefined> {
        const p = etl.getPath('cache', etl.generateHash(url + body) + '.url', path);
        console.log(p);
        return etl.downloadFile2(url, p, undefined, headers, sleep, method, body);
    }

    public static sleep = (milliseconds: number) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
      }

    public static downloadFile2(url: string, targetPath: string, extractPath?: string, headers?: any, sleep?: number, method: 'GET' | 'POST' = 'GET', body?: string): Promise<string> {
        return new Promise((resolve, reject) => {
            console.log(targetPath);
            if (fs.existsSync(targetPath)) {
                resolve(targetPath);
            } else {
                console.log(`starting download ${url}`);
                axios({ method, url: url, responseType: 'arraybuffer', headers: headers, data: body }).then(f => {
                    // console.log(`Writing ${url}`);
                    fs.writeFileSync(targetPath, f.data);
                    if (extractPath) {
                        console.log('unzipping');
                        fs.createReadStream(targetPath)
                            .pipe(Extract({ path: extractPath }));
                        unzipSync(targetPath);
                        if (sleep) {
                            etl.sleep(sleep);
                        }
                        resolve(targetPath);
                    } else {
                        resolve(targetPath);
                    }
                }).catch((e) => {
                    console.log(JSON.stringify(e));
                    if (sleep) {
                        etl.sleep(sleep);
                    }
                    console.log(`Error downloading ${url}`);
                    reject();
                })
            }
        });

    }
}
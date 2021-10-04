import { Injectable, Logger } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { ServerConfig } from '../classes';
import { FileDefinition, FileDefinitionList } from '../classes/file';
import { IFileServerOptions } from '../classes/file-server-options';
import { join } from 'path';
import fs from 'fs';
import axios from 'axios';

@Injectable()
export class FilesService extends AggregateRoot {

    public options: IFileServerOptions;
    public absolutePath: string;

    public init(options: IFileServerOptions) {
        this.options = options;        
        this.absolutePath = this.options.path;
        Logger.log('File server initialized', 'file-server');
        Logger.log(`File server path: ${this.absolutePath}`, 'file-server');        
    }

    public static getFileId(url: string) {
        let id = encodeURIComponent(url).split('%25').join('').split('%20').join('').split('-').join('').split('%').join('');
        if (id.length>120) {
            id = id.substr(id.length - 120, 120);
        }
        return(id);
    }

    
    public loadImage(url: string) : Promise<FileDefinition | undefined> {
        return new Promise((resolve, reject) => {
            
            const id = FilesService.getFileId(url);    
            console.log('load image: ' + id);
            const path = join(this.absolutePath, id);                
            if (fs.existsSync(path)) {                
                resolve({id: id, name: id});                
            } else {
                try {
                    const writer = fs.createWriteStream(path);            
                    
                    const response = axios({
                        url,
                        method: 'GET',
                        responseType: 'stream'
                    }).then(r => {
                        try {
                            r.data.pipe(writer);                
                            writer.on('finish', ()=> { resolve({ id: id, name: id}) })
                            writer.on('error', () => resolve({ id: '', name: '' }))
                        } catch (e) {
                            resolve({ id: '', name: ''})
                        }
                        
                    }).catch(e => {
                        resolve({ id: '', name: '' })
                    })
                }
                catch(e) {
                    resolve({ id: '', name: ''});
                }                                
            }
        })            

    }

    public saveFile(file?: Express.Multer.File) : Promise<FileDefinition | undefined> {
        return new Promise((resolve, reject) => {            
            if (file?.buffer) {
                const fp = join(this.absolutePath, file.originalname);
                Logger.log(`Saving file to ${fp}`);
                try {                    
                    fs.writeFileSync(fp, file.buffer);
                    resolve({id: file.originalname, name: file.originalname});
                } catch(e) {
                    Logger.error(`Error saving ${fp}`);                
                    reject();
                }                
            } else {
                resolve(undefined);
            }
        })
    }

    public getFile(fid: string, url?: string) : Promise<Buffer | undefined> {
        return new Promise(async (resolve, reject) => {                        
            const fp = join(this.absolutePath, fid);            
            if (!fs.existsSync(fp) && url) {
                try {
                    await this.loadImage(url);
                } catch (e) {
                    Logger.error('unable to get/save image');
                    resolve(undefined);
                }
            }
            if (fs.existsSync(fp)) {
                try {
                    Logger.log(`Returning file: ${fp}`);
                    const buffer = fs.readFileSync(fp);
                    resolve(buffer);
                } catch(e) {
                    Logger.error(`Error opening file: ${fp}`);
                    reject();
                }
            } else {
                
                Logger.error('file does not exist');
                resolve(undefined);
            }            
        })
    }
    
    public getFiles() : Promise<FileDefinitionList> {
        return new Promise((resolve, reject) => {
            const res : FileDefinitionList = [];
            const files = fs.readdirSync(this.options.path);
            for (const file of files) {                
                res.push({
                    id: file,
                    name: file
                });    
            }
            resolve(res);
        })

        
    }
}
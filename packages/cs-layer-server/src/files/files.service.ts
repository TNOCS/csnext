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
        const id = encodeURIComponent(url).split('%25').join('').split('%20').join('').split('-').join('').split('%').join('');
        return(id);
    }

    
    public async loadImage(url: string) : Promise<FileDefinition | undefined> {

            const id = FilesService.getFileId(url);

            const path = join(this.absolutePath, id);                
            const writer = fs.createWriteStream(path)
              
            const response = await axios({
                url,
                method: 'GET',
                responseType: 'stream'
            })
            
            response.data.pipe(writer)
            
            return new Promise((resolve, reject) => {
                writer.on('finish', resolve)
                writer.on('error', reject)
            })
            

            
            // if (!fs.existsSync(fp)) {
            //     axios.get(url).then(r => {
            //         if (r.data) {
            //             fs.writeFileSync(fp, r.data);
            //             resolve({id: id, name: url});    
            //         }
            //     }).catch(e => {
            //         Logger.error(e);
            //         reject(e);
            //     })
            // } else {
            //     resolve({id: id, name: id});
            // }            

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

    public getFile(fid: string) : Promise<Buffer | undefined> {
        return new Promise((resolve, reject) => {            
            console.log(fid);
            const fp = join(this.absolutePath, fid);            
            console.log(fp);
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
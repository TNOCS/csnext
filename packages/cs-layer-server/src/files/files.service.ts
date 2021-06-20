import { Injectable, Logger } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { ServerConfig } from '../classes';
import { FileDefinition, FileDefinitionList } from '../classes/file';
import { IFileServerOptions } from '../classes/file-server-options';
import { join } from 'path';
import fs from 'fs';

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

    public getFile(id: string) : Promise<Buffer | undefined> {
        return new Promise((resolve, reject) => {            
            const fp = join(this.absolutePath, id);
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
export class FileDefinition {
    public name?: string;
    public id?: string;
    public format?: string;
    public public_url?: string;
}

export class FileDefinitionList extends Array<FileDefinition> {

}
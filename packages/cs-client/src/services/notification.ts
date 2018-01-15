export class Notification {
    public type?: string;
    public title?: string;
    public remember?: boolean;
    public created?: Date;
    // tslint:disable-next-line:variable-name
    public _visible?: boolean;
    public timeout?: number;
}

export interface INotification {
    type?: string;
    title?: string;
    remember?: boolean;
    created?: Date;
    // tslint:disable-next-line:variable-name
    _visible?: boolean;
    timeout?: number;
}

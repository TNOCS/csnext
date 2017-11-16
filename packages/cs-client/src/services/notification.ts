export interface Notification {
    type?: string;
    title?: string;
    remember?: boolean;
    created?: Date;
    _visible: boolean;
    timeout: number;
}
    
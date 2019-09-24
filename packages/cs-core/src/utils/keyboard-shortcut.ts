
export class KeyboardShortcut {
    public id?: string;
    public code!: string;
    public alt?: boolean;
    public shift?: boolean;
    public ctrl?: boolean;
    public _callback?: Function;
}
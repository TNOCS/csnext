export class Logger {
    private static instance: Logger;

    private constructor() {
    }

    public static get Instance() {
        // Do you need arguments? Make it a regular method instead.
        return this.instance || (this.instance = new this());
    }

    public info(component: string, msg: any) {
        // tslint:disable-next-line:no-console
        console.info('[' + component + ']', msg);
    }

    public warn(component: string, msg: any) {
        // tslint:disable-next-line:no-console
        console.info('[' + component + ']', msg);
    }

    public error(component: string, msg: any) {
        // tslint:disable-next-line:no-console
        console.info('[' + component + ']', msg);
    }
}

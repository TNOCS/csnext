export class Logger {

    private static _instance: Logger;

    private constructor() {
        //...
    }

    public static get Instance() {
        // Do you need arguments? Make it a regular method instead.
        return this._instance || (this._instance = new this());
    }


    info(component: string, msg: any) {
        console.info('[' + component + ']', msg);
    }

    warn(component: string, msg: any) {
        console.info('[' + component + ']', msg);
    }

    error(component: string, msg: any) {
        console.info('[' + component + ']', msg);
    }

}

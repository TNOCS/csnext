export class Logger {
  public static info(component: string, msg: any) {
    // tslint:disable-next-line:no-console
    console.info(`[${component}]`, msg);
  }

  public static warn(component: string, msg: any) {
    // tslint:disable-next-line:no-console
    console.warn(`[${component}]`, msg);
  }

  public static error(component: string, msg: any) {
    // tslint:disable-next-line:no-console
    console.error(`[${component}]`, msg);
  }

  public static get Instance() {
    // Do you need arguments? Make it a regular method instead.
    return this.instance || (this.instance = new this());
  }

  private static instance: Logger;
}

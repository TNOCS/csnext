import { MessageBusService } from '..';
export class MainBus {
  /** used for singleton  */
  private static pInstance: MainBus;
  private static pEvents: MessageBusService;
  /** Get singleton instance of appstate */
  public static get Instance() {
    return this.pInstance || (this.pInstance = new this());
  }

  public static get events() {
    return this.pEvents || (this.pEvents = new MessageBusService());
  }
  /** Event bus for publish/subscribe events in application */
}

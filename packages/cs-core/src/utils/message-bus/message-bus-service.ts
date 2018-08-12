import { MessageBusHandle, IMessageBusCallback } from './message-bus-handle';

export interface IMessageBusService {
  publish(topic: string, title: string, data?: any): void;
  subscribe(topic: string, callback: IMessageBusCallback): void;

}
/**
 * Simple message bus service, used for subscribing and unsubsubscribing to topics.
 * @see {@link https://gist.github.com/floatingmonkey/3384419}
 */
export class MessageBusService implements IMessageBusService {
  private cache: { [topic: string]: IMessageBusCallback[] } = {};
  private confirms: any[] = [];

  /**
   * Publish to a topic
   */
  public publish(topic: string, title: string, data?: any): void {
    // window.console.log('publish: ' + topic + ', ' + title);
    if (!this.cache[topic]) { return; }
    this.cache[topic].forEach(cb => cb(title, data));
  }

  /**
   * Subscribe to a topic
   * @param {string} topic The desired topic of the message.
   * @param {IMessageBusCallback} callback The callback to call.
   */
  public subscribe(topic: string, callback: IMessageBusCallback): MessageBusHandle {
    if (!this.cache[topic]) { this.cache[topic] = new Array<IMessageBusCallback>(); }
    this.cache[topic].push(callback);
    return new MessageBusHandle(topic, callback);
  }

  /**
   * Unsubscribe to a topic by providing its handle
   */
  public unsubscribe(handle: MessageBusHandle): void {
    const topic = handle.topic;
    const callback = handle.callback;
    if (!this.cache[topic]) { return; }
    this.cache[topic].forEach((cb, idx) => {
      if (cb === callback) {
        this.cache[topic].splice(idx, 1);
        return;
      }
    });
  }
}

import { MessageBusHandle, IMessageBusCallback } from './message-bus-handle';

/**
 * Simple message bus service, used for subscribing and unsubsubscribing to topics.
 * @see {@link https://gist.github.com/floatingmonkey/3384419}
 */
export class MessageBusService {
  private static cache: { [topic: string]: IMessageBusCallback[] } = {};
  private confirms: any[] = [];

  /**
   * Publish to a topic
   */
  public publish(topic: string, title: string, data?: any): void {
    // window.console.log('publish: ' + topic + ', ' + title);
    if (!MessageBusService.cache[topic]) { return; }
    MessageBusService.cache[topic].forEach(cb => cb(title, data));
  }

  /**
   * Subscribe to a topic
   * @param {string} topic The desired topic of the message.
   * @param {IMessageBusCallback} callback The callback to call.
   */
  public subscribe(topic: string, callback: IMessageBusCallback): MessageBusHandle {
    if (!MessageBusService.cache[topic]) { MessageBusService.cache[topic] = new Array<IMessageBusCallback>(); }
    MessageBusService.cache[topic].push(callback);
    return new MessageBusHandle(topic, callback);
  }

  /**
   * Unsubscribe to a topic by providing its handle
   */
  public unsubscribe(handle: MessageBusHandle): void {
    const topic = handle.topic;
    const callback = handle.callback;
    if (!MessageBusService.cache[topic]) { return; }
    MessageBusService.cache[topic].forEach((cb, idx) => {
      if (cb === callback) {
        MessageBusService.cache[topic].splice(idx, 1);
        return;
      }
    });
  }
}

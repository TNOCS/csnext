// Interface for message bus callbacks, i.e. (data: any) => any,
// so you can supply a single data argument of any type, and it may return any type.

export interface IMessageBusCallback {
  (title: string, data?: any);
}

// Handle returned when subscribing to a topic
export class MessageBusHandle {
  public topic: string;
  public callback: IMessageBusCallback;

  constructor(topic: string, callback: IMessageBusCallback) {
    this.topic = topic;
    this.callback = callback;
  }
}

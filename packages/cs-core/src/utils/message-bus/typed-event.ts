
export interface IBaseEvent {
  add(listener: () => void): void;
  remove(listener: () => void): void;
  trigger(...a: any[]): void;
}

export class TypedEvent implements IBaseEvent {
  // Private member vars
  // tslint:disable-next-line:variable-name
  private _listeners: any[] = [];

  public add(listener: () => void): void {
    /// <summary>Registers a new listener for the event.</summary>
    /// <param name='listener'>The callback function to register.</param>
    this._listeners.push(listener);
  }

  public remove(listener?: () => void): void {
    /// <summary>Unregisters a listener from the event.</summary>
    /// <param name='listener'>The callback function that was registered. If missing then all listeners will be removed.</param>
    if (typeof listener === 'function') {
      for (let i = 0, l = this._listeners.length; i < l; l++) {
        if (this._listeners[i] === listener) {
          this._listeners.splice(i, 1);
          break;
        }
      }
    } else {
      this._listeners = [];
    }
  }

  public trigger(...a: any[]): void {
    /// <summary>Invokes all of the listeners for this event.</summary>
    /// <param name='args'>Optional set of arguments to pass to listners.</param>
    // tslint:disable-next-line:prefer-const
    let context = {};
    const listeners = this._listeners.slice(0);
    for (let i = 0, l = listeners.length; i < l; i++) {
      listeners[i].apply(context, a || []);
    }
  }
}

// Exposing events
export interface IMessageEvent extends IBaseEvent {
  add(listener: (message: string) => void): void;
  remove(listener: (message: string) => void): void;
  trigger(message: string): void;
}

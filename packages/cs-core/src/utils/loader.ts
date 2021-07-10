import { guidGenerator } from '..';
import { INotification } from '../interactions/notification';
import { MessageBusService } from './message-bus/message-bus-service';

export class Loader {

  public static LOADERS = 'loaders';
  public static LOADER_ADDED = 'added';
  public static LOADER_REMOVED = 'added';
  public loading: boolean = false;

  protected loaders: { [key: string]: any } = {};

  constructor(private bus?: MessageBusService) { }

  public addLoader(id?: string, title?: string, notification?: INotification): string {
    if (id === undefined) {
      id = guidGenerator();
    }
    if (notification && !notification.title) { notification.title = notification.title ?? notification.id };
    this.loaders[id] = { title: title || id, notification };
    this.loading = Object.keys(this.loaders).length > 0;
    if (this.bus) {
      this.bus.publish(Loader.LOADERS, Loader.LOADER_ADDED, { loaders: this.loaders, id: id, title: title, notification: notification });
    }    
    return id;
  }

  // remove a loader, if this is the last loader it disables the loading icon in the header
  public removeLoader(id: string) {
    if (this.loaders.hasOwnProperty(id)) {
      const notification = this.loaders[id].notification;
      delete this.loaders[id];
      this.loading = Object.keys(this.loaders).length > 0;
      if (this.bus) {
        this.bus.publish(Loader.LOADERS, Loader.LOADER_REMOVED, { loaders: this.loaders, id: id,  notification: notification });
      }
    }
  }

  // returns the list of existing loaders
  public getLoaders(): { [key: string]: string } {
    return this.loaders;
  }
}

import { guidGenerator } from '..';
import { MessageBusService } from './message-bus/message-bus-service';

export class Loader {

  public static LOADERS = 'loaders';
  public static LOADER_UPDATED = 'updated';
  public loading: boolean = false;

  protected loaders: { [key: string]: any } = {};

  constructor(private bus?: MessageBusService) { }

  public addLoader(id?: string, title?: string): string {
    if (id === undefined) {
      id = guidGenerator();
    }
    this.loaders[id] = title || id;
    this.loading = Object.keys(this.loaders).length > 0;
    if (this.bus) {
      this.bus.publish(Loader.LOADERS, Loader.LOADER_UPDATED);
    }
    return id;
  }

  // remove a loader, if this is the last loader it disables the loading icon in the header
  public removeLoader(id: string) {
    if (this.loaders.hasOwnProperty(id)) {
      delete this.loaders[id];
      this.loading = Object.keys(this.loaders).length > 0;
      if (this.bus) {
        this.bus.publish(Loader.LOADERS, Loader.LOADER_UPDATED);
      }
    }
  }

  // returns the list of existing loaders
  public getLoaders(): { [key: string]: string } {
    return this.loaders;
  }
}

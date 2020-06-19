import {
  IProject,
  MessageBusService,
  IDashboard,
  INotification,
  MainBus,
  IWidget,
  ISidebarOptions
} from '..';

export abstract class AppStateBase {
  /** True if the application has been initialized */
  public isInitialized = false;

  /** Project definition */
  public project: IProject = {};

  /** Event bus for publish/subscribe events in application */

  public get bus(): MessageBusService {
    return MainBus.events;
  }
  /** list of past notifications */
  public notifications: INotification[] = [];
  /** Currently active dashboard */
  public activeDashboard?: IDashboard;

  public data: { [id: string]: any } = {};

  public windowSize = { x: 0, y: 0 };

  public abstract openRightSidebarWidget(widget: IWidget, options?: ISidebarOptions);

  public abstract addRightSidebarWidget(widget: IWidget, options?: ISidebarOptions);
}

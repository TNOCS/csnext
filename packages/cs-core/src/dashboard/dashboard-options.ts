import { IDashboard } from './dashboard';
import { DashboardToolbarOptions, ToolbarOptions } from '..';
import { KeyboardShortcut } from '../utils/keyboard-shortcut';

export interface IDashboardOptions {
  class?: string;
  // Fullscreen?: boolean;
  background?: string;
  editButton?: boolean;
  toolbarOptions?: DashboardToolbarOptions;
  closeRightSidebar?: boolean;
  // allow left & right swipe gestures to switch between dashboards
  touchGesturesEnabled?: boolean;
  _dashboard?: IDashboard;
  info?: InfoOptions | string;
  // trigger dashboard using keyboard short cut
  shortcut?: KeyboardShortcut;
}

export class InfoOptions {
  public type: 'html' | 'component' | 'html-url' | 'string' = 'string';
  public component?: any;
  public data: string | any = '';
  public title?: string = '';
}

export class BaseDashboardOptions implements IDashboardOptions {
  public class?: string;
  public background?: string;
  public editButton?: boolean;
  // allow left & right swipe gestures to switch between dashboards
  public touchGesturesEnabled?: boolean;

  // tslint:disable-next-line:variable-name
  public _dashboard?: IDashboard;
  public toolbar?: DashboardToolbarOptions;
  public icon?: string;
  public info?: InfoOptions | string;

}

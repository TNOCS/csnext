import { IDashboard } from './dashboard';
import { DashboardNavigationOptions, ToolbarOptions } from '..';

export interface IDashboardOptions {
  class?: string;
  // Fullscreen?: boolean;
  background?: string;
  editButton?: boolean;
  toolbarOptions?: ToolbarOptions;
  closeRightSidebar?: boolean;
  navigation?: DashboardNavigationOptions;
  // allow left & right swipe gestures to switch between dashboards
  touchGesturesEnabled?: boolean;
  _dashboard?: IDashboard;
}

export class BaseDashboardOptions implements IDashboardOptions {
  public class?: string;
  public background?: string;
  public editButton?: boolean;
  // allow left & right swipe gestures to switch between dashboards
  public touchGesturesEnabled?: boolean;

  // tslint:disable-next-line:variable-name
  public _dashboard?: IDashboard;
  public navigation?: DashboardNavigationOptions;
  public icon?: string;

}

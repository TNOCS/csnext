import { IDashboard } from './dashboard';

export interface IDashboardOptions {
  class?: string;
  // Fullscreen?: boolean;
  Background?: string;
  EditButton?: boolean;
  CloseRightSidebar?: boolean;
  // allow left & right swipe gestures to switch between dashboards
  TouchGesturesEnabled?: boolean;
  _dashboard?: IDashboard;
}

export class BaseDashboardOptions implements IDashboardOptions {
  public class?: string;
  public Background?: string;
  public EditButton?: boolean;
  // allow left & right swipe gestures to switch between dashboards
  public TouchGesturesEnabled?: boolean;

  // tslint:disable-next-line:variable-name
  public _dashboard?: IDashboard;
  public icon?: string;

}

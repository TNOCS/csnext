import { IDashboard } from './dashboard';

export interface IDashboardOptions {
  // Fullscreen?: boolean;
  Background?: string;
  EditButton?: boolean;
  // allow left & right swipe gestures to switch between dashboards
  TouchGesturesEnabled?: boolean;
  _dashboard?: IDashboard;
}

export class BaseDashboardOptions implements IDashboardOptions {

  public Background?: string;
  public EditButton?: boolean;
  // allow left & right swipe gestures to switch between dashboards
  public TouchGesturesEnabled?: boolean;

  // tslint:disable-next-line:variable-name
  public _dashboard?: IDashboard;

}

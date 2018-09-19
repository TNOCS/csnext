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

  public get Background(): string | undefined {
    return this.background;
  }

  public get EditButton(): boolean | undefined {
    return this.editButton;
  }

  public set EditButton(value: boolean) {
    this.editButton = value;
  }

  public get TouchGesturesEnabled(): boolean | undefined {
    return this.touchGesturesEnabled;
  }

  public set TouchGesturesEnabled(value: boolean) {
    this.touchGesturesEnabled = value;
  }

  // tslint:disable-next-line:variable-name
  public _dashboard?: IDashboard;
  // private fullscreen?: boolean;

  // public get Fullscreen(): boolean| undefined {
  //   return this.Fullscreen;
  // }

  // public set Fullscreen(value: boolean | undefined) {
  //   this.fullscreen = value;
  // }

  private background?: string;

  private editButton?: boolean;

  private touchGesturesEnabled?: boolean;

}

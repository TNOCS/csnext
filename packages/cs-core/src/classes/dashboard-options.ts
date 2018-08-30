
export interface IDashboardOptions {
  // Fullscreen?: boolean;
  Background?: string;
  EditButton?: boolean;
  // allow left & right swipe gestures to switch between dashboards
  TouchGesturesEnabled?: boolean;
}

export class BaseDashboardOptions implements IDashboardOptions {
  // private fullscreen?: boolean;

  // public get Fullscreen(): boolean| undefined {
  //   return this.Fullscreen;
  // }

  // public set Fullscreen(value: boolean | undefined) {
  //   this.fullscreen = value;
  // }

  private background?: string;

  public get Background(): string | undefined {
    return this.background;
  }

  private editButton?: boolean;

  public get EditButton(): boolean | undefined {
    return this.editButton;
  }

  public set EditButton(value: boolean) {
    this.editButton = value;
  }

  private touchGesturesEnabled?: boolean;

  public get TouchGesturesEnabled(): boolean | undefined {
    return this.touchGesturesEnabled;
  }

  public set TouchGesturesEnabled(value: boolean) {
    this.touchGesturesEnabled = value;
  }

}

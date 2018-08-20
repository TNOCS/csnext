
export interface IDashboardOptions {
  // Fullscreen?: boolean;
  Background?: string;
  EditButton?: boolean;
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

  public get Background(): string| undefined {
    return this.background;
  }

  private editButton?: boolean;


  public get EditButton(): boolean| undefined {
    return this.editButton;
  }

  public set EditButton(value: boolean) {
    this.editButton = value;
  }

}

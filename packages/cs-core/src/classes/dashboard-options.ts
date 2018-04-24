export interface IDashboardOptions {
  fullscreen?: boolean;
  background?: string;
  editButton?: boolean;
}

export interface IGridDashboardOptions extends IDashboardOptions {
  gap?: number;

}

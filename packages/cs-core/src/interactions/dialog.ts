export interface IDialog {
  visible?: boolean;
  hide?: boolean;
  title?: string;
  text?: string;
  component?: any;
  persistent?: boolean;
  fullscreen?: boolean;
  scrollable?: boolean;
  // toolbar?: boolean;
  data?: any;
  width?: number | string;
  actions?: string[];
  actionCallback?(action: string);
}

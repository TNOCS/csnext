export interface IDialog {
  visible: boolean;
  title?: string;
  component?: any;
  fullscreen?: boolean;
  scrollable?: boolean;
  toolbar?: boolean;
  data?: any;
}

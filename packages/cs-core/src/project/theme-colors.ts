import { Form, FormField } from './../form/form-decorators';

export interface IThemeColors {
  primary?: string; // '#1976D2';
  secondary?: string; // '#424242';
  accent?: string; // '#82B1FF';
  error?: string; // '#FF5252';
  info?: string; // '#2196F3';
  success?: string; // '#4CAF50';
  warning?: string; // '#FFC107';
  menu?: string; // '#000';
  headerBackground?: string;
  headerColor?: string;
}

@Form({ title: 'Theme Colors' })
export class ThemeColors implements IThemeColors {

  // constructor(value?: ThemeColors) {
  //   if (value) {
  //     Object.assign(this, value);
  //   }
  // }

  @FormField({title: 'Primary', type: 'string'})
  public primary?: string; // '#1976D2';
  @FormField({title: 'Secondary', type: 'string'})
  public secondary?: string; // '#424242';
  @FormField({title: 'Accent', type: 'string'})
  public accent?: string; // '#82B1FF';
  @FormField({title: 'Error', type: 'string'})
  public error?: string; // '#FF5252';
  public info?: string; // '#2196F3';
  public success?: string; // '#4CAF50';
  public warning?: string; // '#FFC107';
  public menu?: string; // '#000';
  public headerBackground?: string;
  public headerColor?: string;
}

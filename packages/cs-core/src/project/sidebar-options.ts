import { IWidget, IDashboard } from './..';
import { FormField, Form } from '../form/form-decorators';

export interface ISidebarOptions {
  open?: boolean;
  title?: string;
  titleClose?: string;
  component?: any;
  right?: boolean;
  permanent?: boolean;
  persistent?: boolean;
  temporary?: boolean;
  floating?: boolean;
  mini?: boolean;
  clipped?: boolean;
  canPin?: boolean;
  dashboard?: IDashboard;
  widget?: IWidget;
  canMinify?: boolean;
  canResize?: boolean;
  width?: number;
  visible?: boolean;
  footer?: ISidebarFooterOptions;
  closeButton?: boolean;
  sidebars?: { [key: string]: IDashboard };
}

export interface ISidebarFooterOptions {
  icon?: string;
  tooltip?: string;
  title?: string;
}

@Form({ title: 'Sidebar' })
export class SidebarOptions implements ISidebarOptions {
  @FormField({title: 'Is Open', type: 'checkbox', group: 'open'})
  open?: boolean;
  title?: string;
  titleClose?: string;
  component?: any;
  right?: boolean;
  @FormField({title: 'Permanent', type: 'checkbox'})
  permanent?: boolean;
  @FormField({title: 'Persistent', type: 'checkbox'})
  persistent?: boolean;
  @FormField({title: 'Temporary', type: 'checkbox'})
  temporary?: boolean;
  @FormField({title: 'Floating', type: 'checkbox'})
  floating?: boolean;
  @FormField({title: 'Mini', type: 'checkbox'})
  mini?: boolean;
  @FormField({title: 'Clipped', type: 'checkbox'})
  clipped?: boolean;
  @FormField({title: 'Can Pin', type: 'checkbox'})
  canPin?: boolean;
  dashboard?: IDashboard;
  widget?: IWidget;
  @FormField({title: 'Can be minified', type: 'checkbox'})
  canMinify?: boolean;
  @FormField({title: 'Width', type: 'number'})
  width?: number;
  @FormField({title: 'Visible', type: 'checkbox'})
  visible?: boolean;
  footer?: ISidebarFooterOptions;
  sidebars?: {
    [key: string]: IDashboard;
  };
}
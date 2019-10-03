import { IMenu, ToolbarOptions } from './../';
import { FormField, Form } from '../form/form-decorators';

@Form({ title: 'Widget Options' })
export class WidgetOptions {
  public datasource?: string;
  public class?: string;
  public width?: number;
  public height?: number;
  public margin?: number;
  @FormField({ title: 'Background Color', type: 'string' })
  public backgroundColor?: string;
  public x?: number;
  public y?: number;
  /** set as dashboard background widget */
  public background?: boolean;
  public canRemove?: boolean;
  public canEdit?: boolean;
  public menus?: IMenu[];
  public widgetBorder?: string;
  @FormField({ title: 'Hide menu', type: 'checkbox' })
  public hideMenu?: boolean;
  public hide?: boolean;
  @FormField({ title: 'Show toolbar', type: 'checkbox' })
  public showToolbar?: boolean;
  // @FormField({title: 'Toolbar options', type: 'object'})
  public toolbarOptions?: ToolbarOptions;
  @FormField({ title: 'Title', type: 'string' })
  public title?: string;
  @FormField({ title: 'Elevation', type: 'slider', min: 0, max: 10 })
  public elevation?: number;
  @FormField({ title: 'Flat', type: 'checkbox' })
  public flat?: boolean;
  @FormField({ title: 'Outlined', type: 'checkbox' })
  public outlined?: boolean;
}

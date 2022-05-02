import { IMenu, ToolbarOptions } from './../';
import { FormField, Form } from '../form/form-decorators';
import { SyncStore } from '../utils/sync-store';

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
  @FormField({ title: 'Icon', type: 'string' })
  public icon?: string;
  @FormField({ title: 'Search', type: 'string' })
  public searchProperty?: string;

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
  @FormField({ title: 'Disabled', type: 'checkbox' })
  public disabled?: string;
  @FormField({ title: 'Tile', type: 'checkbox' })
  public tile?: boolean;
  @FormField({ title: 'Elevation', type: 'slider', min: 0, max: 10 })
  public elevation?: number;
  @FormField({ title: 'Flat', type: 'checkbox' })
  public flat?: boolean;
  @FormField({ title: 'Outlined', type: 'checkbox' })
  public outlined?: boolean;
  @FormField({ title: 'Raised', type: 'checkbox' })
  public raised?: boolean;
  /** adds a close button that will remove widget and close rightsidebar */
  public closeSidebarButton?: boolean;
  /** adds a hide button that will close rightsidebar, but not remove widget/menu item */
  public hideSidebarButton?: boolean;
  /** if using a cssgrid dashboard with area defintions, you can define the area defintition here */
  public area?: string;
  public sync?: SyncStore;
}

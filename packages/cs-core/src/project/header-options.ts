import { IWidget } from './..';
import { FormField, Form } from '../form/form-decorators';

export interface IHeaderOptions {
  dense?: boolean;
  title?: string;
  logo?: string;
  hideTitle?: boolean;
  hideLogo?: boolean;
  breadcrumbs?: boolean;
  showNotifications?: boolean;
  showLoadingIcon?: boolean;
  breadcrumbItems?: any[];
  hideToolbar?: boolean;
  titleWidget?: IWidget;
  infoHeader?: IInfoHeaderOptions | boolean;
}

@Form({title: 'Header'})
export class HeaderOptions implements IHeaderOptions {

  constructor(options?: HeaderOptions) {
    if (options) {
      Object.assign(this, options);
    }
  }
  
  @FormField({title: 'Title', type: 'string', group: 'title'})
  public title?: string;
  @FormField({ title: 'Hide title', type: 'checkbox', group: 'title' })
  public hideTitle?: boolean;
  @FormField({title: 'Logo', type: 'string', group: 'logo'})
  public logo?: string;
  @FormField({ title: 'Hide logo', type: 'checkbox', group: 'logo' })  
  public hideLogo?: boolean;
  @FormField({title: 'Dense', type: 'checkbox'})
  public dense?: boolean;
  @FormField({ title: 'Floating', type: 'checkbox' })
  public floating?: boolean;
  @FormField({title: 'Use breadcrumbs', type: 'checkbox'})
  public breadcrumbs?: boolean;
  public showNotifications?: boolean;
  @FormField({title: 'Show loading icon', type: 'checkbox'})
  public showLoadingIcon?: boolean;
  public breadcrumbItems?: any[];
  
  public titleWidget?: IWidget;
  public infoHeader?: IInfoHeaderOptions | boolean;

  @FormField({ title: 'Hide menu toggle', type: 'checkbox' })
  public hideMenuToggle?: boolean;
  @FormField({ title: 'Tabs centered', type: 'checkbox', group: 'tabs' })  
  public tabsCentered?: boolean;
  @FormField({ title: 'Tabs right', type: 'checkbox', group: 'tabs' })  
  public tabsRight?: boolean;
  @FormField({ title: 'Tabs grow', type: 'checkbox', group: 'tabs' })  
  public tabsGrow?: boolean;
  @FormField({ title: 'Tabs hide slider', type: 'checkbox' })  
  public tabsHideSlider?: boolean;  
  @FormField({title: 'Hide toolbar', type: 'checkbox', group: 'toolbar layout'})
  public hideToolbar?: boolean;
  @FormField({ title: 'Flat', type: 'checkbox', group: 'toolbar layout' })
  public flat?: boolean;
  @FormField({ title: 'Elevation', type: 'slider', min: 0, max: 20, group: 'toolbar layout'})
  public elevation?: number = 5;
}

export interface IInfoHeaderOptions {
  
}

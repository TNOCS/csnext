import { IWidget } from './..';
import { FormField, Form } from '../form/form-decorators';

export interface IHeaderOptions {
  // #region Properties (12)

  breadcrumbItems?: any[];
  breadcrumbs?: boolean;
  dense?: boolean;
  hideLogo?: boolean;
  hideTitle?: boolean;
  hideToolbar?: boolean;
  infoHeader?: IInfoHeaderOptions | boolean;
  logo?: string;
  showLoadingIcon?: boolean;
  showNotifications?: boolean;
  title?: string;
  titleWidget?: IWidget;

  // #endregion Properties (12)
}

@Form({title: 'Header'})
export class HeaderOptions implements IHeaderOptions {
  // #region Properties (20)

  public breadcrumbItems?: any[];
  @FormField({title: 'Use breadcrumbs', type: 'checkbox'})
  public breadcrumbs?: boolean;
  @FormField({title: 'Dense', type: 'checkbox'})
  public dense?: boolean;
  @FormField({ title: 'Elevation', type: 'slider', min: 0, max: 20, group: 'toolbar layout'})
  public elevation?: number = 5;
  @FormField({ title: 'Flat', type: 'checkbox', group: 'toolbar layout' })
  public flat?: boolean;
  @FormField({ title: 'Floating', type: 'checkbox' })
  public floating?: boolean;
  @FormField({ title: 'Hide logo', type: 'checkbox', group: 'logo' })
  public hideLogo?: boolean;
  @FormField({ title: 'Hide menu toggle', type: 'checkbox' })
  public hideMenuToggle?: boolean;
  @FormField({ title: 'Hide title', type: 'checkbox', group: 'title' })
  public hideTitle?: boolean;
  @FormField({title: 'Hide toolbar', type: 'checkbox', group: 'toolbar layout'})
  public hideToolbar?: boolean;
  public infoHeader?: IInfoHeaderOptions | boolean;
  @FormField({title: 'Logo', type: 'string', group: 'logo'})
  public logo?: string;
  @FormField({title: 'Show loading icon', type: 'checkbox'})
  public showLoadingIcon?: boolean;
  public showNotifications?: boolean;
  @FormField({ title: 'Tabs centered', type: 'checkbox', group: 'tabs' })
  public tabsCentered?: boolean;
  @FormField({ title: 'Tabs grow', type: 'checkbox', group: 'tabs' })
  public tabsGrow?: boolean;
  @FormField({ title: 'Tabs hide slider', type: 'checkbox' })
  public tabsHideSlider?: boolean;
  @FormField({ title: 'Tabs right', type: 'checkbox', group: 'tabs' })
  public tabsRight?: boolean;
  @FormField({title: 'Title', type: 'string', group: 'title'})
  public title?: string;
  public titleWidget?: IWidget;

  // #endregion Properties (20)

  // #region Constructors (1)

  constructor(options?: HeaderOptions) {
    if (options) {
      Object.assign(this, options);
    }
  }

  // #endregion Constructors (1)
}

export interface IInfoHeaderOptions {
}

import { IWidget } from './..';

export interface IHeaderOptions {
  dense?: boolean;
  title?: string;
  logo?: string;
  breadcrumbs?: boolean;
  showNotifications?: boolean;
  breadcrumbItems?: any[];
  hideToolbar?: boolean;
  titleWidget?: IWidget;
}

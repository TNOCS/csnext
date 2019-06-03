import { ISearchOptions } from './..';

export class NavigationOptions {
  public style?: 'left' | 'left-hierarchy' | 'tabs' | 'bottom' | 'tabs-left';
  public hideTitle?: boolean;
  public hideMenuToggle?: boolean;
  public floating?: boolean;
  public search?: ISearchOptions;
}

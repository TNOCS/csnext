import { ISearchOptions } from './search-options';

export class NavigationOptions {
  public style?: 'left' | 'left-hierarchy' | 'tabs';
  public hideTitle?: boolean;
  public hideMenuToggle?: boolean;
  public floating?: boolean;
  public search?: ISearchOptions;
}

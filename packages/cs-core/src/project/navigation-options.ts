import { ISearchOptions } from './..';
import { Form, FormField } from '../form/form-decorators';

@Form({ title: 'Navigation' })
export class NavigationOptions {

  constructor(options?: NavigationOptions) {
    if (options) {
      Object.assign(this, options);
    }
  }

  @FormField({ title: 'style', type: 'combobox', options: ['left-hierarchy', 'tabs', 'bottom'] })
  public style?: 'left-hierarchy' | 'tabs' | 'bottom';


  public search?: ISearchOptions;
}

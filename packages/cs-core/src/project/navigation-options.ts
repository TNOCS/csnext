import { ISearchOptions } from './..';
import { Form, FormField } from '../form/form-decorators';

@Form({ title: 'Navigation' })
export class NavigationOptions {

  constructor(options?: NavigationOptions) {
    if (options) {
      Object.assign(this, options);
    }
  }

  @FormField({ title: 'style', type: 'combobox', options: ['left', 'left-hierarchy', 'tabs', 'bottom', 'tabs-left'] })
  public style?: 'left' | 'left-hierarchy' | 'tabs' | 'bottom' | 'tabs-left';


  public search?: ISearchOptions;
}

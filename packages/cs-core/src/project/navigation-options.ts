import { ISearchOptions } from './..';
import { Form, FormField } from '../form/form-decorators';

@Form({ title: 'Navigation' })
export class NavigationOptions {
  // #region Properties (2)

  public search?: ISearchOptions;
  @FormField({ title: 'style', type: 'combobox', options: ['left-hierarchy', 'tabs', 'bottom'] })
  public style?: 'left-hierarchy' | 'tabs' | 'bottom';
  @FormField({ title: 'auto mobile bottom', type: 'checkbox' })
  public autoMobileBottom?: boolean;

  // #endregion Properties (2)

  // #region Constructors (1)

  constructor(options?: NavigationOptions) {
    if (options) {
      Object.assign(this, options);
    }
  }

  // #endregion Constructors (1)
}

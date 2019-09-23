import { ThemeColors } from './theme-colors';
import { Form, FormField } from '../form/form-decorators';

// Application look and feel
@Form({ title: 'Theme' })
export class AppTheme {

  constructor(value?: AppTheme) {
    if (value) {
      Object.assign(this, value);
    }
  }

  @FormField({ title: 'Dark mode', type: 'checkbox' })
  public dark?: boolean;
  public colors?: ThemeColors = {};
  @FormField({
    title: 'Light Colors',
    type: 'object',
  })
  public lightColors?: ThemeColors = {};
  @FormField({
    title: 'Dark colors Colors',
    type: "object"

  })
  public darkColors?: ThemeColors = {};
}

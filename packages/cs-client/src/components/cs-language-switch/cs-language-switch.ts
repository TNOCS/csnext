import Vue from 'vue';
import Component from 'vue-class-component';
import {AppState, Logger, WidgetBase} from '../..';
import {IWidget} from '@csnext/cs-core';
import {Watch} from 'vue-property-decorator';

@Component({
  name: 'cs-language-switch',
  template: require('./cs-language-switch.html'),
  components: {}
} as any)
export class CsLanguageSwitch extends Vue {
  public app = AppState.Instance;
  public L = Logger.Instance;
  private languages: string[] = [];

  public initLanguages() {
    if (!this.app.i18n) return;
    this.languages = Object.keys(this.app.i18n.messages);
  }

  private switchLanguage(language: string) {
    if (!this.app.i18n) return;
    this.app.i18n.locale = language;
  }

  public get Widget(): IWidget {
    return (this.$parent as WidgetBase).widget;
  }

  @Watch('widget')
  public dataChanged(d: any) {
    // console.log('Widget changed');
  }

  public created() {
    this.initLanguages();
  }
}

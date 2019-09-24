import Vue from 'vue';
import Component from 'vue-class-component';
import { IWidget } from '@csnext/cs-core';
import './card-widget.css';
import { AppState } from '../..';
import { CardWidgetOptions } from './card-widget-options';
import { CardOptions } from '../intro/intro-widget-options';

@Component({
  name: 'card-widget',
  template: require('./card-widget.html'),
  props: {
    widget: null
  }
} as any)
export class CardWidget extends Vue {
  public widget?: IWidget;

  public app = AppState.Instance;

  public get card() : CardOptions | undefined {
    if (this.options) { return this.options.card; }
  }

  public get options(): CardWidgetOptions | undefined {
    if (!this.widget || !this.widget.options) {
      return undefined;
    }
    return this.widget.options as CardWidgetOptions;
  }

  constructor() {
    super();
  }
}

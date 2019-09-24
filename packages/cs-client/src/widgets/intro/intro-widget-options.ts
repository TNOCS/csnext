import { WidgetOptions } from '@csnext/cs-core';

/** Markdown widget options, from vue-markdown (https://github.com/miaolz123/vue-markdown) */
export class IntroWidgetOptions extends WidgetOptions {
  public title?: string;
  public subHeader?: string;
  public backgroundImage?: string;
  public cards?: CardOptions[];
}

export class CardOptions {
  public title?: string;
  public description?: string;
  public actions?: CardActionOptions[];
  public backgroundImage?: string;
  public flat?: boolean;
  public outlined?: boolean;
  public elevation?: number;
}

export class CardActionOptions {
  public title?: string;
  public route?: string;
  public url?: string;
}

import { WidgetOptions } from '@csnext/cs-core';

/** Markdown widget options, from vue-markdown (https://github.com/miaolz123/vue-markdown) */
export class IntroWidgetOptions extends WidgetOptions {
  public title?: string;
  public subHeader?: string;
  public backgroundImage?: string;
  public cards?: IIntroCard[];
}

export interface IIntroCard {
  title: string;
  description: string;
  actions: IIntroCardAction[];
  backgroundImage: string;
}

export interface IIntroCardAction {
  title: string;
  route: string;
  url: string;
}

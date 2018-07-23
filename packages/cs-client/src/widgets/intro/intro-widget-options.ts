import { IWidgetOptions } from '@csnext/cs-core';

/** Markdown widget options, from vue-markdown (https://github.com/miaolz123/vue-markdown) */
export interface IIntroWidgetOptions extends IWidgetOptions {
  title: string;
  subHeader: string;
  backgroundImage: string;
  cards: IIntroCard[];
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

import { WidgetOptions } from '@csnext/cs-core';

/** Markdown widget options, from vue-markdown (https://github.com/miaolz123/vue-markdown) */
export class MdWidgetOptions extends WidgetOptions {
  /** enable HTML syntax in source, default true */
  public html?: boolean;
  /** 	\n => <br>, default true */
  public breaks?: boolean;
  /** use emoji, default true */
  public emoji?: boolean;
  /** autoconvert URL-like text to link, default true */
  public linkify?: boolean;
}

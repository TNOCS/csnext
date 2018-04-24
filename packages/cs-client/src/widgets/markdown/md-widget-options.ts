import { IWidgetOptions } from "@csnext/cs-core";

/** Markdown widget options, from vue-markdown (https://github.com/miaolz123/vue-markdown) */
export interface IMdWidgetOptions extends IWidgetOptions {
  /** enable HTML syntax in source, default true */
  html?: boolean;
  /** 	\n => <br>, default true */
  breaks?: boolean;
  /** use emoji, default true */
  emoji?: boolean;
  /** autoconvert URL-like text to link, default true */
  linkify?: boolean;
}

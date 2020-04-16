import { WidgetOptions } from '@csnext/cs-core';

export class LogListOptions extends WidgetOptions {
    public logSource? : string;
    public titleTemplate? : string;
    public subTitleTemplate? : string;
    public openDetailsOnClick? = true;
    public reverseOrder? = false;
    public detailsComponent? = 'cs-log-details';
}
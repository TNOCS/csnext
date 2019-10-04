import { TimelineOptions } from 'vis-timeline';
import { WidgetOptions } from '@csnext/cs-core';

export interface TimelineWidgetOptions extends WidgetOptions {
    timelineOptions?: TimelineOptions;
    logSource?: string;
    smallView?: boolean;
    showFocusTime?: boolean;
    showFitButton?: boolean;
    toggleSmallButton?: boolean;
    showGroupSelectionButton?: boolean;
}
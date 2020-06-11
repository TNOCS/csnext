import { TimelineOptions } from 'vis-timeline/esnext';
import { WidgetOptions } from '@csnext/cs-core';

export interface TimelineWidgetOptions extends WidgetOptions {
    timelineOptions?: TimelineOptions;
    logSource?: string;
    smallView?: boolean;
    showFocusTime?: boolean;
    showFitButton?: boolean;
    showStackButton?: boolean;
    toggleSmallButton?: boolean;
    showGroupSelectionButton?: boolean;
}
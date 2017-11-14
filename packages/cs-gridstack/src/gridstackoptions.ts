import { DashboardOptions } from '@csnext/cs-core'

export class GridStackOptions  {
    cellHeight?: number;
    /**  vertical gap size (default: 20). */
    verticalMargin?: number;
    /** amount of columns (default: 12) */
    width?: number;
    /** disallows dragging of widgets (default: false). */
    disableDrag?: boolean;
    /** disallows resizing of widgets (default: false). */
    disableResize?: boolean;
    /** maximum rows amount. Default is 0 which means no maximum rows */
    height?: number;
    /** enable floating widgets (default: false) */
    float?: boolean;
    /* tells to ignore data-gs-x and data-gs-y attributes and to place element to the first available position */
    autoposition?: boolean;
    /** makes grid static (default false). If true widgets are not movable/resizable. You don't even need jQueryUI draggable/resizable. A CSS class grid-stack-static is also added to the container. */
    staticGrid? : boolean;
    resizable?: any;
}
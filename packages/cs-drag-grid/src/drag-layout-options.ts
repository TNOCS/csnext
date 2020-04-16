import { BaseDashboardOptions, Form, FormField } from '@csnext/cs-core';

@Form({ title: 'Drag Layout Options' })
export class DragLayoutOptions extends BaseDashboardOptions {
    public itemWidth?: number;
    public itemHeight?: number;

    private dragEnabled?: boolean;
    private resizeEnabled?: boolean;
    private isMirrored?: boolean;
    private rowHeight?: number;
    private colNum?: number;
    private verticalCompact?: boolean;
    private horizontalMargin?: number;
    private verticalMargin?: number;
    private animations?: boolean;
    private preventCollision?: boolean;

    public Title?: string;
    public Description?: string;
    public Responsive?: boolean;

    constructor(options?: DragLayoutOptions) {
        super();
        if (options) {
            Object.assign(this, options);
        }

    }

    @FormField({
        title: 'Drag',
        description: 'Allow widget dragging',
        type: 'checkbox',
        group: 'edit'
    })
    public get DragEnabled(): boolean | undefined {
        return this.dragEnabled;
    }

    public set DragEnabled(value: boolean | undefined) {
        this.dragEnabled = value;
    }

    @FormField({ title: 'Resize', type: 'checkbox', group: 'edit' })
    public get ResizeEnabled(): boolean | undefined {
        return this.resizeEnabled;
    }

    public set ResizeEnabled(value: boolean | undefined) {
        this.resizeEnabled = value;
    }

    @FormField({ title: 'Prevent Collision', type: 'checkbox', group: 'collision' })
    public get PreventCollision(): boolean | undefined {
        return this.preventCollision;
    }

    public set PreventCollision(value: boolean | undefined) {
        this.preventCollision = value;
    }

    @FormField({ title: 'Mirrored', type: 'checkbox', group: 'orientation' })
    public get IsMirrored(): boolean | undefined {
        return this.isMirrored;
    }

    public set IsMirrored(value: boolean | undefined) {
        this.isMirrored = value;
    }

    @FormField({ title: 'Row Height', type: 'number', group: 'size' })
    public get RowHeight(): number | undefined {
        return this.rowHeight;
    }

    public set RowHeight(value: number | undefined) {
        this.rowHeight = value;
    }

    @FormField({ title: 'Column Count', type: 'slider', min: 6, max: 24, group: 'size' })
    public get ColNum(): number | undefined {
        return this.colNum;
    }

    public set ColNum(value: number | undefined) {
        this.colNum = value;
    }

    @FormField({
        title: 'Vertical Compact',
        type: 'checkbox',
        group: 'orientation'
    })
    public get VerticalCompact(): boolean | undefined {
        return this.verticalCompact;
    }

    public set VerticalCompact(value: boolean | undefined) {
        this.verticalCompact = value;
    }

    @FormField({ title: 'Horizontal Margin', type: 'number', group: 'margin' })
    public get HorizontalMargin(): number | undefined {
        return this.horizontalMargin;
    }

    public set HorizontalMargin(value: number | undefined) {
        this.horizontalMargin = value;
    }

    @FormField({ title: 'Vertical Margin', type: 'number', group: 'margin' })
    public get VerticalMargin(): number | undefined {
        return this.verticalMargin;
    }

    public set VerticalMargin(value: number | undefined) {
        this.verticalMargin = value;
    }
}

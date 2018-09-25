import { BaseDashboardOptions, Form, FormField } from '@csnext/cs-core';

@Form({ title: 'Drag Layout Options'})
export class DragLayoutOptions extends BaseDashboardOptions {
    public itemWidth?: number;
    public itemHeight?: number;
        
    private dragEnabled?: boolean;  
    private resizeEnabled?: boolean;
    private isMirrored?: boolean;
    private rowHeight?: number;
    private colNum?: number;
    private verticalCompact?: boolean;
    private margin?: number;

    public Title?: string;
    public Description?: string;

    @FormField({ title: 'Drag', description: 'Allow widget dragging', type: 'boolean', group: 'edit'})
    public get DragEnabled(): boolean | undefined {
        return this.dragEnabled;
    }

    public set DragEnabled(value: boolean | undefined) {
        this.dragEnabled = value;
    }

    @FormField({ title: 'Resize', type: 'boolean', group: 'edit'})
    public get ResizeEnabled(): boolean | undefined {
        return this.resizeEnabled;
    }

    public set ResizeEnabled(value: boolean | undefined) {
        this.resizeEnabled = value;
    }

    @FormField({ title: 'Mirrored', type: 'boolean', group: 'orientation'})
    public get IsMirrored(): boolean | undefined {
        return this.isMirrored;
    }

    public set IsMirrored(value: boolean | undefined) {
        this.isMirrored = value;
    }

    @FormField({ title: 'Row Height', type: 'number', group: 'size'})
    public get RowHeight(): number | undefined {
        return this.rowHeight;
    }

    public set RowHeight(value: number | undefined) {
        this.rowHeight = value;
    }

    @FormField({ title: 'Column Count', type: 'number', group: 'size'})
    public get ColNum(): number | undefined {
        return this.colNum;
    }

    public set ColNum(value: number | undefined) {
        this.colNum = value;
    }

    @FormField({ title: 'Vertical Compact', type: 'boolean', group: 'orientation'})
    public get VerticalCompact(): boolean | undefined {
        return this.verticalCompact;
    }

    public set VerticalCompact(value: boolean | undefined) {
        this.verticalCompact = value;
    }

    @FormField({ title: 'Margin', type: 'number', group: 'size'})
    public get Margin(): number | undefined {
        return this.margin;
    }

    public set Margin(value: number | undefined) {
        this.margin = value;
    }

    
}
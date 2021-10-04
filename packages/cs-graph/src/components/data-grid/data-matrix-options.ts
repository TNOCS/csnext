import { WidgetOptions } from '@csnext/cs-core';
import { GraphFilter } from '@csnext/cs-data';

export class DataMatrixOptions extends WidgetOptions {
    public horizontalType?: string;    
    public horizontalFilter?: GraphFilter;    
    public verticalType?: string;    
    public verticalFilter?: GraphFilter;    
    
}
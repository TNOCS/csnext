import { WidgetOptions } from '@csnext/cs-core';
import { GraphFilter } from '@csnext/cs-data';

export class DataMatrixOptions extends WidgetOptions {
    public horizontalType?: string;    
    public horizontalFilter?: GraphFilter;    
    public horizontalParentProperty?: string;
    public verticalType?: string;    
    public verticalFilter?: GraphFilter;    
    public verticalParentProperty?: string;
    public valueType?: string;
    public valueProperty?: string;
    
}
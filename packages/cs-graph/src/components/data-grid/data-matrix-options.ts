import { WidgetOptions } from '@csnext/cs-core';
import { GraphFilter } from '@csnext/cs-data';

export class DataMatrixOptions extends WidgetOptions {
    public matrixStyle?: 'relation';
    public horizontalType?: string;    
    public horizontalFilter?: GraphFilter;    
    public horizontalParentProperty?: string;
    public horizontalValueProperty?: string;
    public verticalType?: string;    
    public verticalFilter?: GraphFilter;    
    public verticalParentProperty?: string;
    public verticalValueProperty?: string;
    public valueType?: string;
    public valueProperty?: string;
}
import { WidgetOptions } from '@csnext/cs-core';
import { GraphFilter } from '@csnext/cs-data';

export class DataMatrixOptions extends WidgetOptions {
    public matrixStyle?: 'relation' | 'element';
    public horizontalType?: string;    
    public horizontalFilter?: GraphFilter;    
    public horizontalParentProperty?: string;
    public horizontalValueProperty?: string;
    public horizontalHeaderStyle?: string;
    public verticalType?: string;    
    public verticalFilter?: GraphFilter;    
    public verticalParentProperty?: string;
    public verticalValueProperty?: string;
    public valueType?: string;
    public typeFilter?: GraphFilter;
    public valueProperty?: string;
    public additionalProperties?: any;
}
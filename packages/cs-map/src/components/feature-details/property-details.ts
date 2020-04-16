import { LayerLegend } from '../../';
import { PropertyType } from '@csnext/cs-data';
// tslint:disable-next-line: max-classes-per-file
export class PropertyDetails
{
    // #region Properties (4)
    public key?: string;
    public legends?: LayerLegend[];
    public type?: PropertyType;
    public value?: any;
    public allowLegend?: boolean;
}

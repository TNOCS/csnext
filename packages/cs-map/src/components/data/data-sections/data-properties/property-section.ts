import { PropertyDetails } from './property-details';
export class PropertySection {
    // #region Properties (3)
    public id?: string;
    public properties?: PropertyDetails[];
    public title?: string;
    public collapsed?: boolean;
    public type?: string;
    public panel?: string;
}

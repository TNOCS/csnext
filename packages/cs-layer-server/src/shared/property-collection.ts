import { Form, FormField } from '.';
import { PropertyType } from '.';

export class PropertyCollection {
    [key: string]: string | PropertyType;
}

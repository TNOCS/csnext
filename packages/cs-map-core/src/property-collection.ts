import { Form, FormField } from '@csnext/cs-core';
import { PropertyType } from '.';

@Form({
    title: 'Property Collection',
    isPanel: true,
    keyValuesType: () => {
        return new PropertyType();
    }
})
export class PropertyCollection {
    [key: string]: string | PropertyType;
}

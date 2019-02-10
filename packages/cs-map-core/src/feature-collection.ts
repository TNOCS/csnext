import { Form, FormField } from '@csnext/cs-core';
import { FeatureType } from '.';

@Form({
    title: 'Feature Types',
    keyValuesType: () => {
        return new FeatureType();
    }
})
export class FeatureCollection {
    [key: string]: FeatureType;
}

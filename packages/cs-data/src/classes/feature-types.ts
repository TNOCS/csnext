import { Form } from '@csnext/cs-core';
import { FeatureType } from './feature-type';


@Form({
    title: 'Feature Types',
    keyValuesType: () =>
    {
        return new FeatureType();
    }
})
export class FeatureTypes
{
    [key: string]: FeatureType;
}

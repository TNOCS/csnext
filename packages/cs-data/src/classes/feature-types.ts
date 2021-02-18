import { Form } from '@csnext/cs-core';
import { FeatureType } from './feature-type';


@Form({
    title: 'Feature Types',
    // _keyValuesType: () =>
    // {
    //     return new FeatureType();
    // }
})
export class FeatureTypes
{
    [key: string]: FeatureType;
}

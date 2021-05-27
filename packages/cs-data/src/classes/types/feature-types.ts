import { Form } from '@csnext/cs-core';
import { FeatureType } from './feature-type';

@Form({
    title: 'Feature Types',
})
export class FeatureTypes
{
    [key: string]: FeatureType;
}

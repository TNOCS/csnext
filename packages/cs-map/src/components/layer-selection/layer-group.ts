import { IMapLayer } from '../../.';
export interface ILayerGroup
{
    title: string;
    color: string;
    layers: IMapLayer[];
    state: 'all' | 'none' | 'some';
}

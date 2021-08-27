import { DataSource } from '@csnext/cs-data';
import { CirclePaint } from 'mapbox-gl';

export type ClusterSettings = {
    cluster?: number | boolean;

    clusterRadius?: number;

    clusterMaxZoom?: number;

    clusterProperties?: object;

    clusterColors?: object;

    paint?: CirclePaint;
}

export class LayerSource extends DataSource {
    public clusterSettings?: ClusterSettings;
    public clusterColors?: Record<string, string>;
}

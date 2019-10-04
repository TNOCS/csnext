import { WidgetOptions } from '@csnext/cs-core';
import { MapLayers, LayerSources } from '../../.';

export class LayerSelectionOptions extends WidgetOptions {
    public layers?: string;
    public sources?: string;
    public _layers?: MapLayers;
    public _sources?: LayerSources;
}

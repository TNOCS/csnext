import { WidgetOptions } from '@csnext/cs-core';
import { MapDatasource, LayerSources } from '../../.';

export class LayerSelectionOptions extends WidgetOptions {
    public layers?: string;
    public sources?: string;
    public _layers?: MapDatasource;
    public _sources?: LayerSources;
}

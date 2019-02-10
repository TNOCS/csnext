import { Form, FormField, IFormOptions } from '@csnext/cs-core';
import { MapboxStyles, ILayerStyle } from './mapbox-styles';

@Form({ title: 'Layer Style' })
export class LayerStyle implements ILayerStyle {
    @FormField({
        title: 'Types',
        type: 'checkboxes-horizontal',
        options: ['point', 'line', 'fill']
    })
    public types?: string[];
    public iconZoomLevel?: number;
    @FormField({ title: 'Feature title', type: 'string' })
    public title?: string;
    @FormField({ title: 'Map title', type: 'string' })
    public mapTitle?: string;
    @FormField({ title: 'Map Popup text', type: 'string' })
    public popup?: string;
    @FormField({ title: 'Use Fill', type: 'checkbox', group: 'layout' })
    public fill?: boolean;
    @FormField({ title: 'Use Line', type: 'checkbox', group: 'layout' })
    public line?: boolean;
    @FormField({ title: 'Use Point', type: 'checkbox', group: 'layout' })
    public pointCircle?: boolean;
    @FormField({ title: 'Icon', type: 'string' })
    public icon?: string;
    public icons?: { [id: string]: string };
    @FormField({ title: 'Styles', type: 'object' })
    public mapbox?: MapboxStyles;
}

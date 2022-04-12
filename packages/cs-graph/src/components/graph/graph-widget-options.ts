import { WidgetOptions } from "@csnext/cs-core";
import { GraphPreset } from "@csnext/cs-data";
import { NewRelationDefinition } from '../..';
import { MapboxOptions } from 'mapbox-gl';
import { MapboxStyleDefinition } from '@csnext/cs-map';
export class GraphMapOptions {
    public token?: string;
    public mbOptions?: MapboxOptions;
    public style?: string = 'streets';
    public styleList?: MapboxStyleDefinition[] = [];
}
export class GraphWidgetOptions extends WidgetOptions {
    public preset?: string | GraphPreset;
    public openElementDetails?: boolean;
    public newRelations?: NewRelationDefinition[];
    public enableFollowOptions?: boolean;
    public canSearch?: boolean = true;
    public searchFilter?: string;
    public defaultView?: 'graph' | 'map';
    public mapOptions?: any;
}
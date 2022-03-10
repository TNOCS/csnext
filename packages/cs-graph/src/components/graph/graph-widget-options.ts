import { WidgetOptions } from "@csnext/cs-core";
import { GraphPreset } from "@csnext/cs-data";
import { NewRelationDefinition } from '../..';

export class GraphWidgetOptions extends WidgetOptions {
    public preset?: string | GraphPreset;
    public openElementDetails?: boolean;
    public newRelations?: NewRelationDefinition[];
    public enableFollowOptions?: boolean;
}
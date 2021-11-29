import { WidgetOptions } from "@csnext/cs-core";
import { GraphPreset } from "@csnext/cs-data";

export class GraphWidgetOptions extends WidgetOptions {
    public preset?: string | GraphPreset;
}
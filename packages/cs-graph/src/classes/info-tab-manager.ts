import { Component } from "vue";
import { IWidget } from "@csnext/cs-core";
export class InfoTabManager {
    public static tabs: { [type: string]: Component | IWidget | IWidget[] } = {};
}

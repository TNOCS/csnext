import Vue from "vue";
import Component from "vue-class-component";
import { AppState, WidgetBase } from "@csnext/cs-client";

@Component(<any>{
    name: 'crosschart',
    template: require('./cross-chart.html')
})
export class CrossChart extends WidgetBase {

}
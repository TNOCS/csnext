import Component from 'vue-class-component';
import './feature-preview.css';
import { BaseLayer, MapDatasource } from '../..';
import Vue from 'vue';
import { StatsDatasource } from '../../datasources/stats-datasource';
import { MessageBusManager } from '@csnext/cs-core';
import { CsMap } from '../cs-map/cs-map';

@Component({
    name: 'feature-preview',
    props: ['layer', 'feature', 'data'],
    template: require('./feature-preview.html')
} as any)
export class FeaturePreview extends Vue {

    public data?: StatsDatasource;
    public layer?: BaseLayer;
    public feature?: mapboxgl.MapboxGeoJSONFeature;
    public busManager = new  MessageBusManager();
    public title: string | null = null;
    public subTitle: string | null = null;

    public mounted() {
        this.busManager.start();
        if (this.data) {
            this.busManager.subscribe(this.data.events, 'legends', (a, b) => {
                this.updateFeature();
            });
            this.updateFeature();
        }
    }

    public beforeDestroy() {
        if (this.busManager) {
            this.busManager.stop();
        }
    }

    public updateFeature() {
        if (this.layer && this.feature) {
            this.title = this.layer.parseTitle(this.feature);
            if (this.layer._legends && this.layer._legends.length > 0) {
                const legend = this.layer._legends[0];
                if (legend && legend.property && this.feature && this.feature.properties && legend.propertyInfo && this.feature.properties.hasOwnProperty(legend.property)) {
                    this.subTitle = legend.propertyInfo.title + ' ' + this.feature.properties[legend.property];
                    if (legend.propertyInfo && legend.propertyInfo.unit) {
                        this.subTitle += ' ' + legend.propertyInfo.unit;
                    }
                }
            }
        }
    }
}

import Component from 'vue-class-component';
import vue from 'vue';
import './data-details.css';
import simplebar from 'simplebar-vue';
import { WidgetBase } from '@csnext/cs-client';
import { IDatasource } from '@csnext/cs-core';
import { CsMap } from '../../cs-map/cs-map';
import { DataInfoPanel } from '../data-info-panel/data-info-panel';

@Component({
    name: 'data-details',
    components: { simplebar, DataInfoPanel },
    props: ['data', 'section', 'panel', 'layer', 'feature'],
    template: require('./data-details.html')
} as any)
export class DataDetails extends WidgetBase {

    public tab = 'tab-info-panel';
    public componentKey = 0;
  
    // public activeElement: any | null = null;

    // /** get active feature */
    // public get feature(): mapboxgl.MapboxGeoJSONFeature | undefined {
    //     if (this.widget.data && this.widget.data.feature) {
    //         return this.widget.data.feature;
    //     }
    //     return undefined;
    // }

    public get source(): IDatasource | undefined {
        if (this.widget.data && this.widget.data.manager) {
            return this.widget.data.manager as IDatasource;
        }
    }

    // public get layer(): IDatasource | undefined {
    //     if (this.widget.data.layer) {
    //         return this.widget.data.layer;
    //     }
    // }

    public updateFeature() {
        if (!this.source) { return; }
        
        this.componentKey+=1;

    }

    public contentLoaded() {
        
        if (this.source) {            
            this.busManager.subscribe(this.source.events, CsMap.FEATURE, (a: string, event: any) => {
                switch (a) {
                    case CsMap.FEATURE_SELECT:
                        if (event.feature) {
                            this.widget.data.featureType = event.layer._source?._featureType;
                            this.widget.data.feature = event.feature;                            
                            this.widget.data.layer = event.layer;
                            this.updateFeature();
                            
                            
                            // this.updateSection();
                        }                        
                        break;
                }
            });
            this.busManager.subscribe(this.source.events, 'legends', () => {
                // this.updateSections();
            });
        }
    }

    // public get dataSource(): IDatasource | undefined {
    //     if (this.widget.content) {
    //       return this.widget.content as IDatasource;
    //     }
    //   }

    public mounted() {     
        

    }
    
}

vue.component('data-details', DataDetails);

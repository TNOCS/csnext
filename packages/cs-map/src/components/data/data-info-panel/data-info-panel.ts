import Component from 'vue-class-component';
import vue from 'vue';
import './data-info-panel.css';
import { FeatureType, InfoPanel, InfoPanelSection } from '@csnext/cs-data';
import ImageSection from './../data-sections/image-section';
import TitleSection from './../data-sections/title-section';
import { SimpleRelationListSection } from './../data-sections/simple-relation-list-section';
import { RelationListSections} from './../data-sections/relation-list-sections';
import InstanceSection from './../data-sections/instance-section';
import { DataProperties } from './../data-sections/data-properties/data-properties';
// import SimpleRelationListSection from './../data-sections/simple-relation-list-section.vue';
// import RelationListSections from './../data-sections/relation-list-sections';
import { GraphElement } from '../../../classes/graph-element';
import { IDatasource } from '@csnext/cs-core';
import { BaseLayer } from '../../../layers/base-layer';
import { MapboxGeoJSONFeature } from 'mapbox-gl';
import simplebar from 'simplebar-vue';

@Component({
    name: 'data-info-panel',
    components: { simplebar, ImageSection, DataProperties, TitleSection, InstanceSection, SimpleRelationListSection, RelationListSections }, //  
    props: ['data', 'featureType', 'panel', 'node', 'source', 'feature', 'layer', 'features'],
    template: require('./data-info-panel.html')
} as any)
export class DataInfoPanel extends vue {
    public data: any;
    public featureType?: FeatureType;
    public panel?: string;
    public node?: GraphElement;
    public layer?: BaseLayer;
    public infoPanel: InfoPanel | null = null;
    public sections?: InfoPanelSection[];
    public source?: IDatasource;
    public feature?: MapboxGeoJSONFeature;
    
    public mounted() {                
        if (this.panel && this.featureType?.infoPanels?.hasOwnProperty(this.panel)) {            
            this.infoPanel = this.featureType.infoPanels[this.panel];
            
            if (this.infoPanel?.basePanel) {
                // let panel = 
                // this.sections = [...this.infoPanel.basePanelthis.infoPanel.sections, 
            }
            if (!this.infoPanel.sections) {
                this.infoPanel.sections = [ { sectionType: 'title-section'}]
            }
            
        }        
    }
}

vue.component('data-info-panel', DataInfoPanel);

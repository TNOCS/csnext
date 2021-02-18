import Component from 'vue-class-component';
import vue from 'vue';
import './data-info-panel.css';
import { FeatureType, InfoPanel, InfoPanelSection } from '@csnext/cs-data';
import ImageSection from './../data-sections/image-section';
import TitleSection from './../data-sections/title-section';
// import InstanceSection from './../data-sections/instance-section.vue';
// import SimpleRelationListSection from './../data-sections/simple-relation-list-section.vue';
// import RelationListSections from './../data-sections/relation-list-sections.vue';
// import { GraphElement } from '../../../classes';
import { IDatasource } from '@csnext/cs-core';

@Component({
    name: 'data-info-panel',
    components: { ImageSection, TitleSection},
    props: ['data', 'featureType', 'panel', 'node', 'source'],
    template: require('./data-info-panel.html')
} as any)
export class DataInfoPanel extends vue {
    public data: any;
    public featureType?: FeatureType;
    public panel?: string;
    // public node?: GraphElement;
    public infoPanel: InfoPanel | null = null;
    public sections?: InfoPanelSection[];
    public source?: IDatasource;
    
    public mounted() {                
        if (this.panel && this.featureType?.infoPanels?.hasOwnProperty(this.panel)) {            
            this.infoPanel = this.featureType.infoPanels[this.panel];
            if (!this.infoPanel) { return; }
            
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

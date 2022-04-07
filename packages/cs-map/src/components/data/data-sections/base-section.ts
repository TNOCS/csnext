import { Component, Vue, Watch } from "vue-property-decorator";
import { GraphElement, FeatureType, InfoPanel, InfoPanelSection, GraphDatasource } from '@csnext/cs-data';
import { NodeLink } from './node-link';
import { IDatasource } from '@csnext/cs-core';
@Component({
  components: { NodeLink },
  props: ['data', 'featureType', 'section', 'panel', 'infoPanel', 'node', 'source'],
})

export class BaseSection extends Vue {
    public data?: any;
    public featureType?: FeatureType;
    public section?: InfoPanelSection;
    public infoPanel?: InfoPanel;
    public panel?: InfoPanel;
    public node?: GraphElement;
    public source?: GraphDatasource;
    public property?: string;

}
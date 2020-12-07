import { Component, Vue, Watch } from "vue-property-decorator";
import { FeatureType, InfoPanel, InfoPanelSection } from '@csnext/cs-data';
// import { GraphElement } from '@/classes';
import NodeLink from './node-link';
import { IDatasource } from '@csnext/cs-core';


@Component({
  components: { NodeLink },
  props: ['data', 'featureType', 'section', 'infoPanel', 'node', 'source'],
})

export class BaseSection extends Vue {
    public data?: any;
    public featureType?: FeatureType;
    public section?: InfoPanelSection;
    public infoPanel?: InfoPanel;
    public node?: any;
    public source?: IDatasource;

}
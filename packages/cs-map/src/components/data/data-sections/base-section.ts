import { Component, Vue, Watch } from "vue-property-decorator";
import { FeatureType, InfoPanel, InfoPanelSection } from '@csnext/cs-data';
import { GraphElement } from '../../../classes/graph-element';
import NodeLink from './node-link';
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
    public source?: IDatasource;

}
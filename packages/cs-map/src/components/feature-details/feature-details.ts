import Component from 'vue-class-component';
import { IWidget } from '@csnext/cs-core';

import './feature-details.css';
import { Vue } from 'vue-property-decorator';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';

@Component({
    name: 'feature-details',
    props: { widget: null },
    components: { VuePerfectScrollbar },
    template: require('./feature-details.html')
} as any)
export class FeatureDetails extends Vue {
    public widget!: IWidget;
    public tree: any[] = [];
}

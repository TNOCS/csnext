import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { IDashboard, IWidget } from '@csnext/cs-core';
import './split-panel.css';
import { SplitGrid, SplitGridArea, SplitGridGutter } from 'vue-split-grid';
import { SplitElement } from './split-element';

@Component({
    template: require('./split-comp.html'),
    components: {
        SplitComp,
        SplitGrid,
        SplitGridArea,
        SplitGridGutter
    }
} as any)
export class SplitComp extends Vue {

    @Prop({ default: null }) private options;
    @Prop({ default: null }) private dashboard;

    constructor() {
        super();
        console.log(this.options);
    }

    public getSplitpanel(panelElm: SplitElement) {
        console.log(panelElm);
        return panelElm && panelElm.splitpanel ? panelElm.splitpanel : undefined;
    }

    public getDirection(dir: string) {
        switch (dir) {
            case 'vertical':
                return 'row';
            case 'horizontal':
                return 'column';
            default:
                return dir;
        }
    }

    public getWidget(id: string, dashboard: IDashboard): IWidget | undefined {
        if (dashboard && dashboard.widgets) {
            return dashboard.widgets.find(w => w.id === id);
        }
    }
}


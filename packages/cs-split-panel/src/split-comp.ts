import Vue from 'vue';
import Component from 'vue-class-component';
import { IDashboard, IWidget } from '@csnext/cs-core';
import './split-panel.css';
import { Watch } from 'vue-property-decorator';
import { SplitGrid, SplitGridArea, SplitGridGutter } from 'vue-split-grid';

@Component({
    template: require('./split-comp.html'),
    components: {
        SplitGrid,
        SplitGridArea,
        SplitGridGutter
    },
    props: {
        options: null,
        dashboard: null
    }
} as any)
export class SplitComp extends Vue {

    public $refs!: {
        splitmain: any;
    };

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

    public optionsUpdated() {

        this.$refs.splitmain.destroy();
        // this.$refs.splitmain.init();

        // this.$refs.splitmain.changeAreaSize();
        // this.$forceUpdate();


    }

    @Watch('options.splitpanel')
    optionsDUpdated(v: any) {
        // this.$refs.splitmain.reset();

    }

    public getWidget(id: string, dashboard: IDashboard): IWidget | undefined {
        if (dashboard && dashboard.widgets) {
            return dashboard.widgets.find(w => w.id === id);
        }
    }

}


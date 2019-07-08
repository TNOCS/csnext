import Vue from 'vue';
import Component from 'vue-class-component';
import { IDashboard, IWidget } from '@csnext/cs-core';
import './split-panel.css';
import { Watch } from 'vue-property-decorator';

@Component({
    template: require('./split-comp.html'),
    props: {
        options: null,
        dashboard: null
    }
} as any)
export class SplitComp extends Vue {

    public $refs!: {
        splitmain: any;
    };

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


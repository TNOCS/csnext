import Vue from 'vue';
import Component from 'vue-class-component';
import { IDashboard, IMenu } from '@csnext/cs-core';
import VueSplit from 'vue-split-panel';
import './split-panel.css';
import { SplitPanelDashboardOptions } from './split-panel-dashboard-options';
import { SplitPanelOptions } from './split-panel-options';

const splitComp = Vue.component('split-comp', {
    template: require('./split-comp.html'),
    props: ['options', 'dashboard'],
    // data: { dashboard: null },
    methods: {
        getWidget: (id: string, dashboard: IDashboard) => {
            if (dashboard && dashboard.widgets) {
                return dashboard.widgets.find(w => w.id === id);
            }
        }
    }
});

@Component({
    template: require('./split-panel.html'),
    props: {
        dashboard: null
    }
} as any)
export class SplitPanel extends Vue {
    public dashboard!: IDashboard;
    public $refs!: {
        mySplit: any;
    };
    public presetMenu?: IMenu;

    public splitOptions?: SplitPanelOptions;

    public get options(): SplitPanelDashboardOptions | undefined {
        // if no splitpanel was defined, but a list of presets, take first
        if (this.dashboard.options) {
            const opt = this.dashboard.options as SplitPanelDashboardOptions;
            if (opt.presets && !opt.splitpanel && opt.defaultPreset) {
                opt.splitpanel = opt.presets[opt.defaultPreset];
                // opt.splitpanel = opt.presets[0];
            }
        }
        return this.dashboard.options;
    }

    public set options(value: SplitPanelDashboardOptions | undefined) {
        this.dashboard.options = value;
    }

    constructor() {
        super();
        
    }

    created() {
       
        if (this.options) {
            if (!this.options.splitpanel) {
                if (this.options.presets) {
                    this.options.splitpanel = this.options.presets[
                        Object.keys(this.options.presets)[0]
                    ];
                } else {
                    this.options.splitpanel = {
                        direction: 'horizontal',
                        elements: [],
                        disableVerticalScroll: false
                    };
                }
            }
        }
    }

    mounted() {
        if (this.options && this.options.presets) {
            if (!this.dashboard.menus) {
                this.dashboard.menus = [];
            }
            for (const key in this.options.presets) {
                if (this.options.presets.hasOwnProperty(key)) {
                    const element = this.options.presets[key];
                    let presetMenu = {
                        id: 'preset-' + key,
                        icon: element.icon,
                        title: key,
                        toolTip: key,
                        textButton: true,
                        enabled: true,
                        visible: true,
                        action: m => {
                            if (this.options) {
                                this.options.splitpanel = element;
                            }                        
                            this.$forceUpdate();
                        }
                    } as IMenu;
                    this.dashboard.menus.push(presetMenu);
                }
            }
        }
    }
}

Vue.use(VueSplit);

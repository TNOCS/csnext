import Vue from 'vue';
import Component from 'vue-class-component';
import { IDashboard, IMenu, MessageBusHandle, MessageBusManager } from '@csnext/cs-core';
import { AppState } from '@csnext/cs-client';
import './split-panel.css';
import { SplitPanelDashboardOptions } from './split-panel-dashboard-options';
import { SplitPanelOptions } from './split-panel-options';
import { SplitComp } from './split-comp';

import VueSplitGrid from 'vue-split-grid';

Vue.use(VueSplitGrid);

// const splitComp = Vue.component('split-comp', {
//     template: require('./split-comp.html'),
//     props: ['options', 'dashboard'],
//     // data: { dashboard: null },
//     methods: {
//         getWidget: (id: string, dashboard: IDashboard) => {
//             if (dashboard && dashboard.widgets) {
//                 return dashboard.widgets.find(w => w.id === id);
//             }
//         },
//         reset: () => {
//             alert('Reset');
//         }
//     }
// });

@Component({
    template: require('./split-panel.html'),
    components: { SplitComp },
    props: {
        dashboard: null
    }
} as any)
export class SplitPanel extends Vue {
    public static id = 'split-panel';
    public dashboard!: IDashboard;
    public presetMenu?: IMenu;
    private busHandle?: MessageBusHandle;
    private bus = new MessageBusManager();

    public selectStepper(index: number, splitPanel: SplitPanelOptions, key: string) {
        if (this.options) {
            this.$set(this.options, 'splitpanel', splitPanel);
        };
    }

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

    public update(options: SplitPanelOptions) {
        this.options!.splitpanel = options;
        this.$forceUpdate();
    }

    constructor() {
        super();
        this.bus.start();
    }

    destroyed() {
        this.bus.stop();        
    }

    created() {
        this.bus.subscribe(AppState.Instance.bus, AppState.DASHBOARD_MAIN, (a: string, d: any) => {
            if (a === AppState.DASHBOARD_CHANGED) {
                this.$forceUpdate();
            }
        });        
        this.bus.subscribe(this.dashboard.events, AppState.DASHBOARD_CHANGED, (a: string, d: any) => {
            alert('Dashboard changed')
            // this.update(this.options?.splitpanel!);
        });
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
        if (this.options && this.options.presets && Object.keys(this.options.presets).length > 1 && !this.options.hidePresetMenu) {
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
                    if (
                        this.dashboard.menus.findIndex(
                            m => m.id === presetMenu.id
                        ) === -1
                    ) {
                        this.dashboard.menus.push(presetMenu);
                    }
                }
            }
        }
    }
}



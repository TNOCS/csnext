import { IDashboard, Info } from '@csnext/cs-core';
import { AppState, DashboardManagerBase, DashboardManager, TabsLayout } from '@csnext/cs-client';
import Vue from 'vue';
import { CsMarkdown } from '../cs-markdown/cs-markdown';


export class InfoDashboardManager extends DashboardManagerBase {
    public static id = 'info-dashboard';
    public name: string = 'info-dashboard';

    public highlightedItemId: string = '';

    public start(dashboard: IDashboard) {
        super.start(dashboard);

        console.log('start info');
        if (AppState.Instance.activeDashboard) {
            this.checkDashboard(AppState.Instance.activeDashboard);
        }

        // listen to dashboard changes
        this.busManager.subscribe(AppState.Instance.bus, AppState.DASHBOARD_MAIN, (a: string, dashboard: IDashboard) => {
            if (a === 'init' && dashboard && dashboard.isMain) {
                this.checkDashboard(dashboard);
            }
        });
    }

    public initWidgets() {
        if (!this.dashboard.widgets) {
            this.dashboard.widgets = [];
        } else {
            this.dashboard.widgets.splice(0, this.dashboard.widgets.length);
        }
    }

    public updateInfoDashboard(info: Info) {
        console.log(`info ${info.title}`);
        this.initWidgets();
        if (!this.dashboard.options) { this.dashboard.options = {}; }
        Vue.set(this.dashboard, 'title', info.title);
        if (info.tabs) {
            this.dashboard.layout = TabsLayout.id;
            for (const tab of info.tabs) {
                if (tab.markdownUrl) {
                    this.dashboard.widgets!.push({
                        title: tab.title,
                        component: CsMarkdown,
                        data: { url: tab.markdownUrl }
                    })
                }
            }
        } else if (info.markdownUrl) {
            this.dashboard.widgets!.push({
                component: CsMarkdown,
                data: { url: info.markdownUrl },
                options: {
                    githubToc: {
                        tocFirstLevel: 2,
                        tocLastLevel: 3,
                        tocClassName: 'toc',
                        anchorLinkSymbol: '',
                        anchorLinkSpace: false,
                        anchorClassName: 'anchor',
                        anchorLinkSymbolClassName: 'octicon octicon-link'
                    }
                } as any
            });

        }
    }

    public checkDashboard(dashboard: IDashboard) {
        if (dashboard.info) {
            this.updateInfoDashboard(dashboard.info);
        } else {
            this.initWidgets();
        }
    }

    public stop() {
        super.stop();
    }

    public dashboardLoaded() {
        console.log(`Loaded info dashboard`);
    }
}

DashboardManager.addDashboardManager(InfoDashboardManager);

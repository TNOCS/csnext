import { IMessageBusService, IMessageBusCallback, MessageBusManager, IDashboardManager, IDashboard, IWidget } from '@csnext/cs-core';
import { Logger } from '../';

export class DashboardManagerBase implements IDashboardManager {

    /** access the original widget from configuration */
    public busManager!: MessageBusManager;
    public dashboard!: IDashboard;
    public _contentHasBeenLoaded: boolean = false;
    public data: any = {};

    public subscribe(bus: IMessageBusService | undefined, topic: string, callback: IMessageBusCallback, id?: string) {
        if (this.busManager) {
            this.busManager.subscribe(bus, topic, callback, id);
        }
    }

    public start(dashboard: IDashboard) {        
        this.dashboard = dashboard;
        if (!this.busManager) {
            this.busManager = new MessageBusManager();
        }
        Logger.info('dashboard', 'start dashboard manager - ' + this.dashboard.id);
        this.busManager.start();
    }

    public stop() {
        Logger.info('dashboard', 'stop dashboard manager');
        if (this.busManager) {
            this.busManager.stop();
        }
    }

    private findDashboardInWidget(id: string, widget: IWidget) : IDashboard | undefined {
        if (widget.dashboard) {
            const res = this.findDashboard(id, widget.dashboard);
            if (res) { return res;}
        }
        if (widget.widgets) {
            for (const sw of widget.widgets) {
                const res = this.findDashboardInWidget(id, sw);
                if (res) { return res;}
            }
        }
    }

    public findDashboard(id: string, dashboard?: IDashboard) : IDashboard | undefined {
        if (!dashboard) {
            dashboard = this.dashboard;
        }
        if (dashboard.id === id) { return dashboard;}
        if (dashboard.dashboards) {
            for (const d of dashboard.dashboards) {
                const res = this.findDashboard(id, d);
                if (res) { return res;}        
            }            
        }
        if (dashboard.widgets) {
            for (const w of dashboard.widgets) {
                const res = this.findDashboardInWidget(id, w);
                if (res) { return res;}                
            }
        }    
    }
}

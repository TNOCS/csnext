import Vue from 'vue';
import Component from 'vue-class-component';
import { IWidget, IMessageBusService, MessageBusHandle, IMessageBusCallback, MessageBusManager, IDashboardManager, IDashboard } from '@csnext/cs-core';
import { Logger } from '../';

export class DashboardManagerBase implements IDashboardManager {

    /** access the original widget from configuration */
    public busManager?: MessageBusManager;
    public dashboard?: IDashboard;

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
}

import {ILayerExtension, ILayerExtensionType} from '../classes/ilayer-extension';
import {IMapLayer} from '../classes/imap-layer';
import {MessageBusHandle} from '@csnext/cs-core/dist/utils/message-bus/message-bus-handle';
import {Feature, Point} from 'geojson';

export interface IWmsTimeExtensionOptions {
    timeProperty?: string;
}

export class WmsTimeExtension implements ILayerExtension, ILayerExtensionType, IWmsTimeExtensionOptions {
    public id: string = 'wms-time';
    public title?: string | undefined;
    public timeProperty?: string;
    private _layer?: IMapLayer;
    private _currentTime: Date = (new Date(Date.now() - 10 * 60 * 1000)); //10 minutes earlier because most recent is not always available
    private _timeHandle?: MessageBusHandle;
    private _originalUrl?: string;

    public getInstance(init?: Partial<ILayerExtension>) {
        let result = new WmsTimeExtension(init);
        return result;
    }

    public constructor(init?: Partial<ILayerExtension>) {
        Object.assign(this, init);
    }

    start(layer: IMapLayer) {
        console.log('Start WMS time extension');
        this._layer = layer;
        if (layer && layer._source && layer._source.type === 'raster') this._originalUrl = layer._source.url;
        this.subscribeToTimeEvents();
        this.updateTime();
    }

    stop() {
        if (this._timeHandle) this._layer!._manager!.events.unsubscribe(this._timeHandle);
    }

    private updateTime() {
        if (!this._layer || !this._layer._source || this._layer._source.type !== 'raster' || !this.timeProperty || !this._originalUrl) return;
        const oldIndex = this._originalUrl.indexOf(`&${this.timeProperty}=`);
        if (oldIndex > 0) this._originalUrl = this._originalUrl.substr(0, oldIndex);
        this._layer._source.url = `${this._originalUrl}&${this.timeProperty}=${this.roundTimeToFiveMinutes()}`;
        this._layer._manager!.updateLayerSource(this._layer);
    }

    private roundTimeToFiveMinutes(): string {
        var fiveMinuteDate = new Date(this._currentTime);
        var minutes = fiveMinuteDate.getMinutes() - (fiveMinuteDate.getMinutes() % 5);
        fiveMinuteDate.setMinutes(minutes);
        fiveMinuteDate.setSeconds(0);
        fiveMinuteDate.setMilliseconds(0);
        return fiveMinuteDate.toISOString().replace('00.000Z', '00Z');
    }

    private subscribeToTimeEvents() {
        if (this._layer && this._layer._manager) {
            this._timeHandle = this._layer._manager.events.subscribe('time', (a: string, time: Date) => {
                if (a === 'moved') {
                    this._currentTime = typeof time === 'number' ? new Date(time) : time;
                    this.updateTime();
                }
            });
        }
    }
}

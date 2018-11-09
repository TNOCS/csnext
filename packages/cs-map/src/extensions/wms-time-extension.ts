import {ILayerExtension, ILayerExtensionType} from '../classes/ilayer-extension';
import {IMapLayer} from '../classes/imap-layer';
import {MessageBusHandle} from '@csnext/cs-core/dist/utils/message-bus/message-bus-handle';
import {Feature, Point} from 'geojson';

export interface IWmsTimeExtensionOptions {
    // name of the url-parameter that specifies the time
    timeProperty?: string;
    // for the current and future time, no time-parameter is submitted in the url.
    // for very recent history the specified time might not be available yet.
    // therefore, determine the offset when to start requesting a specific time in history.
    historyDelayMinutes?: number;
}

const MINUTES_TO_MS = 60 * 1000;

export class WmsTimeExtension implements ILayerExtension, ILayerExtensionType, IWmsTimeExtensionOptions {
    public id: string = 'wms-time';
    public title?: string | undefined;
    public timeProperty?: string;
    public historyDelayMinutes?: number;
    private _layer?: IMapLayer;
    private _selectedTime: Date = new Date();
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
        this.removeTimePropertyFromUrl();
        this.addSelectedTimeToUrl();
        this._layer._manager!.updateLayerSource(this._layer);
    }

    private addSelectedTimeToUrl() {
        if (!this._layer || !this._layer._source) return;
        const now = Date.now();
        const selectedTime = this._selectedTime.getTime();
        const offsetTime = this.historyDelayMinutes ? this.historyDelayMinutes * MINUTES_TO_MS : 0;
        if (now >= selectedTime + offsetTime) {
            this._layer._source.url = `${this._originalUrl}&${this.timeProperty}=${this.roundTimeToFiveMinutes()}`;
        } else {
            this._layer._source.url = `${this._originalUrl}`;
        }
    }

    private removeTimePropertyFromUrl() {
        const oldIndexOfTimeInUrl = this._originalUrl!.indexOf(`&${this.timeProperty}=`);
        if (oldIndexOfTimeInUrl > 0) this._originalUrl = this._originalUrl!.substr(0, oldIndexOfTimeInUrl);
    }

    private roundTimeToFiveMinutes(): string {
        var fiveMinuteDate = new Date(this._selectedTime);
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
                    this._selectedTime = typeof time === 'number' ? new Date(time) : time;
                    this.updateTime();
                }
            });
        }
    }
}

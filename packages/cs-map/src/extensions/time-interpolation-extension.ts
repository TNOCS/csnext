import {ILayerExtension, ILayerExtensionType} from '../classes/ilayer-extension';
import {IMapLayer} from '../classes/imap-layer';
import {MessageBusHandle} from '@csnext/cs-core';
import {Feature, Point} from 'geojson';

export interface ITimeInterpolationExtensionOptions {
    // #region Properties (3)

    showFeatureAfterEnd?: boolean;
    showFeatureBeforeStart?: boolean;
    timeProperty?: string;

    // #endregion Properties (3)
}

export class TimeInterpolationExtension implements ILayerExtension, ILayerExtensionType, ITimeInterpolationExtensionOptions {
    // #region Properties (10)

    public id: string = 'time-interpolation';
    public showFeatureAfterEnd?: boolean;
    public showFeatureBeforeStart?: boolean;
    public timeProperty?: string;
    public title?: string | undefined;
    private _currentTime?: number;
    private _interpolatedFeature?: Feature<Point>;
    private _layer?: IMapLayer;
    private _originalFeatures?: Array<Feature<Point>> = [];
    private _timeHandle?: MessageBusHandle;


    // #endregion Properties (10)

    // #region Constructors (1)

    public constructor(init?: Partial<ILayerExtension>) {
        Object.assign(this, init);
    }

    // #endregion Constructors (1)

    // #region Public Methods (3)

    public getInstance(init?: Partial<ILayerExtension>) {
        const result = new TimeInterpolationExtension(init);
        return result;
    }

    public start(layer: IMapLayer) {
        // console.log('Start time interpolation extension');
        this._layer = layer;
        this.subscribeToTimeEvents();
        this.storeOriginalFeatures();
        this.updateInterpolation();
    }

    public stop() {
        this.restoreOriginalFeatures();
        if (this._timeHandle) { this._layer!._manager!.events.unsubscribe(this._timeHandle); }
    }

    // #endregion Public Methods (3)

    // #region Private Methods (6)

    private findInterpolatedFeatureForCurrentTime(): boolean {
        return this._originalFeatures!.some((f, fIndex, fArray) => {
            if (f.properties!.hasOwnProperty(this.timeProperty!)) {
                const fTime = f.properties![this.timeProperty!];
                // Find the first feature with a timestamp later than the current time
                if (this._currentTime! < fTime) {
                    const featureAfterNow = JSON.parse(JSON.stringify(f));
                    if (fIndex === 0 && this.showFeatureBeforeStart) {
                        // If the found feature is the first feature, use it directly
                        this._interpolatedFeature = featureAfterNow;
                        return true;
                    } else if (fIndex === 0 && !this.showFeatureBeforeStart) {
                        this._interpolatedFeature = undefined;
                        return true;
                    } else {
                        // Otherwise interpolate the previous and current features
                        const featureBeforeNow = JSON.parse(JSON.stringify(fArray[fIndex - 1]));
                        this._interpolatedFeature = this.getInterpolatedFeature(featureBeforeNow, featureAfterNow);
                        return true;
                    }
                }
            }
            return false;
        });
    }

    private getInterpolatedFeature(featureBeforeNow: Feature<Point>, featureAfterNow: Feature<Point>): Feature<Point> {
        const timeA = featureBeforeNow.properties![this.timeProperty!];
        const timeB = featureAfterNow.properties![this.timeProperty!];
        const relativeTime = (this._currentTime! - timeA) / (timeB - timeA);
        const geoA = featureBeforeNow.geometry.coordinates;
        const geoB = featureAfterNow.geometry.coordinates;
        const newLat = geoA[0] + (geoB[0] - geoA[0]) * relativeTime;
        const newLon = geoA[1] + (geoB[1] - geoA[1]) * relativeTime;
        const result = JSON.parse(JSON.stringify(featureBeforeNow));
        result.geometry.coordinates = [newLat, newLon];
        return result;
    }

    private restoreOriginalFeatures() {
        if (!this._layer || !this._originalFeatures) { return; }
        this._layer._source!._data!.features = this._originalFeatures;
        this._layer._manager!.updateLayerSource(this._layer);
    }

    private storeOriginalFeatures() {
        if (this.timeProperty && this._layer && this._layer._source && this._layer._source._data && this._layer._source._data.features) {
            if (!this._originalFeatures || !this._originalFeatures.length) {
                this._originalFeatures = JSON.parse(JSON.stringify(this._layer._source._data.features));
                this._originalFeatures = this._originalFeatures!.sort((a, b) => {
                    if (!a.properties) { a.properties = {}; }
                    if (!b.properties) { b.properties = {}; }
                    const aTime = a.properties && a.properties[this.timeProperty!] ? a.properties[this.timeProperty!] : 0;
                    const bTime = b.properties && b.properties[this.timeProperty!] ? b.properties[this.timeProperty!] : 0;
                    return aTime - bTime;
                });
            }
        }
    }

    private subscribeToTimeEvents() {
        if (this._layer && this._layer._manager) {
            this._timeHandle = this._layer._manager.events.subscribe('time', (a: string, time: Date) => {
                if (a === 'moved') {
                    this._currentTime = typeof time === 'number' ? time : time.getTime();
                    this.updateInterpolation();
                }
            });
        }
    }

    private updateInterpolation() {
        if (!this.timeProperty || !this._layer || !this._layer._source || !this._originalFeatures || !this._originalFeatures.length) { return; }
        this._interpolatedFeature = undefined;
        const source = this._layer._source;
        const manager = this._layer._manager;
        if (this.timeProperty && source && source._data && source._data.features) {
            if (!this._currentTime && this.showFeatureBeforeStart) {
                this._interpolatedFeature = this._originalFeatures[0];
            } else {
                // Loop over all features sorted by increasing time
                const found = this.findInterpolatedFeatureForCurrentTime();
                if (!found && this.showFeatureAfterEnd) {
                    this._interpolatedFeature = this._originalFeatures[this._originalFeatures.length - 1];
                }
            }
            if (source && source._data && source._data.features) {
                if (this._interpolatedFeature) { this._interpolatedFeature.properties!._fId = 'current'; }
                source!._data!.features = this._interpolatedFeature ? [this._interpolatedFeature] : [];
                manager!.updateLayerSource(this._layer);
                // console.log(`Updated interpolation feature to ${this._interpolatedFeature ? JSON.stringify(this._interpolatedFeature.geometry.coordinates) : 'undefined'}`);
            }
        }
    }

    // #endregion Private Methods (6)
}

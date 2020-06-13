import { Feature } from 'geojson';

export class FeatureAddedEvent {
    constructor(
        public readonly id: string | number,
        public readonly feature: Feature,
    ) { }
}

export class FeatureUpdatedEvent {
    constructor(
        public readonly id: string | number,
        public readonly feature: Feature,
    ) { }
}
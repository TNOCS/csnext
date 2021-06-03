import { MapOptions } from "@csnext/cs-map";

export class Constants {
    public static defaultMap = {
        datasource: 'isdrMaps',
        title: 'Map',
        options: {
            class: 'doc-map-container',
            token: 'pk.eyJ1IjoiZGFteWxlbiIsImEiOiJjazFqN2ljNzYwMTJlM2xucGV3enJvYjE4In0.kArBU3x7YIy3DhfyQhtSGw',
            mbOptions: {
                style: 'mapbox://styles/mapbox/dark-v9',
                center: [7.23, 48.27],
                zoom: 4
            } as any,
            showDraw: false,
            showRuler: true,
            showGrid: false,
            showFeatureDetails: false,
            showStyles: true,
            showGeocoder: false,
            showPelias: true,
            showTraffic: false,
            showCursorLocationInfo: 'DMS',
            mouseEventsOnIcon: false,
            showLayers: true,
            peliasOptions: { accessToken: 'XiNgsCXbBqV4CPtilm1VkAyATed84mT7CLHXLZH1vx6LITo0XqAx1NiVATKHAfWz' } as MapOptions
        }
    }
}
// original code from: https://github.com/el/style-switcher, updated to fit in cs-map

import { IControl, Map as MapboxMap } from 'mapbox-gl';
import './style-switcher.css';
import { CsMap, MapboxStyleDefinition } from '../..';

export class MapboxStyleSwitcherControl implements IControl {

    public static readonly DEFAULT_STYLES = [
        { id: 'basic', title: 'Basic', uri:'mapbox://styles/mapbox/basic-v9'},
        { id: 'dark', title: 'Dark', uri:'mapbox://styles/mapbox/dark-v9'},
        { id: 'light', title: 'Light', uri:'mapbox://styles/mapbox/light-v9'},
        { id: 'outdoors', title: 'Outdoors', uri:'mapbox://styles/mapbox/outdoors-v10'},
        { id: 'satellite', title: 'Satellite', uri:'mapbox://styles/mapbox/satellite-streets-v10'},
        { id: 'streets', title: 'Streets', uri:'mapbox://styles/mapbox/streets-v10'}
    ];
    // #region Properties (3)

    private static readonly DEFAULT_STYLE = 'streets';

    private controlContainer: HTMLElement | undefined;

    // #endregion Properties (3)

    // #region Constructors (1)

    constructor(public styles: MapboxStyleDefinition[], public mapControl: CsMap) {
    }

    // #endregion Constructors (1)

    // #region Public Methods (3)

    public getDefaultPosition(): string {
        const defaultPosition = 'top-right';
        return defaultPosition;
    }

    public onAdd(map: MapboxMap): HTMLElement {
        this.controlContainer = document.createElement('div');
        this.controlContainer.classList.add('mapboxgl-ctrl');
        this.controlContainer.classList.add('mapboxgl-ctrl-group');
        const mapStyleContainer = document.createElement('div');
        const styleButton = document.createElement('button');
        mapStyleContainer.classList.add('mapboxgl-style-list');
        for (const style of this.styles) {
            const styleElement = document.createElement('button');
            styleElement.innerText = style.title;
            styleElement.classList.add(style.title.replace(/[^a-z0-9-]/gi, '_'));
            styleElement.dataset.uri = JSON.stringify(style);
            styleElement.addEventListener('click', event => {
                const srcElement = event.srcElement as HTMLButtonElement;
                this.mapControl.setStyle(JSON.parse(srcElement.dataset.uri!) as MapboxStyleDefinition);
                mapStyleContainer.style.display = 'none';
                styleButton.style.display = 'block';
                const elms = mapStyleContainer.getElementsByClassName('active');
                while (elms[0]) {
                    elms[0].classList.remove('active');
                }
                srcElement.classList.add('active');
            });
            if (style.title === MapboxStyleSwitcherControl.DEFAULT_STYLE) {
                styleElement.classList.add('active');
            }
            mapStyleContainer.appendChild(styleElement);
        }
        styleButton.classList.add('mapboxgl-ctrl-icon');
        styleButton.classList.add('mapboxgl-style-switcher');
        styleButton.addEventListener('click', () => {
            styleButton.style.display = 'none';
            mapStyleContainer.style.display = 'block';
        });

        document.addEventListener('click', event => {
            if (!this.controlContainer!.contains(event.target as Element)) {
                mapStyleContainer.style.display = 'none';
                styleButton.style.display = 'block';
            }
        });

        this.controlContainer.appendChild(styleButton);
        this.controlContainer.appendChild(mapStyleContainer);
        return this.controlContainer;
    }

    public onRemove(): void {
        if (this.controlContainer && this.controlContainer.parentNode) {
            this.controlContainer.parentNode.removeChild(this.controlContainer);
        }
    }

    // #endregion Public Methods (3)
}

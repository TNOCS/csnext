import * as bboxPolygon from '@turf/bbox-polygon';
import { FillPaint, Layer } from 'mapbox-gl';
import { Feature, Polygon } from 'geojson';
import * as bbox from '@turf/bbox';
import * as difference from '@turf/difference';
import { IMapLayer } from '..';
import { MessageBusService } from '@csnext/cs-core';
import  { CsMap, MapLayers, LayerSource } from './..';


// export class MaskLayer implements IMapLayer {
//     getBounds() {
//         throw new Error('Method not implemented.');
//     }
    
   
//     id?: string | undefined;    
//     title?: string | undefined;
//     tags?: string[] | undefined;
//     _source?: LayerSource | undefined;
//     addLayer(map: CsMap) {
//         throw new Error('Method not implemented.');
//     }
//     initLayer(manager: MapLayers) {
//         throw new Error('Method not implemented.');
//     }
//     removeLayer(map: CsMap) {
//         throw new Error('Method not implemented.');
//     }
//     Visible?: boolean | undefined;

//     public static CreateMaskLayer(
//         id: string,
//         paint: FillPaint,
//         mask: Feature<Polygon>,
//         bounds?: number[]
//     ) : Layer {
//         if (!bounds) {
//             bounds = [-180, -180, 180, 90];
//         }

//         var bboxPoly = bboxPolygon.default(bbox.default(bounds));
//         let res = {
//             id: id,
//             source: {
//                 type: 'geojson',
//                 data: difference.default(bboxPoly, mask)
//             },
//             type: 'fill',
//             paint: paint
//         } as Layer;

//         return res;
//     }
// }

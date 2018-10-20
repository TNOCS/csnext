import * as bboxPolygon from '@turf/bbox-polygon';
import { FillPaint, Layer } from 'mapbox-gl';
import { Feature, Polygon } from 'geojson';
import * as bbox from '@turf/bbox';
import * as difference from '@turf/difference';
import { IMapLayer } from '..';


export class MaskLayer implements IMapLayer {


    public static CreateMaskLayer(
        id: string,
        paint: FillPaint,
        mask: Feature<Polygon>,
        bounds?: number[]
    ) : Layer {
        if (!bounds) {
            bounds = [-180, -180, 180, 90];
        }

        var bboxPoly = bboxPolygon.default(bbox.default(bounds));
        let res = {
            id: id,
            source: {
                type: 'geojson',
                data: difference.default(bboxPoly, mask)
            },
            type: 'fill',
            paint: paint
        } as Layer;

        return res;
    }
}

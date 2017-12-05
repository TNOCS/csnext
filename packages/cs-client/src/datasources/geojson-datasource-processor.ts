import { IDatasource, IDatasourceHandler, IDatasourceProcessor, ProcessorActions } from '@csnext/cs-core';
import { AppState, DatasourceManager } from '../index';
import { FeatureCollection, GeometryObject } from 'geojson';

/**
 * Expected input is GeoJSON, output is GeoJSON too, but formatted so we can use it properly, i.e.
 * - If not available, add a properties object
 * - If not present, add an id property (f.id)
 */
export class GeojsonDatasourceProcessor implements IDatasourceProcessor {
  public id = 'geojson';

  public execute(ds: IDatasource, action?: ProcessorActions, data?: FeatureCollection<GeometryObject, any>): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!data) { return reject('GeojsonDatasourceProcessor: No data received'); }
      if (!data.features) { return resolve(data); }
      let count = 0;
      data.features.forEach(f => {
        if (!f.hasOwnProperty('properties')) { f.properties = {}; }
        if (!f.hasOwnProperty('id')) {
          f.id = f.properties.hasOwnProperty('id') ? f.properties.id : count++;
        }
        return f;
      });
      resolve(data);
    });
  }
}

DatasourceManager.add(new GeojsonDatasourceProcessor());

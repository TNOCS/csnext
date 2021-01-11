import {
  ISourcePlugin,
  ISourcePluginType,
  LayerSource,
  Connection,
  ILoadResult
} from '../../classes';
import fs from 'fs';
import { Logger } from '@nestjs/common';
import { Client } from 'pg';
import { v1 as uuidv1} from 'uuid';
import { Feature } from 'geojson';

export class PostGisSource implements ISourcePlugin, ISourcePluginType {
  id = 'postgis';
  source = 'postgis';

  getInstance() {
    return new PostGisSource();
  }

  query(connection: Connection, query: string): Promise<ILoadResult> {
      return new Promise(async (resolve, reject) => {
        const client = new Client(connection);

        try {
          await client.connect();

          

          const res = await client.query(query);

          let geojson = new LayerSource();
          geojson.features = [];

          for (const row of res.rows) {
            let f = {
              id: row.hasOwnProperty('id') ? row.id : uuidv1(),
              type: 'Feature',
              geometry: JSON.parse(row.geo),
              properties: {}
            } as Feature;
            for (const key in row) {
              if (row.hasOwnProperty(key)) {
                const element = row[key];
                if (key !== 'geo') {
                  f.properties[key] = element;
                }
              }
            }
            geojson.features.push(f);
          }          

          resolve({ source: geojson, updated: false });
        } catch (e) {
          reject();
        }
      });    
  }

  /** make sure geojson has been prepared, e.g. add ids to all features */
  initSource(source: LayerSource): boolean {
    let updated = false;

    if (source.features) {
      for (const {} of source.features) {
      }
    }
    return updated;
  }

  save(file: string, source: LayerSource) {
    Logger.log(`Saving: ${file}`);
    fs.writeFileSync(
      file,
      JSON.stringify(
        source,
        (key, value) => {
          if (key.startsWith('_')) {
            return undefined;
          }
          return value;
        },
        2
      )
    );
  }
}

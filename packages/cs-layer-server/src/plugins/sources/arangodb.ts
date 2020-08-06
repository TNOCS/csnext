import {
  ISourcePlugin,
  ISourcePluginType,
  LayerSource,
  Connection,
  ILoadResult
} from '../../classes';
import fs from 'fs';
import * as arangojs from 'arangojs';
import { Logger } from '@nestjs/common';
import uuidv1 from 'uuid/v1';
import { Feature } from 'geojson';
import { QueryOptions } from '../../classes/query-options';

export class ArangoDBSource implements ISourcePlugin, ISourcePluginType {
  public id = 'arangodb';
  public source = 'arangodb';

  public getInstance() {
    console.log('Get arango');
    return new ArangoDBSource();
  }

  public query(connection: Connection, query: string | any, options: QueryOptions): Promise<ILoadResult> {
    return new Promise(async (resolve, reject) => {
      const dbConfig = {
        host: connection.host || 'localhost',
        port: connection.port || '8529',
        username: connection.user || 'root',
        password: connection.password || 'openSesame',
        database: connection.database || 'journal'
      };

      try {
        let q = '';
        if (options.bbox) {
          q += `LET area = GEO_POLYGON([
            [${options.bbox[0]}, ${options.bbox[1]}],
            [${options.bbox[2]}, ${options.bbox[1]}],
            [${options.bbox[2]}, ${options.bbox[3]}],
            [${options.bbox[0]}, ${options.bbox[3]}],
            [${options.bbox[0]}, ${options.bbox[1]}]
            ])\n`;
          q += `FOR poi IN pois FILTER ${options.filter} AND GEO_CONTAINS(area, poi.geometry) RETURN poi`;
        } else {
          q += `FOR poi IN pois FILTER ${options.filter} AND GEO_CONTAINS(area, poi.geometry) RETURN poi`;
        }

        // Connection to ArangoDB
        const db = new arangojs.Database({
          url: `http://${dbConfig.host}:${dbConfig.port}`
        });

        db.useBasicAuth(dbConfig.username, dbConfig.password);
        db.useDatabase(dbConfig.database);
        Logger.log(q);
        const res = await db.query(q);
        const geojson = new LayerSource();
        geojson.features = [];
        while (res.hasNext()) {
          const result = await res.next();
          const f = {
            id: result.hasOwnProperty('_id')
              ? result._id
              : uuidv1(),
            type: 'Feature',
            geometry: result.geometry,
            properties: { ...result, ...{ geometry: undefined, _rev: undefined, _key: undefined } }
          } as Feature;

          geojson.features.push(f);
        }

        // for (const row of res.rows) {
        //   let f = {
        //     id: row.hasOwnProperty('id') ? row.id : uuidv1(),
        //     type: 'Feature',
        //     geometry: JSON.parse(row.geo),
        //     properties: {}
        //   };
        //   for (const key in row) {
        //     if (row.hasOwnProperty(key)) {
        //       const element = row[key];
        //       if (key !== 'geo') {
        //         f.properties[key] = element;
        //       }
        //     }
        //   }
        //   geojson.features.push(f);
        // }

        resolve({ source: geojson, updated: true });
      } catch (e) {
        Logger.error(JSON.stringify(e));
        reject();
      }
    });
  }

  /** make sure geojson has been prepared, e.g. add ids to all features */
  public initSource(source: LayerSource): boolean {
    const updated = false;

    if (source.features) {
      // tslint:disable-next-line: no-empty
      for (const { } of source.features) {
      }
    }
    return updated;
  }

  public load(file: string, meta?: string): Promise<ILoadResult> {
    return new Promise(async (resolve, reject) => {
      console.log(file);
      console.log(meta);
      reject();
    })
  }

  public save(file: string, source: LayerSource) {
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

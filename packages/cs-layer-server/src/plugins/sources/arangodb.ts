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

export class ArangoDBSource implements ISourcePlugin, ISourcePluginType {
  public id = 'arangodb';
  public source = 'arangodb';

  public getInstance() {
    return new ArangoDBSource();
  }

  public query(connection: Connection, query: string | any): Promise<ILoadResult> {
    return new Promise(async (resolve, reject) => {
      const dbConfig = {
        host: connection.host || 'localhost',
        port: connection.port || '8529',
        username: connection.user || 'root',
        password: connection.password || 'openSesame',
        database: connection.database || 'journal'
      };

      try {
        // Connection to ArangoDB
        const db = new arangojs.Database({
          url: `http://${dbConfig.host}:${dbConfig.port}`
        });

        db.useBasicAuth(dbConfig.username, dbConfig.password);
        db.useDatabase(dbConfig.database);
        Logger.log(query);
        const res = await db.query(query);
        const geojson = new LayerSource();
        geojson.features = [];
        while (res.hasNext()) {
          const result = await res.next();
          const f = {
            id: result.props.hasOwnProperty('_id')
              ? result.props._id
              : uuidv1(),
            type: 'Feature',
            geometry: result.pos,
            properties: result.props
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

        resolve({ source: geojson, updated: false });
      } catch (e) {
        reject();
      }
    });
  }

  /** make sure geojson has been prepared, e.g. add ids to all features */
  public initSource(source: LayerSource): boolean {
    const updated = false;

    if (source.features) {
      // tslint:disable-next-line: no-empty
      for (const {} of source.features) {
      }
    }
    return updated;
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

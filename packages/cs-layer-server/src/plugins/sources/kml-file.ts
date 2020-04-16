import {
  ISourcePlugin,
  ISourcePluginType,
  LayerSource,
  ServerConfig
} from "../../classes";
import * as tgj from "@mapbox/togeojson";
var DOMParser = require("xmldom").DOMParser;
var parser = new DOMParser();
import * as path from "path";
import fs from "fs";
import { Logger } from "@nestjs/common";

export class KmlFileSource implements ISourcePlugin, ISourcePluginType {
  id = "kml";
  fileExtensions = [".kml"];
  init(): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  getInstance() {
    return new KmlFileSource();
  }

  import(
    file: string
  ): Promise<LayerSource | undefined> {
    return new Promise((resolve, reject) => {
      if (fs.existsSync(file)) {
        let source = fs.readFileSync(file, "utf8");
        if (source) {
          Logger.log(`Importing: ${file}`);
          const kml = parser.parseFromString(source);
          if (kml) {
            const geojson = tgj.kml(kml, { styles: true });

            resolve(geojson);
            return;
          } else {
            Logger.log(`Error importing: ${file}`);
          }
        }
      }
      reject();
    });
  }
}

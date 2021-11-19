import {
  FeatureTypeHelpers,
  FeatureTypes,
  GraphDatasource,
} from '@csnext/cs-data';
import Axios from 'axios';

export interface IGraphStorage {
  source?: GraphDatasource;
  init(source: GraphDatasource);
  loadTypes(): Promise<boolean>;
  saveTypes(): Promise<boolean>;
}

export class GraphServer implements IGraphStorage {
  public source?: GraphDatasource;

  constructor(public base_url: string) {}

  public init(source: GraphDatasource) {
    this.source = source;
  }

  public async loadTypes(): Promise<boolean> {
    if (!this.source) {
      return Promise.reject();
    }
    const url = `${this.base_url}/types`;
    try {
      const r = await Axios.get(url);
      if (r.data) {
        this.source!.featureTypes = r.data as FeatureTypes;
        $cs.loader.removeLoader('types');
        return Promise.resolve(true);
      } else {
        $cs.loader.removeLoader('types');
        return Promise.reject();
      }
    } catch (e) {
      console.log(e);
      return Promise.reject();
    }
  }

  public async saveTypes(): Promise<boolean> {
    try {
      if (this.source?.featureTypes) {
        const updateJSON = FeatureTypeHelpers.SlimTypes(
          this.source!.featureTypes
        );
        const r = await Axios.post(`${this.base_url}/types`, updateJSON);
      }
      return Promise.resolve(true);
    } catch {
      return Promise.reject();
    }
  }
}

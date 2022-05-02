import { GraphElement } from '@csnext/cs-data';
import { DocDatasource } from './../doc-datasource';

export type StorageTypes = 'server' | 'device';
export interface IGraphStorage {
  source?: DocDatasource;
  storageType: StorageTypes;
  init(source: DocDatasource): Promise<boolean>;
  loadTypes(): Promise<boolean>;
  saveTypes(): Promise<boolean>;
  loadGraph(): Promise<boolean>;
  restoreGraph?(kg: {[id:string]: GraphElement}): Promise<boolean>;
  saveMultiple?(element: GraphElement[]): Promise<GraphElement[]>;
  saveEdge?(element: GraphElement): Promise<GraphElement | undefined>;
  saveElement?(element: GraphElement): Promise<GraphElement>;
  removeEdge?(id: string): Promise<boolean>;
  loadGraphElement?(id: string): Promise<GraphElement | undefined>;
  removeElement(id: string): Promise<boolean>;
  removeMultiple?(id: string[]): Promise<boolean>;
}
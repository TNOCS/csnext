import { GraphElement, MetaEntity } from "@csnext/cs-data";
import { DocDatasource, ElementDataGrid } from '../../..';
import { DataGridOptions } from '../data-grid-options';
import { IFormOptions, IMenu } from '@csnext/cs-core';

export interface ISuggestionEngine {
  suggestions: Suggestion[] | null;
  title: string;
  options?: any;
  getSettingsForm?(): IFormOptions;
  reset?(options: DataGridOptions,
    source: DocDatasource,
    grid: ElementDataGrid): Promise<boolean>;
  getElementSuggestions?(element: GraphElement, source: DocDatasource, grid: ElementDataGrid): Promise<Suggestion[]>;
  getGridSuggestions?(
    options: DataGridOptions,
    source: DocDatasource,
    grid: ElementDataGrid
  ): Promise<Suggestion[]>;
}

export class Suggestion {
  public id!: string;
  public text!: string;
  public subtext?: string;
  public type!: string;
  public icon?: string;
  public color?: string;
  public element?: GraphElement;
  public entity?: MetaEntity;
  public reason?: string;
  
  public actions?: IMenu[];
}

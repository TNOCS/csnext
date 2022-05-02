import { GraphElement, MetaEntity } from "@csnext/cs-data";
import { DocDatasource, ElementDataGrid } from '../../..';
import { DataGridOptions } from '../data-grid-options';
import { IMenu } from '@csnext/cs-core';

export interface ISuggestionEngine {
  getSuggestions(
    options: DataGridOptions,
    source: DocDatasource,
    grid: ElementDataGrid
  ): Promise<GridSuggestion[]>;
}

export class GridSuggestion {
  public id!: string;
  public text!: string;
  public type!: string;
  public icon?: string;
  public color?: string;
  public element?: GraphElement;
  public entity?: MetaEntity;
  public reason?: string;
  
  public actions?: IMenu[];
}

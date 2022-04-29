import { GraphElement } from "@csnext/cs-data";
import { DocDatasource } from '../../..';
import { DataGridGridOptions } from '../data-grid-options';


export interface ISuggestionEngine {
  getSuggestions(
    options: DataGridGridOptions,
    source: DocDatasource
  ): Promise<GridSuggestion[]>;
}

export class GridSuggestion {
  public element!: GraphElement;
  public reason?: string;
}

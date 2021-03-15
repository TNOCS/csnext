import { CrossDashboardManager, CrossFilterDatasource, TimeRange } from '.';
import * as crossfilter from 'crossfilter2';
import * as dc from 'dc';


// import { c} from 'd3';
export class ChartOptions
{
  public _source!: CrossFilterDatasource;
  public _dimension?: crossfilter.Dimension<any, any>;
  public _group?: crossfilter.Group<any, any, any>;
  public _manager?: CrossDashboardManager;
  public _elementId?: string;
  public _chart?: dc.BaseMixin<any>;

  public id?: string;
  public title?: string;
  public key?: string;
  public keys?: string[];
  public enums?: string[];
  public type?: string;
  public chartId?: string;
  public x?: number;
  public y?: number;
  public width?: number;
  public height?: number;
  public horizontalTime?: string;
  public horizontalTimeReverse?: boolean;
  public rowTimeMode?: boolean;
  public orderByName?: boolean;
  public verticalTime?: string;
  public verticalTimeReverse?: boolean;
  public top?: number;
  public timeType?: 'bar' | 'line';
  public timeRange?: TimeRange;
  public timeAggregation?: 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year';
  public showLabel?: boolean;
  public showXaxis?: boolean;
  public showYaxis?: boolean;
  public statValue?: string;
  public showArea?: boolean;
  public showPoints?: boolean;
  public disableFilter?: boolean;
  public barPadding?: number;
  public lineCurve?: string;
  

  public keyX?: string;
  public keyY?: string;
  public bucketSize?: number;
  public titleX?: string;
  public titleY?: string;
}

export class CrossOptions {
  charts: ChartOptions[];
}

export class ChartOptions {
  public title: string;
  public key: string;
  public type: string;
  public _dimension?: any;
  public _group?: any;
}
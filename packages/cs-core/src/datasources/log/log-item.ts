export interface ILogItem {
    className?: string;
    content: string;
    end?: number;
    group?: any;
    id?: string;
    start: number;
    style?: string;
    subgroup?: string;
    title?: string;
    type?: string;
    editable?: boolean;
  }